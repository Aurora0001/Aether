import marked from 'marked';
import twemoji from 'twemoji';
const twemojiImages = require.context('file!../static/72x72', true, /\.png$/);
import { NEW_PRIVMSG, NEW_SELF_PRIVMSG } from '../actions/client.js';

const renderer = new marked.Renderer();
renderer.paragraph = (text) => text;
renderer.link = (href, title, text) =>
  `<a target="_blank" href="${href}" title="${title}">${text}</a>`;

renderer.image = (href, title, text) => `![${text}](${href})`;

marked.setOptions({
  renderer,
  gfm: true,
  tables: false,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: false,
  smartypants: false
});

export const markupMiddleware = (store) => (next) => (action) => {
  if (action.type === NEW_PRIVMSG || action.type === NEW_SELF_PRIVMSG) {
    const marked_text = marked(action.text);
    const final_text = twemoji.parse(marked_text, (icon, options) => {
      return twemojiImages('./' + icon + '.png');
    });
    action.text = final_text;
  }
  let result = next(action);
  return result;
}
