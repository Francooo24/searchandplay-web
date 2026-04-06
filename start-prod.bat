@echo off
echo ========================================
echo   Search ^& Play — Production Startup
echo ========================================

REM ── Django Backend ────────────────────────────────────────────────────────
echo [1/3] Starting Django backend...
cd /d "%~dp0backend"
call venv\Scripts\activate
set DJANGO_SETTINGS_MODULE=backend.settings_prod
python manage.py collectstatic --noinput
start "Django Backend" cmd /k "python manage.py runserver 0.0.0.0:8000 --settings=backend.settings_prod"

REM ── Next.js Web App ───────────────────────────────────────────────────────
echo [2/3] Building Next.js app...
cd /d "%~dp0web"
call npm run build

echo [3/3] Starting Next.js production server...
start "Next.js Web" cmd /k "npm run start"

echo.
echo ========================================
echo   All services started!
echo   Web:     http://localhost:3000
echo   Backend: http://localhost:8000
echo ========================================
pause
