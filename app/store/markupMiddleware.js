import React from 'react';
import emoji from 'react-easy-emoji';
const twemojiImages = require.context('file!../static/72x72', true, /\.png$/);
import { NEW_PRIVMSG, NEW_SELF_PRIVMSG, NEW_ACTION } from '../actions/client.js';

export const markup = (text) => {
  const splitText = text.split('\n');
  let linedText = [];
  let i = 0;
  for (let line of splitText) {
    linedText.push(<span key={i++}>
      {
        boldify(line)
      }
    </span>);
    linedText.push(<br key={i++} />);
  }
  return linedText;
}

const formatChars = {
  '\x02': 'b',
  '\x1D': 'i',
  '\x1F': 'u'
};

const boldify = (text) => {
  let content = '';
  let currentElement = ['span'];
  let items = [];
  for (let character of text) {
    if (formatChars.hasOwnProperty(character)) {
      items.push(React.createElement(
        currentElement[currentElement.length - 1],
        {},
        emoji(content, (code, string, offset) => {
          return <img className="emoji" src={twemojiImages('./' + code + '.png')} alt={string} key={offset} />;
        })
      ));
      content = '';
      if (currentElement[currentElement.length - 1] === formatChars[character]) {
        currentElement.pop();
      } else {
        currentElement.push(formatChars[character]);
      }
    } else {
      content += character;
    }
  }

  items.push(React.createElement(
    currentElement[currentElement.length - 1],
    {},
    content
  ));

  return items;
}
