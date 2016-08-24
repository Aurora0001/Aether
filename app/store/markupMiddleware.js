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
  let currentProps = [];
  let items = [];
  let i = 0;
  while (text) {
    let character = text[0];
    text = text.slice(1);
    if (formatChars.hasOwnProperty(character)) {
      if (content !== '') {
        items.push(React.createElement(
          currentElement[currentElement.length - 1],
          {...currentProps[currentProps.length - 1], key: i++},
          emoji(content, (code, string, offset) => {
            return <img className="emoji" src={twemojiImages('./' + code + '.png')} alt={string} key={offset} />;
          })
        ));
        content = '';
      }
      if (currentElement[currentElement.length - 1] === formatChars[character]) {
        currentElement.pop();
        currentProps.pop();
      } else {
        currentElement.push(formatChars[character]);
        currentProps.push({});
      }
    } else if (character === '\x03') {
      const matcher = /^([0-9]{1,2})(,[0-9]{1,2})?/;
      let res = matcher.exec(text);
      if (res) {
        if (content !== '') {
          items.push(React.createElement(
            currentElement[currentElement.length - 1],
            {...currentProps[currentProps.length - 1], key: i++},
            emoji(content, (code, string, offset) => {
              return <img className="emoji" src={twemojiImages('./' + code + '.png')} alt={string} key={offset} />;
            })
          ));
          content = '';
        }

        text = text.replace(matcher, '');
        currentElement.push('span');
        currentProps.push({className: `bg-${res[2]?parseInt(res[2].slice(1), 10):'none'} fg-${parseInt(res[1], 10)}`});
      }
    } else {
      content += character;
    }
  }

  items.push(React.createElement(
    currentElement[currentElement.length - 1],
    {...currentProps[currentProps.length - 1], key: i++},
    emoji(content, (code, string, offset) => {
      return <img className="emoji" src={twemojiImages('./' + code + '.png')} alt={string} key={offset} />;
    })
  ));

  return items;
}
