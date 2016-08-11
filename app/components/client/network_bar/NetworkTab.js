import React, { Component, PropTypes } from 'react';
import ChannelTab from './ChannelTab.js';
import styles from './NetworkTab.css';

class NetworkTab extends Component {
  static propTypes = {
    host: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    port: PropTypes.number.isRequired,
    ssl: PropTypes.bool.isRequired,
    channels: PropTypes.array.isRequired,
    show: PropTypes.bool.isRequired,
    fold: PropTypes.func.isRequired,
    expand: PropTypes.func.isRequired
  };

  render() {
    const { host, port, channels, name, show, fold, expand } = this.props;
    const network_id = `${host}:${port}`;

    return (
      <div className={styles.network}>
        <span className={styles.network_text}>
          {name}
        </span>
        {
          show ?
            <a className={styles.network_icon} onClick={() => fold(network_id)}>
              <i className="material-icons md-18">keyboard_arrow_up</i>
            </a>
          :
            <a className={styles.network_icon} onClick={() => expand(network_id)}>
              <i className="material-icons md-18">keyboard_arrow_down</i>
            </a>
        }
        <ul className={styles.channel_list}>
          {
            show && channels.map(item => {
              if (item) {
                return (
                  <ChannelTab key={item.name} selected={item.selected} counter={item.counter} name={item.name} type={item.type} network_id={network_id} callback={item.callback} close_callback={item.close_callback} />
                );
              }
            })
          }
        </ul>
      </div>
    );
  }
}

export default NetworkTab;
