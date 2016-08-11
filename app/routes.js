import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import ClientPage from './containers/ClientPage';
import SettingsPage from './containers/SettingsPage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/client" component={ClientPage} />
    <Route path="/settings" component={SettingsPage} />
  </Route>
);
