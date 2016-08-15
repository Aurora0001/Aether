import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import pageStyles from './Page.css';
import styles from './NetworkSettingsItem.css';

class NetworkSettingsItem extends Component {
  static propTypes = {
    name: PropTypes.string,
    host: PropTypes.string,
    port: PropTypes.number,
    ssl: PropTypes.bool,
    nick: PropTypes.string,
    ident: PropTypes.string,
    real: PropTypes.string,
    password: PropTypes.string,
    sasl: PropTypes.bool,
    invalid: PropTypes.bool,
    channels: PropTypes.array,
    addNetwork: PropTypes.func.isRequired,
    removeNetwork: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      hidden: this.props.password === null,
      selected: this.props.password === null ? 'none' : this.props.sasl ? 'sasl'
        : 'pass'
    };
  }

  onSubmit = (event) => {
    const pass = event.target.auth.value === 'none' ? null : event.target.password.value;
    this.props.removeNetwork(this.props.host, this.props.port);
    this.props.addNetwork(event.target.name.value,
                          event.target.host.value,
                          parseInt(event.target.port.value, 10),
                          event.target.ssl.checked,
                          event.target.nick.value,
                          event.target.ident.value,
                          event.target.real.value,
                          pass,
                          event.target.auth.value === 'sasl',
                          event.target.invalid.checked,
                          event.target.channels.value.split(',')
                        );
    event.preventDefault();
  };

  onRemove = (event) => {
    this.props.removeNetwork(this.props.host, this.props.port);
    event.preventDefault();
  };

  onSelectAuth = (event) => {
    this.setState({
      selected: event.target.value,
      hidden: event.target.value === 'none'
    })
  };

  render() {
    const { name, host, port, ssl, nick, ident, real, password, addNetwork,
            removeNetwork, invalid } = this.props;
    const default_channels = this.props.default_channels || [];
    return (
      <form onSubmit={this.onSubmit} className={styles.form_root}>
        <h3 className={pageStyles.divider}>{name || 'New Server'}</h3>
        <h4>Server</h4>
        <div className={styles.form_item}>
          <label htmlFor="name">Network Name</label>
          <input
            type="text"
            defaultValue={name}
            required
            name="name"
            placeholder="ExampleNet"
          />
        </div>
        <div className={styles.form_item}>
          <label htmlFor="host">Hostname</label>
          <input
            type="text"
            defaultValue={host}
            required
            name="host"
            placeholder="irc.example.com"
          />
        </div>
        <div className={styles.form_item}>
          <label htmlFor="port">Port</label>
          <input
            type="number"
            defaultValue={port}
            required
            name="port"
            placeholder="6667"
          />
        </div>
        <div className={styles.form_item}>
          <label htmlFor="ssl">SSL/TLS</label>
          <input type="checkbox" defaultChecked={ssl} name="ssl" />
        </div>
        <div className={styles.form_item}>
          <label htmlFor="invalid">Allow Invalid Certificates</label>
          <input type="checkbox" defaultChecked={invalid} name="invalid" />
        </div>
        <h4>Your Account</h4>
        <div className={styles.form_item}>
          <label htmlFor="nick">Nickname</label>
          <input
            type="text"
            placeholder="IRCUser"
            defaultValue={nick}
            required
            pattern="[A-Za-z`\[\]\\_^{|}][A-Za-z0-9-`[\]\\_^{|}]+"
            name="nick"
          />
        </div>
        <div className={styles.form_item}>
          <label htmlFor="ident">Username</label>
          <input
            type="text"
            placeholder="ircuser"
            defaultValue={ident}
            required
            name="ident"
          />
        </div>
        <div className={styles.form_item}>
          <label htmlFor="real">Real Name</label>
          <input
            type="text"
            placeholder="IRC User"
            defaultValue={real}
            required
            name="real"
          />
        </div>
        <div className={styles.form_item}>
          <label htmlFor="auth">Authentication</label>
          <select name="auth" onChange={this.onSelectAuth} value={this.state.selected}>
            <option value="none">None</option>
            <option value="pass">Server Password</option>
            <option value="sasl">SASL</option>
          </select>
        </div>
        <div className={`${styles.form_item} ${this.state.hidden?styles.hidden:undefined}`}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            defaultValue={password}
            name="password"
          />
        </div>
        <div className={styles.form_item}>
          <label htmlFor="channels">Channels</label>
          <input
            type="text"
            placeholder="#test,#test2"
            defaultValue={default_channels.join(',')}
            name="channels"
          />
        </div>
        <input type="submit" />
        <button className={styles.danger} onClick={this.onRemove}>
          Delete
        </button>
      </form>
    );
  }
}

export default NetworkSettingsItem;
