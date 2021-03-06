import crypto from 'crypto';
import { NEW_PRIVMSG, NEW_ACTION, JOIN_CHANNEL, PART_CHANNEL, KICK_CHANNEL,
         NEW_NOTICE, ADD_MODE, REMOVE_MODE, USER_QUIT, CONNECTED, RECEIVE_NAMES,
         NICK_CHANGE, SET_TOPIC, USER_KILLED, DISCONNECTED, SERVER_ERROR,
         NEW_SELF_PRIVMSG, REMOVE_CHANNEL, JOIN_PRIVMSG, RECEIVE_CTCP,
         RECEIVE_WHOIS, DISCONNECT_BEGIN, RECEIVE_MOTD, SEND_WHOIS
       } from '../actions/client';

const channelModes = {
  '+m': (channel, mode, argument) => `made ${channel} a moderated channel (+m)`,
  '-m': (channel, mode, argument) => `made ${channel} a non-moderated channel (-m)`,
  '+i': (channel, mode, argument) => `made ${channel} invite-only (+i)`,
  '-i': (channel, mode, argument) => `removed invite-only status for ${channel} (-i)`,
  '+s': (channel, mode, argument) => `made ${channel} secret (+s)`,
  '-s': (channel, mode, argument) => `removed secret status for ${channel} (-s)`,
  '+o': (channel, mode, argument) => `made ${argument} an operator (+o)`,
  '-o': (channel, mode, argument) => `removed ${argument}'s operator status (-o)`,
  '+v': (channel, mode, argument) => `gave ${argument} voice permissions (+v)`,
  '-v': (channel, mode, argument) => `removed ${argument}'s voice permissions (-v)`,
  '+h': (channel, mode, argument) => `made ${argument} a half-operator (+h)`,
  '-h': (channel, mode, argument) => `removed ${argument}'s half-operator status (-h)`,
  '+q': (channel, mode, argument) => `made ${argument} an owner (+q)`,
  '-q': (channel, mode, argument) => `removed ${argument}'s owner status (-q)`,
  '+a': (channel, mode, argument) => `made ${argument} an administrator (+a)`,
  '-a': (channel, mode, argument) => `removed ${argument}'s administrator status (-a)`,
  '+k': (channel, mode, argument) => `sets the channel password to ${argument} (+k)`,
  '-k': (channel, mode, argument) => `removes the channel password from ${channel} (-k)`,
  '+b': (channel, mode, argument) => `banned ${argument} (+b)`,
  '-b': (channel, mode, argument) => `unbanned ${argument} (-b)`,
};

let messageId = 0;

export function whoisRequested(state = {}, action) {
  switch (action.type) {
    case CONNECTED:
      const new_obj = Object.assign({}, state);
      new_obj[action.network_id] = {};
      return new_obj;
    case DISCONNECT_BEGIN:
      const disconnectObj = Object.assign({}, state);
      delete disconnectObj[action.network_id];
      return disconnectObj;
    case SEND_WHOIS:
      const sendObj = Object.assign({}, state);
      sendObj[action.network_id][action.user] = true;
      return sendObj;
    case RECEIVE_WHOIS:
      const whoisObj = Object.assign({}, state);
      delete whoisObj[action.network_id][action.info.nick];
      return whoisObj;
    default:
      return state;
  }
}

export function whoisData(state = {}, action) {
  switch (action.type) {
    case CONNECTED:
      const new_obj = Object.assign({}, state);
      new_obj[action.network_id] = {};
      return new_obj;
    case DISCONNECT_BEGIN:
      const disconnectObj = Object.assign({}, state);
      delete disconnectObj[action.network_id];
      return disconnectObj;
    case RECEIVE_WHOIS:
      const whoisObj = Object.assign({}, state);
      whoisObj[action.network_id][action.info.nick] = action.info;
      return whoisObj;
    default:
      return state;
  }
}

