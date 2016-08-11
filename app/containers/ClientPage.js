import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Client from '../components/Client';
import * as ClientActions from '../actions/client.js';
import * as UIActions from '../actions/ui.js';

function mapStateToProps(state) {
  return {
    feeds: state.feeds,
    users: state.users,
    channels: state.channels,
    networks: state.networks,
    current_channel: state.current_channel,
    network_states: state.network_states,
    counter: state.channel_counter
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...UIActions,
    ...ClientActions
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Client);
