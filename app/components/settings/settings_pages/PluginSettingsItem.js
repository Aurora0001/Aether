import React, { Component, PropTypes } from 'react';
import sidebar_styles from '../../Sidebar.css';
import styles from './PluginSettingsItem.css';

class NetworkSettings extends Component {
  static propTypes = {
    plugin: PropTypes.object.isRequired,
    pluginSettings: PropTypes.object.isRequired,
    setPluginSettings: PropTypes.func.isRequired
  };

  onSubmit = (fields) => (event) => {
    event.preventDefault();
    const newSettings = {};
    for (let field of fields) {
      newSettings[field] = event.target[field].value;
    }
    this.props.setPluginSettings(this.props.plugin.uuid, newSettings);
  };

  render() {
    const { plugin, pluginSettings } = this.props;
    return (
      <div>
        <h3 className={styles.name}>
          {plugin.name} (v{plugin.version.join('.')})
          <span className={styles.uuid}>{plugin.uuid}</span>
        </h3>
        <div className={styles.description}>{plugin.description}</div>
        <div className={styles.author}>{plugin.author}</div>
        <h4 className={styles.settings_header}>Settings for {plugin.name}</h4>
        <form
          onSubmit={this.onSubmit(plugin.settings.map(item => item.input.name))}
          className={styles.form_item}
        >
          {
            plugin.settings.map(item => {
              const defaultValue = item.generateDefault(pluginSettings);
              return (
                <div>
                  <label>{item.label.text}</label>
                  <input {...item.input} {...defaultValue} />
                </div>
              );
            })
          }
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default NetworkSettings;
