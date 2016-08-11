import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Settings from '../components/Settings';
import * as UIActions from '../actions/ui.js';

function mapStateToProps(state) {
  return {
    networks: state.networks
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...UIActions
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
