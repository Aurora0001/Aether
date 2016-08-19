import React, { Component, PropTypes } from 'react';
import TitleBar from './TitleBar.js';
import ChatMessage from './ChatMessage.js';
import ChatBar from './ChatBar.js';
import SearchBar from './SearchBar.js';
import styles from './ChatBox.css';

// 1MB
const MAX_FILE_SIZE = 1024000;

class ChatBox extends Component {
  static PropTypes = {
    channel: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequred,
    users: PropTypes.array.isRequred,
    callback: PropTypes.func.isRequired,
    dropCallback: PropTypes.func.isRequired,
    dropProgress: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      dragClass: ''
    };
  }

  dragHover = (event) => {
  	event.stopPropagation();
  	event.preventDefault();
    this.setState({
      dragClass: event.type === 'dragover' ? 'hover' : ''
    });
  };

  dragDrop = (event) => {
    event.stopPropagation();
    event.preventDefault();
    this.setState({
      dragClass: ''
    });
    const files = event.target.files || event.dataTransfer.files;
    for (let file of files) {
      if (file.size < MAX_FILE_SIZE) {
        const reader = new FileReader();
      	reader.onload = (e) => {
          this.props.dropCallback(file.type, file, reader.result);
        }
        reader.onerror = (e) => {
          console.log(e);
        };
      	reader.readAsText(file);
      } else {
        console.log(`${file.name} too large (${file.size} bytes)`);
      }
    }
  };

  componentDidUpdate() {
    const box = document.getElementById('chatBox');
    box.scrollTop = box.scrollHeight;
  }

  render() {
    const messages = this.props.messages || [];
    const { channel, users, callback, searching } = this.props;
    return (
      <div>
        <TitleBar topic={channel.topic} name={channel.name} />
        <div
          className={`${styles.chat} ${styles[this.state.dragClass]}`}
          id="chatBox"
          onDragOver={this.dragHover}
          onDragLeave={this.dragHover}
          onDrop={this.dragDrop}
        >
          {
            messages.map(item => {
              if (this.props.searchText === '') {
                return (
                  <ChatMessage
                    {...item}
                  />
                );
              } else if (item.text.toLowerCase().indexOf(this.props.searchText) !== -1){
                return (
                  <ChatMessage
                    {...item}
                  />
                );
              }
            })
          }
        </div>
        <div className={`${styles.drop_icon} ${styles[this.state.dragClass]}`}>
          <i className="material-icons">cloud_upload</i>
          <p>Upload File to Channel</p>
        </div>
        {
          searching ?
            <SearchBar
              searchText={this.props.searchText}
              searchCallback={this.props.searchCallback}
            /> :
            <ChatBar
              dropProgress={this.props.dropProgress}
              callback={callback}
              users={users}
            />
        }
      </div>
    );
  }
}

export default ChatBox;
