import React, { Component, PropTypes } from 'react';
import { pluginMiddleware } from '../../store/pluginMiddleware.js';
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
      expanded: false,
      href: props.href
    };
  }

  toggleExpanded = (event) => {
    let href = this.state.href;
    if (!this.state.expanded) {
      href = pluginMiddleware(null)((action) => action)({
        type: 'WILL_OPEN_LINK',
        href
      }).href;
    }


    this.setState({
      expanded: !this.state.expanded,
      href
    });
  };

  render() {
    const { key, children } = this.props;
    const { expanded, href } = this.state;
    return (
      <span key={key}>
        <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
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