export function clients(state = {}, action) {
  switch (action.type) {
    case CONNECTED:
      const new_obj = Object.assign({}, state);
      new_obj[action.network_id] = action.client;
      return new_obj;
    case DISCONNECT_BEGIN:
      const disconnectObj = Object.assign({}, state);
      delete disconnectObj[action.network_id];
      return disconnectObj;
    default:
      return state;
  }
}

export function channels(state = {}, action) {
  switch (action.type) {
    case CONNECTED:
      const newObj = Object.assign({}, state);
      newObj[action.network_id] = {
        name: action.network_id,
        type: 'network',
        topic: `Status for ${action.network_id}`,
        network_id: action.network_id
      };
      return newObj;
    case JOIN_CHANNEL:
      if (!action.self) {
        return state;
      }
    case JOIN_PRIVMSG:
      return addChannel(state, action.channel, action.messageType || 'channel', action.network_id);
    case NEW_SELF_PRIVMSG:
      // Handles both JOIN_CHANNEL and NEW_SELF_PRIVMSG
      return addChannel(state, action.nick, 'pm', action.network_id);
    case PART_CHANNEL:
    case KICK_CHANNEL:
    case REMOVE_CHANNEL:
      if (!action.self) {
        return state;
      }
      const new_channels = Object.assign({}, state);
      delete new_channels[`${action.network_id}:${action.channel}`];
      return new_channels;
    case SET_TOPIC:
      let new_state = Object.assign({}, state);
      new_state[`${action.network_id}:${action.channel}`] = {
        name: action.channel,
        type: 'channel',
        topic: action.topic,
        network_id: action.network_id
      };
      return new_state;
    case DISCONNECT_BEGIN:
      let removedState = Object.assign({} ,state);
      Object.keys(removedState).forEach(key => {
        if (removedState[key].network_id === action.network_id) {
          delete removedState[key];
        }
      });
      return removedState;
    default:
      return state;
  }
}

function addChannel(state, channelName, type, networkId) {
  const new_obj = Object.assign({}, state);
  new_obj[`${networkId}:${channelName}`] = {
    name: channelName,
    type: type,
    topic: null,
    network_id: networkId
  };
  return new_obj;
}

