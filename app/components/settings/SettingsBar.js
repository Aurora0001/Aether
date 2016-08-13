import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import SettingsBarItem from './SettingsBarItem.js';
import styles from './SettingsBar.css';
import sidebar_styles from '../Sidebar.css';

class SettingsBar extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className={`${sidebar_styles.sidebar} ${styles.sidebar}`}>
        <div className={sidebar_styles.panel_header}>
          <Link className={`${sidebar_styles.button} ${styles.left}`} to="/">
            <i className="material-icons md-24">keyboard_backspace</i>
          </Link>
          <i className="material-icons md-24">settings</i> Settings
        </div>
        <SettingsBarItem name="Networks" path="/settings/networks" />
        <SettingsBarItem name="Plugins" path="/settings/plugins" />
      </div>
    );
  }
}

export default SettingsBar;
