import { connect } from 'react-redux';
import Login from '../../login';

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: data => dispatch({ type: 'user/login', payload: data }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
