@echo off
echo ========================================
echo   Search ^& Play — Dev Startup
echo ========================================

echo [1/2] Starting Django backend (dev)...
cd /d "%~dp0backend"
start "Django Backend" cmd /k "venv\Scripts\activate && python manage.py runserver 8000"

echo [2/2] Starting Next.js (dev)...
cd /d "%~dp0web"
start "Next.js Web" cmd /k "npm run dev"

echo.
echo ========================================
echo   Dev servers started!
echo   Web:     http://localhost:3000
echo   Backend: http://localhost:8000
echo ========================================
pause
