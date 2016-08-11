import { CHANGE_CURRENT_CHANNEL, CREATE_NETWORK_TAB, FOLD_NETWORK_TAB,
         EXPAND_NETWORK_TAB, ADD_NETWORK, REMOVE_NETWORK
       } from '../actions/ui.js';
import { NEW_PRIVMSG } from '../actions/client.js';

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
