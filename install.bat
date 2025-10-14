@echo off
echo ========================================
echo   Portfolio Installation Script
echo ========================================
echo.

:: Check Python
echo [1/4] Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python not found! Please install Python 3.11+
    pause
    exit /b 1
)
echo Python found!

:: Check Node.js
echo [2/4] Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js not found! Please install Node.js 18+
    pause
    exit /b 1
)
echo Node.js found!

:: Install Backend Dependencies
echo.
echo [3/4] Installing Backend dependencies...
cd backend
if not exist .env (
    copy .env.example .env
    echo Created .env file - Please configure it!
)
pip install -r requirements.txt
cd ..

:: Install Frontend Dependencies
echo.
echo [4/4] Installing Frontend dependencies...
cd frontend
if not exist .env (
    copy .env.example .env
    echo Created .env file for frontend!
)
call npm install
cd ..

echo.
echo ========================================
echo   Installation Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Configure backend/.env with your DATABASE_URL
echo 2. Run 'start-dev.bat' to start development servers
echo.
pause
