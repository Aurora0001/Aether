import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './SettingsBarItem.css';

class SettingsBarItem extends Component {
  static propTypes = {

  };

  render() {
    return (
      <Link to={this.props.path} className={styles.item}>
        <span className={styles.item_text}>
          {this.props.name}
        </span>
      </Link>
    );
  }
}

export default SettingsBarItem;
