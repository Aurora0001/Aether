import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Home from '../components/Home';

function mapStateToProps(state) {
  return {
    networks: state.networks
  };
}

function mapDispatchToProps(dispatch) {
  return {
    navigateApp: () => dispatch(push('/client'))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
