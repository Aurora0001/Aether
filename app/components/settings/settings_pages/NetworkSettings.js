import React, { Component, PropTypes } from 'react';
import NetworkSettingsItem from './NetworkSettingsItem.js';
import sidebar_styles from '../../Sidebar.css';
import styles from './Page.css';

class NetworkSettings extends Component {
  static propTypes = {
    networks: PropTypes.array.isRequired,
    addNetwork: PropTypes.func.isRequired,
    removeNetwork: PropTypes.func.isRequired
  };

  render() {
    const { networks, addNetwork, removeNetwork } = this.props;
    return (
      <div>
        <div className={sidebar_styles.panel_header}>
          <i className="material-icons md-24">device_hub</i> Networks
        </div>
        <div className={styles.settings_body}>
          <button className={styles.add} onClick={() => addNetwork('New Network', '', 6667, false, '', '', '', null, false, false)}>Add New Network</button>
          {
            networks.map(item => {
              return (
                <NetworkSettingsItem
                  addNetwork={addNetwork}
                  removeNetwork={removeNetwork}
                  key={`${item.host}:${item.port}`}
                  {...item}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default NetworkSettings;
