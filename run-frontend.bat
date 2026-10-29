@echo off
title Unimrkt Next.js Frontend (Port 1440)
cd /d "%~dp0frontend"
echo ====================================================
echo Starting Unimrkt Next.js Frontend on http://localhost:1440 ...
echo ====================================================
npm run dev
pause
