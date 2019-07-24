import React, { Component } from 'react';

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      name: '',
      validInput: '',
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handlePassChange = this.handlePassChange.bind(this);
    this.handelNameChange = this.handelNameChange.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.validInput = this.validInput.bind(this);
  }

  handleLogin(event) {
    const { onLogin } = this.props;
    if (!this.state.password || !this.state.name) return;

    event.preventDefault();
    event.stopPropagation();

    onLogin(this.state);
  }

  handlePassChange(event) {
    this.setState({ password: event.target.value });
  }

  handelNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleBack(event) {
    this.props.showMenu('menu');
  }

  validInput() {
    const { password, name } = this.state;
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const nameTest = regex.test(name);
    return !!password && !!nameTest;
  }

  render() {
    return (
      <div className="login-menu-outer z-depth-2">
        <div className="row">
          <h4 className="login-subheader">Login</h4>
          <form className="login-form">
            <div className="input-field col s12">
              <input
                id="name"
                type="email"
                className="validate"
                required
                placeholder="E-mail Address"
                value={this.state.name}
                onChange={this.handelNameChange}
              />
              <span className="helper-text" data-error="Make sure you use a valid email! :(" data-success=":)!" />
            </div>
            <div className="input-field col s12">
              <input
                id="password"
                type="password"
                className="validate"
                required
                placeholder="Password"
                value={this.state.password}
                onChange={this.handlePassChange}
              />
              <span className="helper-text" data-error="Enter a password :(" data-success=":)!" />
            </div>
            <div className="row">
              <div className="col s12 m6">
                <button className="btn btn-large btn-login blue darken-2" type="button" onClick={this.handleBack}>Back to menu</button>
              </div>
              <div className="col s12 m6">
                <button
                  className="btn btn-large btn-login login-btn margin"
                  type="submit"
                  onClick={this.handleLogin}
                  disabled={!this.validInput()}
                >
Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
