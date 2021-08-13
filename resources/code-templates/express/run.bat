@echo off
echo "starting example-app"
call pm2 delete "example-app"
call pm2 start app.js --name "example-app"
pause