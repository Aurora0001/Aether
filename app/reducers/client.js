import crypto from 'crypto';
import { NEW_PRIVMSG, NEW_ACTION, JOIN_CHANNEL, PART_CHANNEL, KICK_CHANNEL,
         NEW_NOTICE, ADD_MODE, REMOVE_MODE, USER_QUIT, CONNECTED, RECEIVE_NAMES,
         NICK_CHANGE, SET_TOPIC, USER_KILLED, DISCONNECTED, SERVER_ERROR,
         NEW_SELF_PRIVMSG, REMOVE_CHANNEL, JOIN_PRIVMSG
       } from '../actions/client';

export function clients(state = {}, action) {
  switch (action.type) {
    case CONNECTED:
      const new_obj = Object.assign({}, state);
      new_obj[action.network_id] = action.client;
      return new_obj;
    default:
      return state;
  }
}

export function channels(state = {}, action) {
  switch (action.type) {
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
    case ADD_MODE:
      return append_message(state, action.network_id, action.by, action.channel,
                            `added mode +${action.mode} ${action.argument}`,
                            'addmode');
    case REMOVE_MODE:
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
    case DISCONNECTED:
      return append_message(state, action.network_id, action.nick, action.channel, `was disconnected from the server (${action.message})`, 'disconnect');
    case SERVER_ERROR:
      return append_message(state, action.network_id, action.server,
                             action.channel,
                            `An error has occurred: ${action.message}`,
                            'error');
    default:
      return state;
  }
}

export function users(state = {}, action) {
  switch (action.type) {
    case JOIN_CHANNEL:
      if (!action.self) {
        return state;
      }
      let new_state = Object.assign({}, state);
      delete new_state[`${action.network_id}:${action.channel}`];
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

function append_message(state, networkId, nick, to, text, kind) {
  // Copy the current state
  let newObj = Object.assign({}, state);
  const channelId = `${networkId}:${to}`;
  return appendToChannelId(newObj, channelId, nick, to, text, kind);
}

function appendToChannelId(state, channelId, nick, to, text, kind) {
  let channelFeed = state[channelId] || [];
  const lastMessage = channelFeed[channelFeed.length - 1];
  if (lastMessage && lastMessage.nick === nick && lastMessage.kind === kind
      && (kind === 'privmsg' || kind === 'notice')) {
    // "Squash" privmsgs together from the same author.
    lastMessage.text += `<br>${text}`;
    lastMessage.time = new Date();
  } else {
    // Different message - create new item
    const md5 = crypto.createHash('md5');
    md5.update(nick.toUpperCase());

    const action = {
      nick,
      to,
      text,
      kind,
      colour: `#${md5.digest('hex').substr(0, 6)}`,
      time: new Date()
    };

    channelFeed.push(action);
    state[channelId] = channelFeed;
  }
  return state;
}
