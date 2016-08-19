import React from 'react';
import Combokeys from 'combokeys';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import { beginSearch, endSearch } from './actions/ui';
import './app.global.css';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

let combokeys = new Combokeys(document.documentElement);
combokeys.bind(['command+f', 'ctrl+f'], function() {
  store.dispatch(beginSearch());
  return false;
});

combokeys.bind(['esc'], function() {
  store.dispatch(endSearch());
});

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
