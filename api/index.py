import sys
import os

# Add backend to Python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend")))

from backend.app.main import app

# Export app for Vercel Serverless
app = app
