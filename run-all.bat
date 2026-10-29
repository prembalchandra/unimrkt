@echo off
title Starting Unimrkt Full Stack
echo ====================================================
echo Starting Unimrkt Full Stack (Backend + Frontend)
echo ====================================================
echo Starting Strapi Backend on http://localhost:1337 ...
start "Unimrkt Backend" "%~dp0run-backend.bat"
timeout /t 3 /nobreak >nul
echo Starting Next.js Frontend on http://localhost:1440 ...
start "Unimrkt Frontend" "%~dp0run-frontend.bat"
echo.
echo Both servers started!
echo - Frontend:     http://localhost:1440
echo - Backend API:  http://localhost:1337/api/pages
echo - Strapi Admin: http://localhost:1337/admin
