@ECHO OFF
del /Q "./dist"
xcopy ".\src\index.html" ".\dist\"
npm run build