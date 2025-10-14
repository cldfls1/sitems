from app import create_app

# Create app instance for Vercel
app = create_app()

# Vercel will use this app instance directly
# No need for a separate handler function
