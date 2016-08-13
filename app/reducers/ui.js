import { CHANGE_CURRENT_CHANNEL, CREATE_NETWORK_TAB, FOLD_NETWORK_TAB,
         EXPAND_NETWORK_TAB, ADD_NETWORK, REMOVE_NETWORK,
         ADD_PLUGIN, SET_PLUGIN_SETTINGS, REGISTER_HANDLER
       } from '../actions/ui.js';
import { CONNECTED, NEW_PRIVMSG, NEW_ACTION, NICK_CHANGE }
      from '../actions/client.js';

export function current_channel(state = '', action) {
  switch (action.type) {
    case CHANGE_CURRENT_CHANNEL:
      return action.new_channel;
    default:
      return state;
  }
}

export function network_states(state = {}, action) {
  switch (action.type) {
    case FOLD_NETWORK_TAB:
      const folded_state = Object.assign({}, state);
      folded_state[action.network_id] = false;
      return folded_state;
    case EXPAND_NETWORK_TAB:
    case CREATE_NETWORK_TAB:
      const expanded_state = Object.assign({}, state);
      expanded_state[action.network_id] = true;
      return expanded_state;
    default:
      return state;
  }
}

export function channel_counter(state = {}, action) {
  switch (action.type) {
    case NEW_PRIVMSG:
    case NEW_ACTION:
      const channelCounter = state[`${action.network_id}:${action.to}`] || 0;
      if (channelCounter === -1) {
        return state;
      }

      let new_state = Object.assign({}, state);
      new_state[`${action.network_id}:${action.to}`] = channelCounter + 1;
      return new_state;
    case CHANGE_CURRENT_CHANNEL:
      const counters = Object.assign({}, state);
      Object.keys(counters).forEach(counter => {
        if (counters[counter] === -1) {
          counters[counter] = 0;
        }
      });
      counters[action.new_channel] = -1;
      return counters;
    default:
      return state;
  }
}

export function networks(state = [], action) {
  switch (action.type) {
    case ADD_NETWORK:
      return [
        ...state,
        {
          host: action.host,
          port: action.port,
          ssl: action.ssl,
          nick: action.nick,
          ident: action.ident,
          real: action.real,
          name: action.name,
          default_channels: action.default_channels
        }
      ];
    case REMOVE_NETWORK:
      return state.filter(item => {
        return `${item.host}:${item.port}` !== `${action.host}:${action.port}`;
      });
    default:
      return state;
  }
}

export function highlightWords(state = {}, action) {
  switch (action.type) {
    case CONNECTED:
      const newState = Object.assign({}, state);
      newState[action.network_id] = [
        {
          word: action.client.nick,
          nick: true
        }
      ];
      return newState;
    case NICK_CHANGE:
      if (!action.self) {
        return state;
      }
      const modifiedState = Object.assign({}, state);
      const networkWords = modifiedState[action.network_id] || [];
      if (networkWords.filter(item => item.word === action.newnick && item.nick).length === 0) {
        modifiedState[action.network_id] = networkWords
          .filter(item => item.word !== action.oldnick || !item.nick);
        modifiedState[action.network_id].push({
          word: action.newnick,
          nick: true
        });
        return modifiedState;
      } else {
        return state;
      }
    default:
      return state;
  }
}

export function pluginList(state = [], action) {
  switch (action.type) {
    case ADD_PLUGIN:
      return [
        ...state,
        {
            ...action.plugin
        }
      ];
    default:
      return state;
  }
}

export function pluginSettings(state = {}, action) {
  switch (action.type) {
    case ADD_PLUGIN:
      if (state.hasOwnProperty(action.plugin.uuid)) {
        return state;
      }
      const newObj = Object.assign({}, state);
      newObj[action.uuid] = action.plugin.defaultSettings;
      return newObj;
    case SET_PLUGIN_SETTINGS:
      const newSettings = Object.assign({}, state);
      newSettings[action.uuid] = action.settings;
      return newSettings;
    default:
      return state;
  }
}

export function dragDropHandlers(state = {}, action) {
  switch (action.type) {
    case REGISTER_HANDLER:
      const newObj = Object.assign({}, state);
      newObj[action.mime] = action.handler;
      return newObj;
    default:
      return state;
  }
}
