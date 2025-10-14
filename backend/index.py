import sys
import os

# Add backend directory to Python path for Vercel
sys.path.insert(0, os.path.dirname(__file__))

from app import create_app

# Create app instance for Vercel
app = create_app()

# This is the entry point for Vercel Serverless Functions
# Vercel will use this app instance directly