export function feeds(state = {}, action) {
  switch (action.type) {
    case NEW_PRIVMSG:
      return append_message(state, action.network_id, action.nick, action.to,
                            action.text, 'privmsg');
    case NEW_ACTION:
      return append_message(state, action.network_id, action.nick, action.to,
                            action.text, 'action');
    case JOIN_CHANNEL:
      return append_message(state, action.network_id, action.nick,
                            action.channel, `joined ${action.channel}`, 'join');
    case PART_CHANNEL:
      return append_message(state, action.network_id, action.nick,
                            action.channel,
                            `left ${action.channel} (${action.reason})`,
                            'part');
    case KICK_CHANNEL:
      return append_message(state, action.network_id, action.nick, action.channel, `was kicked from ${action.channel} by ${action.by} (${action.reason})`, 'kick');
    case NEW_NOTICE:
      let newObj = Object.assign({}, state);
      return appendToChannelId(newObj, action.destChannel, action.sender,
                               action.to, action.text, 'notice');
    case RECEIVE_CTCP:
      let newState = Object.assign({}, state);
      return appendToChannelId(newState, action.destChannel, action.from,
                               action.to, `CTCP (${action.ctcpType}) ${action.text}`, 'ctcp');
    case ADD_MODE:
      if (channelModes[`+${action.mode}`]) {
        return append_message(state, action.network_id, action.by,
                              action.channel, channelModes[`+${action.mode}`](action.channel, action.mode, action.argument),
                              'addmode');
      }
      return append_message(state, action.network_id, action.by, action.channel,
                            `added mode +${action.mode} ${action.argument}`,
                            'addmode');
    case REMOVE_MODE:
    if (channelModes[`-${action.mode}`]) {
      return append_message(state, action.network_id, action.by,
                            action.channel, channelModes[`-${action.mode}`](action.channel, action.mode, action.argument),
                            'removemode');
    }
    return append_message(state, action.network_id, action.by, action.channel,
                          `removed mode -${action.mode} ${action.argument}`,
                          'removemode');
    case USER_QUIT:
      return append_message(state, action.network_id, action.nick,
                            action.channel, `has quit (${action.reason})`,
                            'quit');
    case USER_KILLED:
      return append_message(state, action.network_id, action.nick,
                            action.channel,
                            `was killed (${action.reason})`, 'killed');
    case NICK_CHANGE:
      return append_message(state, action.network_id, action.oldnick,
                            action.channel,
                            `is now known as ${action.newnick}`, 'nickchange');
    case SET_TOPIC:
      return append_message(state, action.network_id, action.nick,
                            action.channel, `set the topic to ${action.topic}`,
                            'topic');
    case RECEIVE_WHOIS:
      if (action.shouldNotify) {
        let whoisObj = Object.assign({}, state);
        whoisObj = appendToChannelId(whoisObj, action.destChannel, action.info.nick,
          action.destChannel, `Hostmask: ${action.info.nick}!${action.info.user}@${action.info.host}
          Connected to ${action.info.server} (${action.info.serverinfo})
          Real Name: ${action.info.realname}${action.info.operator ? '\nOperator Status: ' + action.info.operator : ''}
          Channels: ${action.info.channels.join(' ')}`,
          'whois');
        return whoisObj;
      }
      return state;
    case DISCONNECTED:
      return append_message(state, action.network_id, action.nick, action.channel, `was disconnected from the server (${action.message})`, 'disconnect');
    case SERVER_ERROR:
      let errorObj = Object.assign({}, state);
      return appendToChannelId(errorObj, action.channel, action.network_id,
                               action.channel, `An error has occurred: ${action.message}`,
                               'error');
    case RECEIVE_MOTD:
      let motdState = Object.assign({}, state);
      return appendToChannelId(motdState, action.network_id, action.network_id,
                               action.network_id, action.motd, 'motd');
    default:
      return state;
  }
}

export function users(state = {}, action) {
  switch (action.type) {
    case JOIN_CHANNEL:
      let new_state = Object.assign({}, state);
      if (action.self) {
        delete new_state[`${action.network_id}:${action.channel}`];
      }
      add_user(new_state, action.network_id, action.nick, '', action.channel);
      return new_state;
    case PART_CHANNEL:
    case KICK_CHANNEL:
    case USER_QUIT:
    case USER_KILLED:
      return remove_user(state, action.network_id, action.nick, action.channel);
    case RECEIVE_NAMES:
      let new_obj = Object.assign({}, state);
      const channel_id = `${action.network_id}:${action.channel}`;
      new_obj[channel_id] = [];
      Object.keys(action.nicks).forEach(nick => {
        const role = get_role(action.nicks[nick]);
        new_obj = add_user(new_obj, action.network_id, nick, role,
                           action.channel);
      });
      return new_obj;
    case NICK_CHANGE:
      return change_nick(state, action.network_id, action.channel,
                         action.oldnick, action.newnick);
    default:
      return state;
  }
}

function get_role_char(role_char) {
  switch (role_char) {
    case 'q':
      return 'owner';
    case 'a':
      return 'admin';
    case 'o':
      return 'op';
    case 'h':
      return 'halfop';
    case 'v':
      return 'voice';
    default:
      return '';
  }
}

function get_role(role_char) {
  switch (role_char) {
    case '~':
      return 'owner';
    case '&':
      return 'admin';
    case '@':
      return 'op';
    case '%':
      return 'halfop';
    case '+':
      return 'voice';
    default:
      return '';
  }
}

function change_nick(state, network_id, channel, oldnick, newnick) {
  let new_obj = Object.assign({}, state);
  const channel_id = `${network_id}:${channel}`;
  new_obj[channel_id] = new_obj[channel_id].map(x => {
    if (x.name === oldnick) {
      x.name = newnick;
    }
    return x;
  });
  return new_obj;
}

