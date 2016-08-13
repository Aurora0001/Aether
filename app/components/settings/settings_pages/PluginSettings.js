import React, { Component, PropTypes } from 'react';
import PluginSettingsItem from './PluginSettingsItem.js';
import sidebar_styles from '../../Sidebar.css';
import styles from './Page.css';

class NetworkSettings extends Component {
  static propTypes = {
    pluginList: PropTypes.array.isRequired,
    pluginSettings: PropTypes.object.isRequired,
    setPluginSettings: PropTypes.func.isRequired
  };

  render() {
    const { networks, pluginList, addNetwork, removeNetwork,
            pluginSettings, setPluginSettings } = this.props;
    return (
      <div>
        <div className={sidebar_styles.panel_header}>
          <i className="material-icons md-24">extension</i> Plugins
        </div>
        <div className={styles.settings_body}>
          {
            pluginList.map(item => {
              return (
                <PluginSettingsItem
                  pluginSettings={pluginSettings[item.uuid]}
                  setPluginSettings={setPluginSettings}
                  plugin={item}
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
