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

Base.metadata.create_all(bind=engine)
app.include_router(router)

# Resolve path to the frontend build directory
FRONTEND_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "..", "frontend", "dist")
FRONTEND_DIR = os.path.abspath(FRONTEND_DIR)

# Serve frontend static assets (JS, CSS, images)
if os.path.isdir(os.path.join(FRONTEND_DIR, "assets")):
    app.mount("/assets", StaticFiles(directory=os.path.join(FRONTEND_DIR, "assets")), name="assets")

# Serve other static files in dist root (favicon, icons, etc.)
STATIC_FILES_IN_DIST = ["favicon.svg", "icons.svg"]
for fname in STATIC_FILES_IN_DIST:
    fpath = os.path.join(FRONTEND_DIR, fname)
    if os.path.isfile(fpath):
        @app.get(f"/{fname}")
        def serve_static(filepath=fpath):
            return FileResponse(filepath)

# Catch-all: serve the React SPA index.html for any unmatched route
# This must come AFTER all API routes to avoid shadowing them
@app.get("/{full_path:path}")
def serve_spa(full_path: str):
    index_path = os.path.join(FRONTEND_DIR, "index.html")
    if os.path.isfile(index_path):
        return FileResponse(index_path)
    return {"message": "CodePilot API is running. Frontend not built yet — run 'npm run build' in the frontend directory."}
