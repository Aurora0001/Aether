import React, { Component, PropTypes } from 'react';
import twemoji from 'twemoji';
const twemojiImages = require.context('file!../../static/72x72', true, /\.png$/);
import styles from './ChatBar.css';
import emojiList from './emoji_map.json';

class EmojiCategory extends Component {
  static PropTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    changeTab: PropTypes.func.isRequired,
    selectedTitle: PropTypes.string.isRequired
  };

  render() {
    return (
      <a
        title={this.props.title}
        onClick={() => this.props.changeTab(this.props.title)}
        className={
          this.props.title === this.props.selectedTitle ?
          styles.active :
          undefined
        }
      >
        <i className="material-icons">{this.props.icon}</i>
      </a>
    );
  }
}

export default EmojiCategory;
