import React, { Component, PropTypes } from 'react';
import NetworkSettings from './settings_pages/NetworkSettings.js';
import styles from './SettingsContainer.css';

class SettingsContainer extends Component {
  static propTypes = {
    networks: PropTypes.array.isRequired,
    add_network: PropTypes.func.isRequired,
    remove_network: PropTypes.func.isRequired
  };

  render() {
    const { networks, add_network, remove_network } = this.props;
    return (
      <div className={styles.container}>
        <NetworkSettings
          networks={networks}
          addNetwork={add_network}
          removeNetwork={remove_network}
        />
      </div>
    );
  }
}

export default SettingsContainer;
