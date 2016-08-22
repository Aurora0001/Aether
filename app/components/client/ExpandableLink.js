import React, { Component, PropTypes } from 'react';
import styles from './ExpandableLink.css';

class ExpandableLink extends Component {
  static PropTypes = {
    href: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    };
  }

  toggleExpanded = (event) => {
    this.setState({
      expanded: !this.state.expanded
    });
  };

  render() {
    const { href, key, children } = this.props;
    const { expanded } = this.state;
    return (
      <span key={key}>
        <a href={href}>{children}</a>
        <i
          className={`material-icons ${styles.drop_icon}`}
          onClick={this.toggleExpanded}
        >
          { expanded ? 'arrow_drop_up' : 'arrow_drop_down' }
        </i>
        {
          expanded ?
          <webview className={styles.link_view} src={href} />
          : null
        }
      </span>
    );
  }
}

export default ExpandableLink;
