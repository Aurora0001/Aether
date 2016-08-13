const fs = require('fs');
const LoggerPlugin = function(registerForAction, registerMime) {
  this.name = 'File Logger';
  this.author = 'IRC Client';
  this.description = 'Logs messages to a text file for each channel.';
  this.version = [0, 1, 0];
  this.uuid = '433162f7-89e8-4cef-a2da-b2b3ae12f1ff';
  this.defaultSettings = {};
  this.settings = [
    
  ];
  registerForAction('NEW_PRIVMSG', this.onPrivmsg);
  registerForAction('NEW_ACTION', this.onPrivmsg);
  registerForAction('JOIN_CHANNEL', this.onJoin);
  registerForAction('PART_CHANNEL', this.onPart);
  registerForAction('USER_QUIT', this.onQuit);
  registerForAction('NICK_CHANGE', this.onNick);
};

LoggerPlugin.prototype.onPrivmsg = (action) => {
  const date = new Date();
  const fmt = `[${date.toString()}] <${action.nick}> ${action.text}\n`;
  fs.appendFile(`./${action.network_id.replace(':', '_')}_${action.to}.log`,
                fmt, (err) => {
    if (err) throw err;
  });
};

LoggerPlugin.prototype.onJoin = (action) => {
  const date = new Date();
  const fmt = `[${date.toString()}] ${action.nick} joined\n`;
  fs.appendFile(`./${action.network_id.replace(':', '_')}_${action.channel}.log`,
                fmt, (err) => {
    if (err) throw err;
  });
};

LoggerPlugin.prototype.onPart = (action) => {
  const date = new Date();
  const fmt = `[${date.toString()}] ${action.nick} parted\n`;
  fs.appendFile(`./${action.network_id.replace(':', '_')}_${action.channel}.log`,
                fmt, (err) => {
    if (err) throw err;
  });
};

LoggerPlugin.prototype.onQuit = (action) => {
  const date = new Date();
  const fmt = `[${date.toString()}] ${action.nick} quit\n`;
  fs.appendFile(`./${action.network_id.replace(':', '_')}_${action.channel}.log`,
                fmt, (err) => {
    if (err) throw err;
  });
};

LoggerPlugin.prototype.onNick = (action) => {
  const date = new Date();
  const fmt = `[${date.toString()}] Nick change: ${action.oldnick} -> ${action.newnick}\n`;
  fs.appendFile(`./${action.network_id.replace(':', '_')}_${action.channel}.log`,
                fmt, (err) => {
    if (err) throw err;
  });
}

module.exports = LoggerPlugin;
