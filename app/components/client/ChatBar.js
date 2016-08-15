import React, { Component, PropTypes } from 'react';
import twemoji from 'twemoji';
const twemojiImages = require.context('file!../../static/72x72', true, /\.png$/);
import styles from './ChatBar.css';
import emojiList from './emoji_map.json';

class ChatBar extends Component {
  static PropTypes = {
    callback: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      hidden: true,
      emoji: emojiList.map(item => {
        const emojiCode = item.unicode;
        const emojiImg = twemoji.parse(emojiCode, (icon, options) => {
          return twemojiImages('./' + icon + '.png');
        });
        return (
          <li
            onClick={() => this.insertEmoji(item.unicode)}
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

  inputChange = (event) => {
    this.setState({
      text: event.target.value,
      hidden: this.state.hidden,
      emoji: this.state.emoji
    });
  }

  keyPress = (event) => {
    if (event.keyCode === 9) {
      event.preventDefault();
      let words = this.state.text.split(' ');
      if (words.length >= 1) {
        const lastWord = words[words.length - 1];
        const suggestions = this.props.users
          .filter(user => user.name.startsWith(lastWord));
        if (suggestions[0]) {
          words.pop();
          words.push(suggestions[0].name);
          this.setState({
            text: words.join(' '),
            hidden: this.state.hidden,
            emoji: this.state.emoji
          });
        }
      }
    } else if (event.keyCode === 13) {
      this.clickEvent();
    }
  }

  clickEvent = () => {
    if (this.state.text !== '') {
      this.props.callback(this.state.text);
      this.setState({
        text: '',
        hidden: this.state.hidden,
        emoji: this.state.emoji
      });
    }
  }

  insertEmoji = (icon) => {
    this.setState({
      text: this.state.text + icon,
      hidden: this.state.hidden,
      emoji: this.state.emoji
    });
  };

  toggleEmoji = () => {
    this.setState({
      text: this.state.text,
      hidden: !this.state.hidden,
      emoji: this.state.emoji
    });
  };

  render() {
    return (
      <div className={styles.chat_bar}>
        <input
          type="text"
          placeholder="Write your message here, and press Enter to send. Markdown is supported."
          onChange={this.inputChange}
          onKeyDown={this.keyPress}
          value={this.state.text}
        />
        <a className={styles.emoji_add} onClick={this.toggleEmoji}>
          <i className="material-icons">
            insert_emoticon
          </i>
        </a>
        <button
          type="submit"
          className={this.state.text==='' ? styles.disabled : ''}
          onClick={this.clickEvent}
        >
          Send
        </button>
        <div
          className={`${styles.emoji_list} ${this.state.hidden?styles.hidden:null}`}
        >
          <h3>Emoji</h3>
          <ul>
            {
              this.state.emoji
            }
          </ul>
        </div>
      </div>
    );
  }
}

export default ChatBar;
