import React, { Component } from 'react';
import loginBanner from '../assets/image.jpg';

class LoginMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.toLogin = this.toLogin.bind(this);
    this.toCreate = this.toCreate.bind(this);
  }

  toLogin(event) {
    this.props.showView('login');
  }

  toCreate(event) {
    this.props.showView('create');
  }

  render() {
    return (
      <div>
        <div className="card login-card">
          <div className="card-image">
            <img src={loginBanner} alt="banner" />
            <span className="card-title">RUNNER ASSIST</span>
          </div>
          <div className="card-content">
            <div className="row">
              <div className="col s12">
                <button className="btn btn-large btn-login" onClick={this.toLogin}>Login</button>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <button className="btn btn-large btn-login" onClick={this.toCreate}>Create Account</button>
              </div>
            </div>
            <div className="row">
              <div className="col s12">
                <button className="btn btn-large btn-login" href="https://www.trimm.nl/en/cases/runner-assist">About</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginMenu;
