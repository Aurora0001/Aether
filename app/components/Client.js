import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';
import styles from './Client.css';
import sidebarStyles from './Sidebar.css';
import NetworkTab from './client/network_bar/NetworkTab.js';
import ChatBox from './client/ChatBox.js';
import UserBar from './client/user_bar/UserBar.js';

class Client extends Component {
  static propTypes = {
    networks: PropTypes.array.isRequired,
  };

  componentWillMount() {
    this.props.networks.forEach(network => {
      this.props.create_network_tab(`${network.host}:${network.port}`);
      this.props.connect(network.host, network.port, network.ssl, network.nick, network.ident, network.real, network.default_channels);
    });
  }

  render() {
    const { networks, network_states, feeds, users, channels, current_channel,
            change_current_channel, send_part_channel, fold_network_tab,
            expand_network_tab, counter }
            = this.props;

    const sendCallback = (message, channel) => {
      if (message.startsWith('/me')) {
        this.props.send_action(channel.name, message.slice(4), channel.network_id);
      } else if (message.startsWith('/') && !message.startsWith('//')) {
        let parts = message.split(' ');
        this.props.send_raw(parts[0].slice(1), parts.slice(1), channel.network_id);
      } else {
        this.props.send_privmsg(channel.name, message, channel.network_id);
      }
    };

    return (
      <div className={styles.wrapper}>
        <div className={`${sidebarStyles.sidebar} ${sidebarStyles.left} ${sidebarStyles.side_panel}`}>
          <div className={sidebarStyles.panel_header}>
            <i className="material-icons md-24">device_hub</i> Networks
            <Link to="/settings" className={sidebarStyles.button} title="Settings">
              <i className="material-icons md-24">settings</i>
            </Link>
          </div>
          {
            networks.map(network => {
              const network_id = `${network.host}:${network.port}`;
              return (
                <NetworkTab
                  show={
                    network_states[network_id] == null
                    ? true
                    : network_states[network_id]
                  }
                  fold={fold_network_tab}
                  expand={expand_network_tab}
                  key={network_id}
                  host={network.host}
                  name={network.name}
                  port={network.port}
                  ssl={network.ssl}
                  channels={
                    Object.keys(channels).map(id => {
                      if (channels[id].network_id === network_id) {
                        return {
                          type: channels[id].type,
                          name: channels[id].name,
                          id,
                          callback: () => {
                            change_current_channel(channels[id].network_id, channels[id].name);
                          },
                          close_callback: () => {
                            send_part_channel(channels[id].name, channels[id].network_id);
                          },
                          counter: counter[`${channels[id].network_id}:${channels[id].name}`] || -1,
                          selected: current_channel === `${channels[id].network_id}:${channels[id].name}`
                        };
                      }
                      return null;
                    })
                  }
                />
              );
            })
          }
        </div>
        <div className={styles.main}>
          <ChatBox
            messages={
              (feeds[current_channel] || []).map(x => {
                return {
                  user: x.nick,
                  text: x.text,
                  time: moment(x.time).format('LT'),
                  colour: x.colour,
                  kind: x.kind
                };
              })
            }
            channel={
              channels[current_channel] || {
                topic: null,
                name: 'Connecting...'
              }
            }
            callback={
              (message) => {
                const channel = channels[current_channel];
                sendCallback(message, channel);
              }
            }
          />
        </div>
        <UserBar users={users[current_channel]} />
      </div>
    );
  }
}

export default Client;
