import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import createEngine from 'redux-storage-engine-localstorage';
import * as storage from 'redux-storage';
import filter from 'redux-storage-decorator-filter';

import rootReducer from '../reducers';
import * as uiActions from '../actions/ui.js';
import { pluginMiddleware } from './pluginMiddleware.js';

const router = routerMiddleware(hashHistory);

let engine = createEngine('redux');

engine = filter(engine, [
  'networks'
], []);
const storeMiddleware = storage.createMiddleware(engine, [], [
  uiActions.ADD_NETWORK,
  uiActions.REMOVE_NETWORK
]);

const enhancer = applyMiddleware(thunk, router, pluginMiddleware, storeMiddleware);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);
  storage.createLoader(engine)(store);
  return store;
}
