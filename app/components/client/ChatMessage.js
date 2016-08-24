import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import Linkify from 'react-linkify';
import styles from './ChatMessage.css';
import ExpandableLink from './ExpandableLink.js';
import UserInformation from './UserInformation.js';
import { markup } from '../../store/markupMiddleware.js';

class ChatMessage extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    user: PropTypes.string.isRequired,
    kind: PropTypes.string.isRequired,
    colour: PropTypes.string.isRequired
  }; 

  render() {
    const { text, user, time, kind, colour, useHtml, whoisData } = this.props;
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
          <UserInformation
            whoisData={whoisData}
            username={user}
            className={styles.username}
          />
          {
            useHtml ? <span className={styles.content} dangerouslySetInnerHTML={{
              __html: text
            }} /> :
            <span className={styles.content}><Linkify component={ExpandableLink}>{markup(text)}</Linkify></span>
          }
        </div>
      </span>
    );
  }
}

export default ChatMessage;
