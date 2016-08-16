import React, { Component, PropTypes } from 'react';
import twemoji from 'twemoji';
import EmojiCategory from './EmojiCategory.js';
const twemojiImages = require.context('file!../../static/72x72', true, /\.png$/);
import styles from './ChatBar.css';
import emojiList from './emoji_map.json';

class EmojiSelector extends Component {
  static PropTypes = {
    insertEmoji: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      emoji: this.filterEmoji('All'),
      category: 'All',
      filterString: ''
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.hidden !== this.props.hidden ||
           nextState.category !== this.state.category ||
           nextState.filterString !== this.state.filterString;
  }

  filterEmoji(category) {
    let elems = [];
    for (let item of emojiList) {
      if (category === 'All' || item.category === category) {
        const emojiCode = item.unicode;
        const emojiImg = twemoji.parse(emojiCode, (icon, options) => {
          return twemojiImages('./' + icon + '.png');
        });
        elems.push(
          <li
            onClick={() => this.props.insertEmoji(item.unicode)}
            className={styles.emoji_item}
            key={item.unicode}
            dangerouslySetInnerHTML={{
              __html: emojiImg
            }}
          />
        );
      }
    }
    return elems;
  }

  filterEmojiByName(name) {
    let elems = [];
    for (let item of emojiList) {
      if ((this.state.category === 'All' ||
           item.category === this.state.category) &&
           item.name.indexOf(name) !== -1) {
        const emojiCode = item.unicode;
        const emojiImg = twemoji.parse(emojiCode, (icon, options) => {
          return twemojiImages('./' + icon + '.png');
        });
        elems.push(
          <li
            onClick={() => this.props.insertEmoji(item.unicode)}
            className={styles.emoji_item}
            key={item.unicode}
            dangerouslySetInnerHTML={{
              __html: emojiImg
            }}
          />
        );
      }
    }
    return elems;
  }

  changeTab(category) {
    this.setState({
      emoji: this.filterEmoji(category),
      category,
      filterString: ''
    });
  }

  onInput(event) {
    const elems = this.filterEmojiByName(event.target.value.toLowerCase());
    this.setState({
      emoji: elems,
      filterString: event.target.value.toLowerCase()
    })
  }

  render() {
    return (
      <div
        className={`${styles.emoji_list} ${this.props.hidden?styles.hidden:null}`}
      >
        <div className={styles.emoji_header}>
          <EmojiCategory title="All" changeTab={this.changeTab.bind(this)} icon="group_work" selectedTitle={this.state.category} />
          <EmojiCategory title="Symbols" changeTab={this.changeTab.bind(this)} icon="translate" selectedTitle={this.state.category} />
          <EmojiCategory title="People" changeTab={this.changeTab.bind(this)} icon="face" selectedTitle={this.state.category} />
          <EmojiCategory title="Nature" changeTab={this.changeTab.bind(this)} icon="nature" selectedTitle={this.state.category} />
          <EmojiCategory title="Food" changeTab={this.changeTab.bind(this)} icon="restaurant_menu" selectedTitle={this.state.category} />
          <EmojiCategory title="Activity" changeTab={this.changeTab.bind(this)} icon="directions_walk" selectedTitle={this.state.category} />
          <EmojiCategory title="Travel" changeTab={this.changeTab.bind(this)} icon="directions_car" selectedTitle={this.state.category} />
          <EmojiCategory title="Objects" changeTab={this.changeTab.bind(this)} icon="card_giftcard" selectedTitle={this.state.category} />
          <EmojiCategory title="Flags" changeTab={this.changeTab.bind(this)} icon="flag" selectedTitle={this.state.category} />
          <input onChange={this.onInput.bind(this)} value={this.state.filterString} className={styles.search} type="text" placeholder="Search" />
        </div>
        <ul>
          {
            this.state.emoji
          }
        </ul>
      </div>
    );
  }
}

export default EmojiSelector;
