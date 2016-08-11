const pluginHooks = {
  
};

export function registerHook(actionName, fn) {
  const hooks = pluginHooks[actionName] || [];
  hooks.push(fn);
  pluginHooks[actionName] = hooks;
}

export const pluginMiddleware = (store) => (next) => (action) => {
  let result = next(action);
  const hooks = pluginHooks[action.type] || [];
  for (const hook of hooks) {
    hook(action);
  }
  return result;
}
