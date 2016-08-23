import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './UserItem.css';

class UserItem extends Component {
  static PropTypes = {
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    joinPrivmsg: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      hidden: true
    };
  }

  render() {
    const { name, role, joinPrivmsg, sendWhois } = this.props;
    return (
      <div>
        <li className={styles.user}>
          <a onClick={() => this.setState({hidden: !this.state.hidden})}>
            <span className={styles.avatar}><img /></span>
            {name}
            <span className={`${styles.role} ${styles[role]}`} />
          </a>
        </li>
        <span className={`${this.state.hidden ? styles['hidden'] : ''} ${styles.user_opts}`}>
          <a onClick={joinPrivmsg}>
            PM
          </a>
          <a onClick={sendWhois}>
            Whois
          </a>
          <a>
            Kick
          </a>
        </span>
      </div>
    );
  }
}

export default UserItem;
