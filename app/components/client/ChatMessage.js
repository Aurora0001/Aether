import React, { Component, PropTypes } from 'react';
import moment from 'moment';
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
    const { text, user, time, kind, colour, safe } = this.props;
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
        <abbr className={styles.time} title={time}>{moment(time).format('LT')}</abbr>
        <div className={styles.main}>
          <span className={styles.username}>{user}</span>
          {
            safe ? <span
              className={styles.content}
              dangerouslySetInnerHTML={{
                __html: text
              }}
            /> :
            <span className={styles.content}>{text}</span>
          }
        </div>
      </span>
    );
  }
}

export default ChatMessage;
