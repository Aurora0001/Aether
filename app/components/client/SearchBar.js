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

  render() {
    return (
      <div className={styles.chat_bar}>
        <i className={`${styles.search_icon} material-icons`}>search</i>
        <input
          type="text"
          placeholder={"Search here, and press Escape when done."}
          onChange={this.inputChange}
          value={this.props.searchText}
          className={styles.search_box}
        />
      </div>
    );
  }
}

export default SearchBar;
