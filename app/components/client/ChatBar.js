import React, { Component, PropTypes } from 'react';
import twemoji from 'twemoji';
import EmojiSelector from './EmojiSelector.js';
const twemojiImages = require.context('file!../../static/72x72', true, /\.png$/);
import styles from './ChatBar.css';

class ChatBar extends Component {
  static PropTypes = {
    callback: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      text: '',
      hidden: true
    };
  }

  inputChange = (event) => {
    this.setState({
      text: event.target.value,
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
        text: ''
      });
    }
  }

  insertEmoji = (icon) => {
    this.setState({
      text: this.state.text + icon
    });
  };

  toggleEmoji = () => {
    this.setState({
      hidden: !this.state.hidden
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
        <EmojiSelector hidden={this.state.hidden} insertEmoji={this.insertEmoji} />
      </div>
    );
  }
}

export default ChatBar;
