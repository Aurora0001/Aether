rm -rf Aether-*
rm -rf *.log
rm -rf *.zip
NODE_ENV=production npm run build
NODE_ENV=production electron-packager . Aether --platform win32 --arch ia32 --prune
mv Aether-win32-ia32/resources/app/plugins Aether-win32-ia32/plugins
zip -9 -r win32.zip Aether-win32-ia32
