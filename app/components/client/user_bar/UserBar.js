import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import UserItem from './UserItem.js';
import sidebarStyles from '../../Sidebar.css';
import styles from './UserBar.css';

class UserBar extends Component {
  static PropTypes = {
    users: PropTypes.array.isRequired,
    joinChannel: PropTypes.func.isRequired
  };

  render() {
    let users = this.props.users || [];
    const user_ranks = {
      owner: 5,
      admin: 4,
      op: 3,
      halfop: 2,
      voice: 1,
      '': 0
    };
    users = users.sort((a, b) => {
      if (user_ranks[a.role] < user_ranks[b.role]) {
        return 1;
      } else if (user_ranks[a.role] === user_ranks[b.role]) {
        return a.name > b.name ? 1 : -1;
      }
      return -1;
    });

    return (
      <div className={`${sidebarStyles.sidebar} ${users.length===0?sidebarStyles.hidden:undefined} ${sidebarStyles.right}`}>
        <span className={sidebarStyles.panel_header}>
            <i className="material-icons">people</i>
            Users <span className={styles.count}>{users.length}</span>
        </span>
        <div>
          <ul>
              {
                users.map(item => {
                  return (
                    <UserItem
                      key={item.name}
                      name={item.name}
                      role={item.role}
                      joinPrivmsg={() => this.props.joinChannel(item.name)}
                    />
                  );
                })
              }
          </ul>
        </div>
      </div>
    );
  }
}

export default UserBar;
