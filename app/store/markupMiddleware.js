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
        emoji(line, (code, string, offset) => {
          return <img className="emoji" src={twemojiImages('./' + code + '.png')} alt={string} key={offset} />;
        })
      }
    </span>);
    linedText.push(<br key={i++} />);
  }
  return linedText;
}
