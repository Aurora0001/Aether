import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './ChannelTab.css';

class ChannelTab extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired,
    close_callback: PropTypes.func.isRequired,
    counter: PropTypes.number.isRequired,
    selected: PropTypes.bool.isRequired
  };

  render() {
    const { name, type, callback, close_callback, counter,
            selected } = this.props;
    return (
      <li className={`${styles.item} ${selected?styles.selected:null} ${styles[type]}`}>
        <a onClick={callback} className={styles.channel_name}>
          <span className={styles.icon} />
          {name}
          {
            counter !== -1
            ? <span className={styles.counter}>{counter}</span>
            : null
          }
        </a>
        <a onClick={close_callback} className={styles.button} title="Close Channel">
          <i className="material-icons md-18">close</i>
        </a>
      </li>
    );
  }
}

export default ChannelTab;
