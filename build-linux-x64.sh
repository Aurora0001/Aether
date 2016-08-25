rm -rf Aether-*
rm -rf *.log
rm -rf *.zip
NODE_ENV=production npm run build
NODE_ENV=production electron-packager . Aether --platform linux --arch x64 --prune
mv Aether-win32-ia32/resources/app/plugins Aether-linux-x64/plugins
zip -9 -r linux-x64.zip Aether-linux-x64
