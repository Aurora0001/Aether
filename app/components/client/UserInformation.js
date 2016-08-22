import React, { Component, PropTypes } from 'react';
import styles from './UserInformation.css';

class UserInformation extends Component {
  static PropTypes = {
    username: PropTypes.string.isRequired,
    client: PropTypes.object.isRequired
  };

  render() {
    const { username, whoisData, className } = this.props;
    const userWhoisData = whoisData[username];
    return (
      <span className={className}>
        <span className={styles.username}>
          {username}
        </span>
        {
          userWhoisData ?
          (
            <div className={styles.tooltip}>
              <div>
                <div>{`${userWhoisData.nick}!${userWhoisData.user}@${userWhoisData.host}`}</div>
                <div>Real Name: {userWhoisData.realname}</div>
                <div>Server: {userWhoisData.server}</div>
              </div>
            </div>
          ) :
          null
        }

      </span>
    );
  }
}

export default UserInformation;
