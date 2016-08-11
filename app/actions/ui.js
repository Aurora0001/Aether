export const CHANGE_CURRENT_CHANNEL = 'CHANGE_CURRENT_CHANNEL';
export const FOLD_NETWORK_TAB = 'FOLD_NETWORK_TAB';
export const EXPAND_NETWORK_TAB = 'EXPAND_NETWORK_TAB';
export const CREATE_NETWORK_TAB = 'CREATE_NETWORK_TAB';
export const ADD_NETWORK = 'ADD_NETWORK';
export const REMOVE_NETWORK = 'REMOVE_NETWORK';

export function change_current_channel(networkId, new_channel) {
  return {
    type: CHANGE_CURRENT_CHANNEL,
    new_channel: `${networkId}:${new_channel}`
  };
}

export function fold_network_tab(networkId) {
  return {
    type: FOLD_NETWORK_TAB,
    network_id: networkId
  };
}

export function expand_network_tab(networkId) {
  return {
    type: EXPAND_NETWORK_TAB,
    network_id: networkId
  };
}

export function create_network_tab(networkId) {
  return {
    type: CREATE_NETWORK_TAB,
    network_id: networkId
  };
}

export function add_network(name, host, port, ssl, nick, ident, real, defaultChannels = []) {
  return {
    type: ADD_NETWORK,
    host,
    port,
    ssl,
    nick,
    ident,
    real,
    name,
    default_channels: defaultChannels
  };
}

export function remove_network(host, port) {
  return {
    type: REMOVE_NETWORK,
    host,
    port
  };
}
