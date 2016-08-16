const EnforcerPlugin = function(registerForAction, registerForMime, store, actions) {
  this.name = 'Enforcer Plugin';
  this.author = 'Aurora0001';
  this.description = 'Sends a polite notice to users who have not yet converted to Aether.';
  this.version = [1, 0, 0];
  this.uuid = 'c162145a-28e1-4c0c-b20e-6db3a83498f8';
  this.defaultSettings = {

  };
  this.settings = [

  ];

  registerForAction('JOIN_CHANNEL', (action) => {
    store.dispatch(actions.client.sendCtcp(action.nick, 'privmsg', 'version', action.network_id));
  });
  registerForAction('RECEIVE_CTCP', (action) => {
    const text = action.text.toLowerCase();
    if (text.indexOf('aether') === -1 && action.ctcpType == 'notice' && text.indexOf('version') !== -1) {
      store.dispatch(actions.client.send_privmsg(action.from, 'CONVERT TO AETHER NOW (https://github.com/Aurora0001/Aether/releases)', action.network_id));
    }
  });
};


module.exports = EnforcerPlugin;
