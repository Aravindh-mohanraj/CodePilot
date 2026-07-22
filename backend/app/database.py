from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
import shutil

# Check if running on Vercel serverless environment
if os.environ.get("VERCEL"):
    db_dir = "/tmp"
    db_path = os.path.join(db_dir, "interview.db")
    if not os.path.exists(db_path):
        source_db = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "database", "interview.db"))
        if os.path.exists(source_db):
            try:
                shutil.copy(source_db, db_path)
            except Exception as e:
                print("Failed to copy source db to /tmp:", e)
    DATABASE_URL = f"sqlite:///{db_path}"
else:
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
