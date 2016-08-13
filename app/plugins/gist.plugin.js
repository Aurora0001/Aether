const https = require('https');

const GistPlugin = function(registerForAction, registerMime, store, actions) {
  this.name = 'Gist Uploader';
  this.author = 'IRC Client';
  this.description = 'Uploads files to GitHub Gist that have been dragged into the client.';
  this.version = [0, 1, 0];
  this.uuid = '835aa140-f183-4481-bead-7790cc2c12bc';
  this.defaultSettings = {};
  this.settings = [

  ];
  registerMime('', (action) => this.onDrop(action, store, actions));
};

GistPlugin.prototype.onDrop = (action, store, actions) => {
  const body = {
    "description": "Uploaded by IRC Client",
    "public": true,
    "files": {}
  };
  body.files[action.file.name] = {
    content: action.contents
  };
  const json_body = JSON.stringify(body);

  const options = {
    hostname: 'api.github.com',
    port: 443,
    path: '/gists',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(json_body),
      'User-Agent': 'IRC Client Gist Plugin v0.1.0'
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
      store.dispatch(actions.client.send_privmsg(action.channel, data.html_url, action.network_id));
    });
  });

  post_req.write(json_body);
  post_req.end();
};

module.exports = GistPlugin;
