import React, { Component, PropTypes } from 'react';
import styles from './TitleBar.css';

class TitleBar extends Component {
  static PropTypes = {
    name: PropTypes.string.isRequred,
    topic: PropTypes.string
  };

  render() {
    const { name, topic } = this.props;
    return (
      <div className={styles.toolbar}>
        <div
          className={`${styles.tool_item} ${styles.channel_name}`}
        >
          {name}
        </div>
        <div
          className={`${styles.tool_item} ${styles.channel_topic}`}
        >
          {topic || 'No topic set.'}
        </div>
        <div className="clear" />
      </div>
    );
  }
}

export default TitleBar;
