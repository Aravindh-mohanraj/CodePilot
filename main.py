"""Vercel FastAPI entrypoint - root level main.py"""
import sys
import os

# Ensure backend package is importable
root = os.path.dirname(os.path.abspath(__file__))
if root not in sys.path:
    sys.path.insert(0, root)

from backend.app.main import app
