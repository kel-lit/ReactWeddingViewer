@echo off
cd %~dp0
start cmd.exe /k npm run serve
start nodemon ./express/app.js