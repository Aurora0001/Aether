const https = require('https');

const Updater = function(registerForAction, registerForMime, store, actions) {
  this.name = 'Updater';
  this.author = 'Aether Developers';
  this.description = 'Checks for updates to Aether and notifies when they are available.';
  this.version = [1, 0, 0];
  this.uuid = '3f1af0cc-be8c-45ad-b25a-e8aa5e9efc12';
  this.defaultSettings = {};
  this.settings = [];

  let updateData = null;

  registerForAction('JOIN_CHANNEL', (action) => {
    setTimeout(() => {
      if (!action.self || !updateData) {
        return;
      }
      store.dispatch(actions.client.new_privmsg('♦ Aether Updater', action.channel, `Update is available at ${updateData.html_url} (${updateData.name})`, action.network_id));
    }, 5000);
  });

  registerForAction('CONNECTED', (action) => {
    const options = {
      hostname: 'api.github.com',
      port: 443,
      path: '/repos/Aurora0001/Aether/releases',
      method: 'GET',
      headers: {
        'User-Agent': 'Aether Updater Plugin v1.0.0'
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
        if (data[0].name !== this.clientVersion) {
          updateData = data[0];
          const notification = new Notification(`An update is available for Aether`, {
            body: `${data[0].name}\n${data[0].body}`
          });
        }
      });
    });

    post_req.end();
  });
};


module.exports = Updater;
