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
    expand: PropTypes.func.isRequired,
    joinChannel: PropTypes.func.isRequired
  };

  render() {
    const { host, port, channels, name, show, fold, expand } = this.props;
    const networkId = `${host}:${port}`;

    return (
      <div className={styles.network}>
        <span className={styles.network_text}>
          {name}
        </span>
        {
          show ?
            <a className={styles.network_icon} onClick={() => fold(networkId)}>
              <i className="material-icons md-18">keyboard_arrow_up</i>
            </a>
          :
            <a className={styles.network_icon} onClick={() => expand(networkId)}>
              <i className="material-icons md-18">keyboard_arrow_down</i>
            </a>
        }
        <ul className={styles.channel_list}>
          {
            show && channels.sort((a, b) => {
              if (a.name[0] === '#' && b.name[0] !== '#') {
                return -1;
              } else if (a.name[0] !== '#' && b.name[0] === '#') {
                return 1;
              } else {
                return a.name > b.name ? 1 : -1;
              }
            }).map(item => {
              if (item) {
                return (
                  <ChannelTab
                    key={item.name}
                    {...item}
                  />
                );
              }
            })
          }
          {
            show ?
              <ChannelTab
                selected={false}
                counter={-1}
                name="Join Channel"
                type="special"
                callback={() => 0}
                close_callback={() => 0}
              />
            : null
          }
        </ul>
      </div>
    );
  }
}

export default NetworkTab;
