import React, { Component, PropTypes } from 'react';
import styles from './ChatMessage.css';

class ChatMessage extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    kind: PropTypes.string.isRequired,
    colour: PropTypes.string.isRequired
  };

  render() {
    const { text, user, time, kind, colour } = this.props;
    return (
      <span className={`${styles.message} ${styles[kind]}`}>
        <span
          className={styles.avatar}
          style={{
            backgroundColor: colour
          }}
        >
          {user[0].toUpperCase()}
        </span>
        <abbr className={styles.time}>{time}</abbr>
        <div className={styles.main}>
          <span className={styles.username}>{user}</span>
          <span
            className={styles.content}
            dangerouslySetInnerHTML={{
              __html: text
            }}
          />
        </div>
      </span>
    );
  }
}

export default ChatMessage;
