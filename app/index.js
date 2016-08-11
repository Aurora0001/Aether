import fs from 'fs';
import path from 'path';
import React from 'react';
import requireAll from 'require-all';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import routes from './routes';
import configureStore from './store/configureStore';
import { registerHook } from './store/pluginMiddleware';
import './app.global.css';

const PLUGIN_DIR = path.resolve('./app', 'plugins');

const store = configureStore();
const plugins = requireAll(PLUGIN_DIR);
Object.keys(plugins).forEach(key => {
  const plugin = new plugins[key](registerHook);
});
const history = syncHistoryWithStore(hashHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
