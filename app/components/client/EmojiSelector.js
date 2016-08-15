import React, { Component, PropTypes } from 'react';
import twemoji from 'twemoji';
const twemojiImages = require.context('file!../../static/72x72', true, /\.png$/);
import styles from './ChatBar.css';
import emojiList from './emoji_map.json';

class EmojiSelector extends Component {
  static PropTypes = {
    insertEmoji: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      emoji: emojiList.map(item => {
        const emojiCode = item.unicode;
        const emojiImg = twemoji.parse(emojiCode, (icon, options) => {
          return twemojiImages('./' + icon + '.png');
        });
        return (
          <li
            onClick={() => this.props.insertEmoji(item.unicode)}
            className={styles.emoji_item}
            key={item.unicode}
            dangerouslySetInnerHTML={{
              __html: emojiImg
            }}
          />
        );
      })
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.hidden !== this.props.hidden;
  }

  render() {
    return (
      <div
        className={`${styles.emoji_list} ${this.props.hidden?styles.hidden:null}`}
      >
        <h3>Emoji</h3>
        <ul>
          {
            this.state.emoji
          }
        </ul>
      </div>
    );
  }
}

export default EmojiSelector;
