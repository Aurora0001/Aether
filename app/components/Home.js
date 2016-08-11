import React, { Component } from 'react';
import { Link } from 'react-router';
import styles from './Home.css';


export default class Home extends Component {
  componentWillReceiveProps(next) {
      if (next.networks.length > 0) {
        this.props.navigateApp();
      }
  }

  render() {
    return (
      <div>
        <div className={styles.container}>
          <h2>Welcome!</h2>
          <p>
            Before you can connect, you need to set up a network to join.
            You'll need to pick a nickname and input the server details to
            continue.
          </p>
          <Link to="/settings">Settings &raquo;</Link>
        </div>
      </div>
    );
  }
}
