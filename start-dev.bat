@echo off
echo Starting Portfolio Development Environment...
echo.

:: Start Backend
echo [1/2] Starting Flask Backend...
start cmd /k "cd backend && python app.py"
timeout /t 3 /nobreak >nul

:: Start Frontend
echo [2/2] Starting React Frontend...
start cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo   Development servers are starting!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit (servers will keep running)...
pause >nul
