import path from 'path';
import requireAll from 'require-all';

import * as clientActions from '../actions/client.js';
import * as uiActions from '../actions/ui.js';
import { VERSION } from '../APP_INFORMATION.js';

const PLUGIN_DIR = path.resolve('.', 'plugins');

const pluginHooks = {

};

export function registerHook(actionName, fn) {
  const hooks = pluginHooks[actionName] || [];
  hooks.push(fn);
  pluginHooks[actionName] = hooks;
}

export const pluginMiddleware = (store) => (next) => (action) => {
  const hooks = pluginHooks[action.type] || [];
  for (const hook of hooks) {
    hook(action);
  }
  let result = next(action);
  return result;
}

export function loadPlugins(store) {
  const plugins = requireAll(PLUGIN_DIR);
  Object.keys(plugins).forEach(key => {
    const Plugin = plugins[key];
    const plugin = new Plugin(registerHook, (...args) => {
      store.dispatch(uiActions.registerHandler(...args))
    }, store, {
      client: clientActions,
      ui: uiActions
    });

    plugin.getSettings = () => store.getState().pluginSettings[plugin.uuid];
    plugin.clientVersion = VERSION;

    store.dispatch(uiActions.addPlugin(plugin));
    console.log(`Loaded ${plugin.name} v${plugin.version.join('.')} [${plugin.uuid}]`);
  });
}
