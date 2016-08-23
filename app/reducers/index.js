import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import * as storage from 'redux-storage';
import { clients, feeds, users, channels, whoisData, whoisRequested } from './client.js';
import { current_channel, network_states, channel_counter, networks,
         highlightWords, pluginSettings, pluginList, dragDropHandlers,
         dropProgress, searching, searchText
       } from './ui.js';

const rootReducer = combineReducers({
  clients,
  feeds,
  users,
  channels,
  routing,
  networks,
  current_channel,
  network_states,
  channel_counter,
  highlightWords,
  pluginSettings,
  pluginList,
  dragDropHandlers,
  dropProgress,
  searching,
  searchText,
  whoisData,
  whoisRequested
});

export default storage.reducer(rootReducer);
