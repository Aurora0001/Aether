import React, { Component, PropTypes } from 'react';
import styles from './ChatBar.css';

class ChatBar extends Component {
  static PropTypes = {
    callback: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
  }

  inputChange = (event) => {
    this.setState({
      text: event.target.value
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
            text: words.join(' ')
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
        <button
          type="submit"
          className={this.state.text==='' ? styles.disabled : ''}
          onClick={this.clickEvent}
        >
          Send
        </button>
      </div>
    );
  }
}

export default ChatBar;
