rm -rf IRCClient-*
rm -rf *.log
rm -rf *.zip
NODE_ENV=production npm run build
NODE_ENV=production electron-packager . Aether --platform darwin --arch x64 --prune
mv Aether-darwin-x64/Aether.app/Contents/Resources/app/plugins Aether-darwin-x64/plugins
zip -9 -r mac64.zip Aether-darwin-x64
