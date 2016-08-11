// Rename this to plugin.js to run this plugin.
const fs = require('fs');
class NotifyPlugin {
  constructor(registerForAction) {
    registerForAction('NEW_PRIVMSG', this.onPrivmsg);
  }

  onPrivmsg(action) {
    const notification = new Notification(`${action.nick} (${action.to}) said:`, {
      body: action.text
    });
  }

}

module.exports = NotifyPlugin;
