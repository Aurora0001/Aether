const YouTubePlugin = function(registerForAction, registerForMime, store, actions) {
  this.name = 'Embed Plugin';
  this.author = 'Aether Developers';
  this.description = 'Converts various links to embed links.';
  this.version = [1, 0, 0];
  this.uuid = 'e6095278-3f85-4f05-89b3-bdff684cf1d9';
  this.defaultSettings = {};
  this.settings = [];
  const matchers = {
    youtube: {
      matcher: /https?:\/\/.*\.youtube.com\/watch\?v=([A-Za-z0-9]+)/g,
      onMatch: (action, id) => action.href = `https://www.youtube.com/embed/${id[0]}`
    },
    twitter_status: {
      matcher: /(https?:\/\/twitter.com\/[A-Za-z0-9]+\/status\/[0-9]+)/g,
      onMatch: (action, id) => action.href = `https://twitframe.com/show?url=${id[0]}`
    },
    gist: {
      matcher: /(https?:\/\/gist.github.com\/[A-Za-z0-9]+\/[a-z0-9]+)/g,
      onMatch: (action, id) => action.href = `data:text/html,<script src="${id[0]}.js"></script>`
    }
  }
  registerForAction('WILL_OPEN_LINK', (action) => {
    Object.keys(matchers).forEach(key => {
      let id = matchers[key].matcher.exec(action.href);
      if (id) {
        matchers[key].onMatch(action, id);
      }
    });
  });
};


module.exports = YouTubePlugin;