function add_user(state, network_id, nick, role, channel) {
    // Copy the current state
    let new_obj = Object.assign({}, state);
    const channel_id = `${network_id}:${channel}`;
    let user_feed = new_obj[channel_id] || [];
    user_feed.push({
      name: nick,
      role
    });
    new_obj[channel_id] = user_feed;
    return new_obj;
}

function remove_user(state, network_id, nick, channel) {
    // Copy the current state
    let new_obj = Object.assign({}, state);
    const channel_id = `${network_id}:${channel}`;
    let user_feed = new_obj[channel_id] || [];
    new_obj[channel_id] = user_feed.filter(item => item.name !== nick);
    return new_obj;
}

function append_message(state, networkId, nick, to, text, kind, useHtml = false) {
  // Copy the current state
  let newObj = Object.assign({}, state);
  const channelId = `${networkId}:${to}`;
  return appendToChannelId(newObj, channelId, nick, to, text, kind, useHtml);
}

function appendToChannelId(state, channelId, nick, to, text, kind, useHtml) {
  const channelMessages = ['join', 'part', 'quit', 'squash'];

  let channelFeed = state[channelId] || [];
  const lastMessage = channelFeed[channelFeed.length - 1];
  if (lastMessage && lastMessage.nick === nick && lastMessage.kind === kind
      && (kind === 'privmsg' || kind === 'notice' || kind === 'motd')) {
    // "Squash" privmsgs together from the same author.
    lastMessage.text += `\n${text}`;
    lastMessage.time = new Date();
  } else if (lastMessage && channelMessages.indexOf(lastMessage.kind) !== -1 && channelMessages.indexOf(kind) !== -1) {
    // "Squash" privmsgs together from the same author.
    lastMessage[kind].push(nick);
    lastMessage.kind = 'squash';
    const list = squashJoinList(squashChannelMessages(lastMessage.join, 'joined'), squashChannelMessages(lastMessage.part.concat(lastMessage.quit), 'left'));
    lastMessage.text = `${list}`;
    lastMessage.time = new Date();
    lastMessage.nick = to;
    lastMessage.useHtml = true;
  } else {
    // Different message - create new item
    const md5 = crypto.createHash('md5');
    md5.update(nick.toUpperCase());
    const digest = md5.digest('hex');
    // Currently, range is 0 - 255
    let hue = parseInt(digest.substr(0, 2), 16);
    for (let i = 3; i < 10; i++) {
      hue += parseInt(digest[i], 16);
    }

    const action = {
      nick,
      to,
      text,
      kind,
      colour: `hsl(${hue}, 50%, 58%)`,
      useHtml,
      time: new Date(),
      id: messageId++
    };

    if (channelMessages.indexOf(kind) !== -1) {
      action.quit = [];
      action.part = [];
      action.join = [];
      action[kind].push(nick);
    }

    channelFeed.push(action);
    state[channelId] = channelFeed;
  }
  return state;
}


function squashChannelMessages(list, verb) {
  if (list.length === 0) {
    return '';
  }

  let userMap = {};
  for (let user of list) {
    if (userMap.hasOwnProperty(user)) {
      userMap[user] += 1;
    } else {
      userMap[user] = 1;
    }
  }

  const displayedUserList = Object.keys(userMap)
    .map(name => `${name}${userMap[name] > 1 ? ` (${userMap[name]})` : ''}`)

  let word_list;
  if (list.length <= 2) {
    word_list = displayedUserList.map(x => `<strong>${x}</strong>`).join(' and ');
  } else {
    word_list = `<abbr title="${displayedUserList.join(', ')}">${list.length} users</abbr>`;
  }
  return `${word_list} ${verb}`;
}

function squashJoinList(...args) {
  let items = [];
  for (let arg of args) {
    if (arg !== '') {
      items.push(arg);
    }
  }
  return items.join(', ');
}
