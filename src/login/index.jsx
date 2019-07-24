import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import services from '../scripts/services';
import { validateToken } from '../scripts/security';
import { actions } from '../store/user';

import LoginMenu from './LoginMenu';
import LoginForm from './LoginForm';
import CreateUserForm from './CreateUserForm';

import '../style/Login.css';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
      view: 'menu',
      loading: false,
      invalidLogin: false,
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleAccountCreate = this.handleAccountCreate.bind(this);
  }

  componentDidMount() {
    // TODO: check if already logged in?  -- needs a validate function
    const localUser = JSON.parse(sessionStorage.getItem('user'));

    if (this.state.redirect) return this.props.history.push('/');
    if ((localUser && localUser.token)) {
      this.setState({ redirect: true });
    }
  }

  async handleLogin(loginData) {
    const { loading, login } = this.props;
    if (loading) return;
    this.setState({ loading: true });
    try {
      const res = await services.Login({
        body: { username: loginData.name, password: loginData.password },
      });
      if (res.statusCode > 200) throw (new Error(res.statusMessage));
      const userData = validateToken(res['user-token']);
      userData.token = res['session-token'];

      if (!userData) throw (new Error('invalid user data'));

      login(userData);
      const { user } = this.props;

      if (user.token) {
        sessionStorage.setItem('user', JSON.stringify(user));
        this.props.onLogin();
      } else {
        throw (new Error('no token!'));
      }


      this.setState({ loading: false });
    } catch (e) {
      /* handle error */
      console.error(e);
      this.setState({ invalidLogin: true });
      this.setState({ loading: false });
    }
  }

  async handleAccountCreate(userData) {
    const ret = await services.UserCreation({ body: { typeid: '1', ...userData } });

    if (ret) this.setState({ view: 'login' });
  }

  handleShow(nav) {
    if (nav === 'login' || nav === 'create' || nav === 'menu') {
      this.setState({ view: nav });
    }
  }

  render() {
    const {
      redirect, view, loading, invalidLogin,
    } = this.state;

    if (redirect) {
      return (<Redirect to="/" />);
    }

    let content;
    if (view === 'menu') {
      content = <LoginMenu showView={this.handleShow} />;
    } else if (view === 'login') {
      content = <LoginForm onLogin={this.handleLogin} showMenu={this.handleShow} />;
    } else if (view === 'create') {
      content = <CreateUserForm showMenu={this.handleShow} onCreate={this.handleAccountCreate} />;
    }

    if (loading) {
      return (
        <div className="centered-box full">
          <div className="progress inner ra-linear-loader-inner">
            <div className="indeterminate ra-linear-loader-background" />
          </div>
        </div>
      );
    }

    const error = invalidLogin ? (
      <div className="error-message">
        <b>Error: </b>
        {'invalid login credentials'}
      </div>
    ) : <div />;
    return (
      <div className="login-outer">
        <div className="login-inner">
          {error}
          {content}
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  auth: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: user => dispatch(actions.login({ user })),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
