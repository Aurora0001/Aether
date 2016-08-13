import fs from 'fs';
import path from 'path';
import requireAll from 'require-all';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import createEngine from 'redux-storage-engine-localstorage';
import * as storage from 'redux-storage';
import filter from 'redux-storage-decorator-filter';

import rootReducer from '../reducers';
import * as uiActions from '../actions/ui.js';
import { pluginMiddleware, registerHook, loadPlugins } from './pluginMiddleware.js';

const router = routerMiddleware(hashHistory);

let engine = createEngine('redux');

engine = filter(engine, [
  'networks',
  'pluginSettings'
], []);
const storeMiddleware = storage.createMiddleware(engine, [], [
  uiActions.ADD_NETWORK,
  uiActions.REMOVE_NETWORK,
  uiActions.ADD_PLUGIN,
  uiActions.SET_PLUGIN_SETTINGS
]);

const enhancer = applyMiddleware(thunk, router, pluginMiddleware, storeMiddleware);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  const load = storage.createLoader(engine);
  load(store).then(newState => {
    loadPlugins(store);
  });
  return store;
}
