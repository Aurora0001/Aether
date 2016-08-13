import React, { Component, PropTypes } from 'react';
import NetworkSettings from './settings_pages/NetworkSettings.js';
import styles from './SettingsContainer.css';

class SettingsContainer extends Component {
  static propTypes = {
    networks: PropTypes.array.isRequired,
    add_network: PropTypes.func.isRequired,
    remove_network: PropTypes.func.isRequired,
    pluginList: PropTypes.array.isRequired,
    pluginSettings: PropTypes.object.isRequired,
    setPluginSettings: PropTypes.func.isRequired
  };

  render() {
    const { networks, add_network, remove_network, pluginList,
            children, pluginSettings, setPluginSettings } = this.props;
    return (
      <div className={styles.container}>
        {
          React.cloneElement(children, {
            networks,
            addNetwork: add_network,
            removeNetwork: remove_network,
            pluginList,
            pluginSettings,
            setPluginSettings
          })
        }
      </div>
    );
  }
}

export default SettingsContainer;
