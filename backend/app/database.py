from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
import shutil
import sqlite3

def run_auto_migrations(target_db_path):
    """Adds missing columns to SQLite tables if they do not exist."""
    try:
        if os.path.exists(target_db_path):
            conn = sqlite3.connect(target_db_path)
            c = conn.cursor()
            c.execute("PRAGMA table_info(users)")
            cols = [r[1] for r in c.fetchall()]
            if cols and "preferred_language" not in cols:
                c.execute("ALTER TABLE users ADD COLUMN preferred_language VARCHAR DEFAULT 'python'")
                print("Added missing column 'preferred_language' to users table")
            if cols and "settings" not in cols:
                c.execute("ALTER TABLE users ADD COLUMN settings TEXT")
                print("Added missing column 'settings' to users table")
            conn.commit()
            conn.close()
    except Exception as e:
        print("Auto-migration notice:", e)

# Check if running on Vercel serverless environment
if os.environ.get("VERCEL"):
    db_dir = "/tmp"
    db_path = os.path.join(db_dir, "interview.db")
    source_db = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "database", "interview.db"))
    if not os.path.exists(db_path) and os.path.exists(source_db):
        try:
            shutil.copy(source_db, db_path)
        except Exception as e:
            print("Failed to copy source db to /tmp:", e)
    run_auto_migrations(db_path if os.path.exists(db_path) else source_db)
    DATABASE_URL = f"sqlite:///{db_path}"
else:
    local_path = os.path.abspath("./database/interview.db")
    run_auto_migrations(local_path)
    DATABASE_URL = "sqlite:///./database/interview.db"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
