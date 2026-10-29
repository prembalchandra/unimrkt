@echo off
title Push Unimrkt to GitHub
cd /d "%~dp0"
echo ====================================================
echo Pushing Frontend and Backend to GitHub...
echo Remote: https://github.com/prembalchandra/unimrkt.git
echo ====================================================
git branch -M main
git push -u origin main
echo.
echo ====================================================
pause
