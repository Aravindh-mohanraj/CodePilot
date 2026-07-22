from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from .database import engine
from .models import Base
from .routes import router
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(title="CodePilot")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    print("Database initialization notice:", e)

app.include_router(router)

# Resolve path to the frontend build directory with Vercel serverless fallbacks
possible_dirs = [
    os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "frontend", "dist")),
    os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")),
    os.path.abspath(os.path.join(os.getcwd(), "frontend", "dist")),
    os.path.abspath(os.path.join(os.getcwd(), "dist")),
]

FRONTEND_DIR = possible_dirs[0]
for p in possible_dirs:
    if os.path.isdir(p) and os.path.isfile(os.path.join(p, "index.html")):
        FRONTEND_DIR = p
        break

# Serve frontend static assets (JS, CSS, images) if running locally or standalone
assets_dir = os.path.join(FRONTEND_DIR, "assets")
if os.path.isdir(assets_dir):
    try:
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")
    except Exception:
        pass

@app.get("/api/health")
def health_check():
    return {"status": "ok", "message": "CodePilot API is running"}
