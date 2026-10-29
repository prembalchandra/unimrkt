@echo off
title Unimrkt Strapi 5 Backend (Port 1337)
cd /d "%~dp0backend"
echo ====================================================
echo Starting Unimrkt Strapi 5 Backend on http://localhost:1337 ...
echo Admin URL: http://localhost:1337/admin
echo ====================================================
"C:\Users\Helpdesk\Desktop\node-v22\node.exe" ./node_modules/@strapi/strapi/bin/strapi.js develop --no-build-admin --no-watch-admin
pause
