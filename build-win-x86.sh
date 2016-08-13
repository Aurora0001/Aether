rm -rf IRCClient-*
rm -rf *.log
rm -rf *.zip
#NODE_ENV=production npm run build
NODE_ENV=production electron-packager . IRCClient --platform win32 --arch ia32 --prune
mv IRCClient-win32-ia32/resources/app/plugins IRCClient-win32-ia32/plugins
zip -9 -r win32.zip IRCClient-win32-ia32
