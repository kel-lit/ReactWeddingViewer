@echo off
cd %~dp0
start cmd.exe /k npm run serve
start node ./express/app.js
npm run build -- --watch