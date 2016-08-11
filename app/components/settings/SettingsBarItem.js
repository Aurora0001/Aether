import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './SettingsBarItem.css';

class SettingsBarItem extends Component {
  static propTypes = {

  };

  render() {
    return (
      <a className={styles.item}>
        <span className={styles.item_text}>
          Networks
        </span>
      </a>
    );
  }
}

export default SettingsBarItem;
