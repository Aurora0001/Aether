import React, { Component, PropTypes } from 'react';
import styles from './ChatBar.css';

class ChatBar extends Component {
  static PropTypes = {
    callback: PropTypes.func.isRequired
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
    if (event.keyCode === 13) {
      this.clickEvent();
    }
  }

  clickEvent = () => {
    this.props.callback(this.state.text);
    this.setState({
      text: ''
    });
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
        <button type="submit" onClick={this.clickEvent}>Send</button>
      </div>
    );
  }
}

export default ChatBar;
