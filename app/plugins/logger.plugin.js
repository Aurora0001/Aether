const fs = require('fs');
class LoggerPlugin {
  // TODO: use path NETWORK_NAME/#CHANNEL.log
  constructor(registerForAction) {
    registerForAction('NEW_PRIVMSG', this.onPrivmsg);
    registerForAction('NEW_ACTION', this.onPrivmsg);
    registerForAction('JOIN_CHANNEL', this.onJoin);
    registerForAction('PART_CHANNEL', this.onPart);
    registerForAction('USER_QUIT', this.onQuit);
    registerForAction('NICK_CHANGE', this.onNick);
  }

  onPrivmsg(action) {
    const date = new Date();
    const fmt = `[${date.toString()}] <${action.nick}> ${action.text}\n`;
    fs.appendFile(`./${action.network_id.replace(':', '_')}_${action.to}.log`,
                  fmt, (err) => {
      if (err) throw err;
    });
  }

  onJoin(action) {
    const date = new Date();
    const fmt = `[${date.toString()}] ${action.nick} joined\n`;
    fs.appendFile(`./${action.network_id.replace(':', '_')}_${action.channel}.log`,
                  fmt, (err) => {
      if (err) throw err;
    });
  }

  onPart(action) {
    const date = new Date();
    const fmt = `[${date.toString()}] ${action.nick} parted\n`;
    fs.appendFile(`./${action.network_id.replace(':', '_')}_${action.channel}.log`,
                  fmt, (err) => {
      if (err) throw err;
    });
  }

  onQuit(action) {
    const date = new Date();
    const fmt = `[${date.toString()}] ${action.nick} quit\n`;
    fs.appendFile(`./${action.network_id.replace(':', '_')}_${action.channel}.log`,
                  fmt, (err) => {
      if (err) throw err;
    });
  }

  onNick(action) {
    const date = new Date();
    const fmt = `[${date.toString()}] Nick change: ${action.oldnick} -> ${action.newnick}\n`;
    fs.appendFile(`./${action.network_id.replace(':', '_')}_${action.channel}.log`,
                  fmt, (err) => {
      if (err) throw err;
    });
  }
}

module.exports = LoggerPlugin;
