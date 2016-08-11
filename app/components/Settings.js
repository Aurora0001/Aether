import React, { Component } from 'react';
import { Link } from 'react-router';
import SettingsBar from './settings/SettingsBar.js';
import SettingsContainer from './settings/SettingsContainer.js';
import styles from './Settings.css';


export default class Settings extends Component {
  render() {
    return (
      <div className={styles.main}>
        <SettingsBar />
        <SettingsContainer {...this.props} />
      </div>
    );
  }
}
