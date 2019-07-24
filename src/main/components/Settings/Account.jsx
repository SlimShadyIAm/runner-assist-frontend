import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import M from 'materialize-css';
import services from '../../../scripts/services';
import { actions } from '../../../store/user';
import store from '../../../store';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disableSave: '',
      name: '',
      age: '',
      email: '',
      oldPassword: '',
      newPassword: '',
      newPassword2: '',
      typeid: '',
      newPassOk: false,

    };
    this.togglePremium = this.togglePremium.bind(this);
    this.disableSave = this.disableSave.bind(this);
    this.disableSavePassword = this.disableSavePassword.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkName = this.checkName.bind(this);
    this.checkAge = this.checkAge.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.checkPasswords = this.checkPasswords.bind(this);
    this.setUser = this.setUser.bind(this);
    this.setUserPassword = this.setUser.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    const { user } = this.props;
    this.setState({
      typeid: user.typeid, name: user.name, email: user.email, age: user.age, newPassOk: false,
    });
    M.updateTextFields();
    const tooltips = document.querySelectorAll('.tooltipped');
    const tinstances = M.Tooltip.init(tooltips, {});
  }

  disableSave() {
    return !this.checkName() || !this.checkAge() || !this.checkEmail();
  }

  disableSavePassword() {
    return !this.checkPasswords();
  }

  handleChange(event) {
    const ret = {};
    ret[event.target.name] = event.target.value;
    this.setState(ret);
  }

  checkName() {
    const { name } = this.state;
    const regex = /^[a-zA-Z][a-zA-Z\s]*$/;
    return regex.test(name);
  }

  checkEmail() {
    const { email } = this.state;
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }

  checkAge() {
    const { age } = this.state;
    return moment().diff(age, 'years') > 13 && moment().diff(age, 'years') < 130;
  }

  checkPasswords() {
    const {
      oldPassword, newPassword, newPassword2, newPassOk,
    } = this.state;
    const regex = /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

    if (oldPassword !== '' && oldPassword !== newPassword && newPassword !== '' && newPassword === newPassword2 && regex.test(newPassword)) {
      if (!newPassOk) {
        this.setState({ newPassOk: true });
      }
      return true;
    }
    if (newPassOk) {
      this.setState({ newPassOk: false });
    }
    return false;
  }

  togglePremium(event) {
    const { typeid } = this.state;
    if (event.target.name == 1) {
      this.setState({ typeid: 2 });
    } else {
      this.setState({ typeid: 1 });
    }
  }

  async setUser() {
    const {
      age, typeid, name, email, oldPassword, newPassOk, newPassword,
    } = this.state;
    let ret;
    if (newPassOk) {
      ret = {
        oldPassword, newPassword, age, typeid, username: name, email,
      };
    } else {
      ret = {
        age, username: name, email, typeid,
      };
    }
    try {
      await services.SetUserData({body: ret });
      const localUser = JSON.parse(sessionStorage.getItem('user'))
      Object.keys(ret).forEach((key) => {
        (localUser[key] = ret[key]);
      });
      localUser["name"] = this.state.name;
      localUser["username"] = this.state.name;
      sessionStorage.setItem('user', JSON.stringify(localUser));
      store.dispatch(actions.updateUser(localUser));
    } catch(e) {
      console.log(e)
    }
  }

  async delete() {
    const { logoutUser, history } = this.props;
    try {
      await services.DelAccount();
      await services.Logout();
    } catch(e) {
      console.log(e)
    } finally {
      sessionStorage.clear();
      services.userToken = null;
      await logoutUser();
      sessionStorage.clear();

      process.nextTick(() => {
        window.location.replace('/app/login');
      });
    }
  }

  async setUserPassword() {
    const { newPassword, oldPassword, newPassOk } = this.state;
    let ret;
    if (newPassOk) {
      ret = { oldPassword, newPassword };
      try {
        await services.SetUserData({ body: ret });
      } catch (e) {
        console.log(e);
      }
    }
  }

  render() {
    const { user } = this.props;
    function unhideName(e) {
      e.preventDefault();
      document.getElementById('name-preview').classList.add('hide');
      document.getElementById('name-input').classList.remove('hide');
    }

    function unhideDob(e) {
      e.preventDefault();
      document.getElementById('dob-preview').classList.add('hide');
      document.getElementById('dob-input').classList.remove('hide');
    }

    function unhideEmail(e) {
      e.preventDefault();
      document.getElementById('email-preview').classList.add('hide');
      document.getElementById('email-input').classList.remove('hide');
    }

    function unhidePass(e) {
      e.preventDefault();
      document.getElementById('pass-preview').classList.add('hide');
      document.getElementById('pass-input-old').classList.remove('hide');
      document.getElementById('pass-input-new').classList.remove('hide');
      document.getElementById('pass-input-new-conf').classList.remove('hide');
    }
    const { typeid } = this.state;
    return (
      <div className="account">
         <div id="delete" className="modal">
          <div className="modal-content">
            <h4>Delete your account</h4>
            <p>This action is permament and will delete all personally indentifiable information from our databases. You can't go back after this.</p>
            <p><strong>If you're using the email@email.email user, please DON'T delete the user. This is the only user with data assigned to it. Proceed at your own risk!</strong></p>
          </div>
          <div class="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat modal-close">Cancel</button>
            <button className="modal-close waves-effect waves-red btn-flat modal-close" onClick={this.delete}>Confirm</button>
          </div>
        </div>
              
        <div className="row">
          <div className="col s12 m8 push-m2">
            <h5>Account information</h5>
            <div className="row setting-row">
              <div className="col s4 center"><span className="setting-title">Name</span></div>
              <div className="col s8">
                <span id="name-preview" className="setting-body tooltipped" data-position="bottom" data-tooltip="Click to edit!" onClick={unhideName}>{user.name}</span>
                <div className="input-field hide" id="name-input">
                  <input value={this.state.name} name="name" id="name" type="text" className={this.checkName() ? 'valid' : 'invalid'} onChange={this.handleChange} />
                  <label htmlFor="name">Name</label>
                </div>
              </div>
            </div>
            <hr />
            <div className="row setting-row">
              <div className="col s4 center"><span className="setting-title">Date of birth</span></div>
              <div className="col s8">
                <span id="dob-preview" className="setting-body tooltipped" data-position="bottom" data-tooltip="Click to edit!" onClick={unhideDob}>{user.age}</span>
                <div className="input-field hide" id="dob-input">
                  <input value={this.state.age} id="dob" type="date" className={this.checkAge() ? 'valid' : 'invalid'} name="age" onChange={this.handleChange} />
                  <label htmlFor="dob">Date of Birth</label>
                </div>
              </div>
            </div>
            <hr />
            <div className="row setting-row">
              <div className="col s4 center"><span className="setting-title">E-mail</span></div>
              <div className="col s8">
                <span id="email-preview" className="setting-body tooltipped" data-position="bottom" data-tooltip="Click to edit!" onClick={unhideEmail}>{user.email}</span>
                <div className="input-field hide" id="email-input">
                  <input name="email" value={this.state.email} id="email" type="text" className={this.checkEmail() ? 'valid' : 'invalid'} onChange={this.handleChange} />
                  <label htmlFor="email">E-mail</label>
                </div>
              </div>
            </div>
            <hr />
            <div className="row setting-row">
              <div className="col s4 center"><span className="setting-title">Password</span></div>
              <div className="col s8">
                <span id="pass-preview" className="setting-body tooltipped" data-position="bottom" data-tooltip="Click to edit!" onClick={unhidePass}>***</span>
                <div className="input-field hide" id="pass-input-old">
                  <input placeholder="***" value={this.state.oldPassword} name="oldPassword" id="oldpass" type="password" className={this.checkPasswords() ? 'valid' : 'invalid'} onChange={this.handleChange} />
                  <label htmlFor="oldpass">Current Password</label>
                </div>
                <div className="input-field hide" id="pass-input-new">
                  <input id="pass" type="password" name="newPassword" value={this.state.newPassword} className={this.checkPasswords() ? 'valid' : 'invalid'} onChange={this.handleChange} />
                  <label htmlFor="pass">New Password</label>
                </div>
                <div className="input-field hide" id="pass-input-new-conf">
                  <input id="pass-conf" type="password" name="newPassword2" value={this.state.newPassword2} className={this.checkPasswords() ? 'valid' : 'invalid'} onChange={this.handleChange} />
                  <label htmlFor="pass-conf">Confirm New Password</label>
                  <button className="btn btn-large green save-btn" onClick={this.setUserPassword} disabled={this.disableSavePassword()}>SAVE</button>
                </div>
              </div>
            </div>

            <h5>Membership information</h5>
            <div className="row setting-row">
              <div className="col s4 center"><span className="setting-title">Premium status</span></div>
              <div className="col s8">
                <span className="setting-body">{typeid == 1 ? "You're a free user! Sign up for Pro today!" : "You're a Pro user!"}</span>
              </div>
            </div>
            <hr />
            <div className="row setting-row">
              <div className="col s4 center"><span className="setting-title">Manage subscription</span></div>
              <div className="col s8"><span className="setting-body">{typeid == 2 ? <button className="btn red lighten-1" name="2" onClick={this.togglePremium}>Cancel Pro</button> : <button className="btn green lighten-1" name="1" onClick={this.togglePremium}>Subscribe to Pro</button> }</span></div>
            </div>
          </div>
        </div>
        <button className="btn btn-large green save-btn" onClick={this.setUser} disabled={this.disableSave()}>SAVE</button>
        <div className="row">
          <div className="col s12 m8 push-m2">
          <hr />
            <h5 className="center-align">Delete your account</h5>
             <div className="center-align">
             <button className="btn btn-large red save-btn modal-trigger" data-target="delete">DELETE</button>
             </div>
            </div>
        </div>
        
      </div>
    );
  }
}

Account.propTypes = {
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateUser: payload => dispatch(actions.updateUser(payload)),
    logoutUser: () => dispatch(actions.logout()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Account);
