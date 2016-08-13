import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import ClientPage from './containers/ClientPage';
import SettingsPage from './containers/SettingsPage';
import NetworkSettings from './components/settings/settings_pages/NetworkSettings.js';
import PluginSettings from './components/settings/settings_pages/PluginSettings.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="client" component={ClientPage} />
    <Route path="settings" component={SettingsPage}>
      <IndexRoute component={NetworkSettings} />
      <Route path="networks" component={NetworkSettings} />
      <Route path="plugins" component={PluginSettings} />
    </Route>
  </Route>
);
