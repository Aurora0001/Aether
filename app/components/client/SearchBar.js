import React, { Component, PropTypes } from 'react';
import styles from './ChatBar.css';

class SearchBar extends Component {
  static PropTypes = {
    searchCallback: PropTypes.func.isRequired,
    searchText: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
  }

  inputChange = (event) => {
    this.props.searchCallback(event.target.value);
  }

  keyPress = (event) => {
    if (event.keyCode === 27) {
      this.props.endSearchCallback();
    }
  }

  focus = () => {
    this._input.focus();
  }

  render() {
    return (
      <div className={styles.chat_bar}>
        <i className={`${styles.search_icon} material-icons`}>search</i>
        <input
          type="text"
          placeholder={"Search here, and press Escape when done."}
          onChange={this.inputChange}
          onKeyDown={this.keyPress}
          value={this.props.searchText}
          className={styles.search_box}
          ref={ref => this._input = ref}
        />
      </div>
    );
  }
}

export default SearchBar;
