import React, { Component, PropTypes } from 'react';
import TitleBar from './TitleBar.js';
import ChatMessage from './ChatMessage.js';
import ChatBar from './ChatBar.js';
import styles from './ChatBox.css';

class ChatBox extends Component {
  static PropTypes = {
    channel: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequred,
    callback: PropTypes.func.isRequired
  };

  componentDidUpdate() {
    const box = document.getElementById('chatBox');
    box.scrollTop = box.scrollHeight;
  }

  render() {
    const messages = this.props.messages || [];
    const { channel, callback } = this.props;
    return (
      <div>
        <TitleBar topic={channel.topic} name={channel.name} />
        <div className={styles.chat} id="chatBox">
          {
            messages.map(item => {
              return (
                <ChatMessage
                  text={item.text}
                  user={item.user}
                  time={item.time}
                  kind={item.kind}
                  colour={item.colour}
                />
              );
            })
          }
        </div>
        <ChatBar callback={callback} />
      </div>
    );
  }
}

export default ChatBox;
