const querystring = require('querystring');
const https = require('https');

const ImgurPlugin = function(registerForAction, registerMime, store, actions) {
  this.name = 'Imgur Uploader';
  this.author = 'IRC Client';
  this.description = 'Uploads images to Imgur that have been dragged into the client.';
  this.version = [0, 1, 0];
  this.uuid = 'b23918e7-9105-4871-8e73-e043b2aec4f6';
  this.defaultSettings = {};
  this.settings = [

  ];
  registerMime('image/png', (action) => this.onDrop(action, store, actions));
};

ImgurPlugin.prototype.onDrop = (action, store, actions) => {
  const reader = new FileReader();
  reader.addEventListener("load", function () {
    const body = {
      image: reader.result.replace(/.*base64,/, ''),
      type: 'base64',
      name: action.file.name
    };
    const json_body = JSON.stringify(body);

    const options = {
      hostname: 'api.imgur.com',
      port: 443,
      path: '/3/upload.json',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(json_body),
        'User-Agent': 'IRC Client Imgur Plugin v0.1.0',
        'Authorization': 'Client-ID 63fd5bd87956730'
      }
    };

    const post_req = https.request(options, (result) => {
      let body = '';
      result.setEncoding('utf8');
      result.on('data', (chunk) => {
        body += chunk;
      });

      result.on('end', () => {
        const data = JSON.parse(body);
        console.log(data.data.link);
        store.dispatch(actions.client.send_privmsg(action.channel, data.data.link, action.network_id));
      });
    });

    post_req.write(json_body);
    post_req.end();
  }, false);

  reader.readAsDataURL(action.file);
}

module.exports = ImgurPlugin;
