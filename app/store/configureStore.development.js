import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import { hashHistory } from 'react-router';
import { routerMiddleware, push } from 'react-router-redux';
import createEngine from 'redux-storage-engine-localstorage';
import filter from 'redux-storage-decorator-filter';
import * as storage from 'redux-storage';

import rootReducer from '../reducers';
import * as clientActions from '../actions/client.js';
import * as uiActions from '../actions/ui.js';
import { pluginMiddleware } from './pluginMiddleware.js';

const actionCreators = {
  ...clientActions,
  ...uiActions,
  push,
};

const logger = createLogger({
  level: 'info',
  collapsed: true,
});

const router = routerMiddleware(hashHistory);
let engine = createEngine('redux');

engine = filter(engine, [
  'networks'
], []);
const storeMiddleware = storage.createMiddleware(engine, [], [
  uiActions.ADD_NETWORK,
  uiActions.REMOVE_NETWORK
]);

const enhancer = compose(
  applyMiddleware(thunk, router, logger, pluginMiddleware, storeMiddleware),
  window.devToolsExtension ?
    window.devToolsExtension({ actionCreators }) :
    noop => noop
);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  if (window.devToolsExtension) {
    window.devToolsExtension.updateStore(store);
  }

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    );
  }

  storage.createLoader(engine)(store);
  return store;
}
