import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './UserItem.css';

class UserItem extends Component {
  static PropTypes = {
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired
  };

  render() {
    const {name, role} = this.props;
    return (
      <li className={styles.user}>
        <a href="">
          <span className={styles.avatar}><img /></span>
          {name}
          <span className={`${styles.role} ${styles[role]}`} />
        </a>
      </li>
    );
  }
}

export default UserItem;
