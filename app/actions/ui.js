export const CHANGE_CURRENT_CHANNEL = 'CHANGE_CURRENT_CHANNEL';
export const FOLD_NETWORK_TAB = 'FOLD_NETWORK_TAB';
export const EXPAND_NETWORK_TAB = 'EXPAND_NETWORK_TAB';
export const CREATE_NETWORK_TAB = 'CREATE_NETWORK_TAB';
export const ADD_NETWORK = 'ADD_NETWORK';
export const REMOVE_NETWORK = 'REMOVE_NETWORK';
export const DROPPED_FILE = 'DROPPED_FILE';
export const ADD_PLUGIN = 'ADD_PLUGIN';
export const SET_PLUGIN_SETTINGS = 'SET_PLUGIN_SETTINGS';
export const REGISTER_HANDLER = 'REGISTER_HANDLER';

export function registerHandler(mime, handler) {
  return (dispatch, getState) => {
    if (!getState().dragDropHandlers.hasOwnProperty(mime)) {
      const action = {
        type: REGISTER_HANDLER,
        mime,
        handler
      };
      dispatch(action);
    }
  };
}

export function addPlugin(plugin) {
  return {
    type: ADD_PLUGIN,
    plugin
  };
}

export function setPluginSettings(uuid, settings) {
  return {
    type: SET_PLUGIN_SETTINGS,
    uuid,
    settings
  };
}

export function droppedFile(mime, file, contents, channel, networkId) {
  return (dispatch, getState) => {
    const action = {
      type: DROPPED_FILE,
      mime,
      file,
      contents,
      channel,
      network_id: networkId
    };

    const handler = getState().dragDropHandlers[mime];
    if (handler) {
      handler(action);
    } else {
      const defaultHandler = getState().dragDropHandlers[''];
      if (defaultHandler) {
        defaultHandler(action);
      }
    }
    dispatch(action);
  }
}

export function change_current_channel(networkId, new_channel) {
  if (new_channel) {
    return {
      type: CHANGE_CURRENT_CHANNEL,
      new_channel: `${networkId}:${new_channel}`
    };
  } else {
    return {
      type: CHANGE_CURRENT_CHANNEL,
      new_channel: `${networkId}`
    };
  }
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

export function add_network(name, host, port, ssl, nick, ident, real, password, sasl, invalid, defaultChannels = []) {
  return {
    type: ADD_NETWORK,
    host,
    port,
    ssl,
    nick,
    ident,
    real,
    name,
    password,
    sasl,
    invalid,
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
