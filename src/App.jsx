import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import services, { init, generateJWT } from './scripts/services';
import store from './store';
import { actions } from './store/user';

import './style/materialize.min.css';
import './style/App.css';

import Login from './login';
import Main from './main';
import Settings from './main/components/Settings';

init();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      loading: false,
    };
    this.validateUser = this.validateUser.bind(this);
  }

  async componentWillMount() {
    try {
      if (this.state.isAuthenticated) return;
      await this.validateUser();
    } catch (err) {
      console.error(err);
    }
  }

  async validateUser() {
    if (this.state.isAuthenticated) return;
    if (this.state.loading) return;
    this.setState({ loading: true });
    if (store.getState().user && store.getState().user.token) {
      sessionStorage.setItem('user', JSON.stringify(store.getState().user));
      await this.setState({ isAuthenticated: true });
    } else {
      const localUser = JSON.parse(sessionStorage.getItem('user'));
      if (localUser && localUser.token) {
        await this.setState({ isAuthenticated: true });
        store.dispatch(actions.login({ user: { ...localUser } }));
      }
    }
    this.setState({ loading: false });
  }

  render() {
    const { isAuthenticated, loading } = this.state;
    if (loading) {
      return (
        <div className="centered-box full">
          <div className="progress inner ra-linear-loader-inner">
            <div className="indeterminate ra-linear-loader-background" />
          </div>
        </div>
      );
    }
    return (
      <Provider store={store}>
        <div className="App">
          <Switch>
            <Route path="/login" render={props => <Login {...props} onLogin={this.validateUser} auth={isAuthenticated} />} />
            <Route
              exact
              path="/"
              render={props => (isAuthenticated ? (
                <Main {...props} services={services} />
              ) : <Redirect to="/login" />)}
            />
            <Route
              path="/settings"
              render={props => (isAuthenticated ? (
                <Settings {...props} services={services} />
              ) : <Redirect to="/login" />)}
            />
          </Switch>
        </div>
      </Provider>
    );
  }
}

export default App;
