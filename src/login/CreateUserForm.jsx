import React, { Component } from 'react';
import moment from 'moment';
import M from 'materialize-css';

class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      next: false,
      email: '',
      username: '',
      age: '',
      gender: '',
      weight: '',
      height: '',
      password: '',
      passConfirm: '',
    };

    this.toMenu = this.toMenu.bind(this);
    this.showNext = this.showNext.bind(this);
    this.disableNext = this.disableNext.bind(this);
    this.handelChange = this.handelChange.bind(this);
    this.disableCreate = this.disableCreate.bind(this);
    this.createAccount = this.createAccount.bind(this);
    this.checkName = this.checkName.bind(this);
    this.checkEmail = this.checkEmail.bind(this);
    this.checkPass = this.checkPass.bind(this);
    this.checkAge = this.checkAge.bind(this);
    this.checkHeight = this.checkHeight.bind(this);
    this.checkWeight = this.checkWeight.bind(this);
  }

  toMenu(event) {
    this.props.showMenu('menu');
  }

  disableNext() {
    const {
      username, password, passConfirm, email, 
    } = this.state;
    if (!this.checkPass()) {
      return true;
    }

    return (!this.checkName() || !password || !passConfirm || !this.checkEmail());
  }

  showNext(event) {
    event.stopPropagation();
    event.preventDefault();
    const {
      username, password, passConfirm, email, checkPass, checkEmail, checkName
    } = this.state;
    if (password !== passConfirm) {
      this.setState({ password: '', passConfirm: '' });
      return;
    } if (!this.checkPass() || !this.checkEmail() || !this.checkName()) return;
    this.setState({ next: true });
  }

  disableCreate() {
    const { gender } = this.state;
    return (!gender || !this.checkAge() || !this.checkWeight() || !this.checkHeight());
  }

  checkName() {
    const { username } = this.state;
    var regex = /^[a-zA-Z][a-zA-Z\s]*$/;
    return regex.test(username)
  }

  checkEmail() {
    const { email } = this.state;
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }

  checkPass() {
    const {password, passConfirm } = this.state;
    var regex = /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    return regex.test(password) && password === passConfirm;
  }

  checkAge() {
    const { age } = this.state;
    return moment().diff(age, 'years') > 13 && moment().diff(age, 'years') < 130;
  }

  checkHeight() {
    const { height } = this.state;
    return height <= 3 && height > 0; 
  }

  checkWeight() {
    const { weight } = this.state;
    return weight <= 640 && weight > 0; 
  }

  createAccount(event) {
    event.stopPropagation();
    event.preventDefault();

    const {
      username, password, email, gender, age, weight, height,
    } = this.state;
    if (!username || !password || !email || !gender || !age || !weight || !height) return;
    this.props.onCreate({
      username, password, email, gender, age, weight, height,
    });
  }

  handelChange(event) {
    const ret = {};
    ret[event.target.name] = event.target.value;
    this.setState(ret);
  }

  componentDidMount() {
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems, {});
  }

  render() {
    const pageOne = (
      <form className="login-form">
        <div className="input-field col s12">
          <input name="username" id="username" type="text" className={this.checkName() ? "valid" : "invalid"} placeholder="Full Name" required value={this.state.username} onChange={this.handelChange} />
          <span className="helper-text" data-error="Only alphabetical characters :(" data-success=":)!"></span>
        </div>
        <div className="input-field col s12">
          <input name="email" id="email" type="email" className={this.checkEmail() ? "valid" : "invalid"} placeholder="E-mail" required value={this.state.email} onChange={this.handelChange} />
          <span className="helper-text" data-error="Please enter a valid email! :(" data-success=":)!"></span>
        </div>
        <div className="input-field col s12">
          <input name="password" id="password" type="password" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" className="validate tooltipped" data-position="bottom" data-tooltip="8-30 characters, with at least one uppercase, number and special character!" placeholder="Password" required value={this.state.password} onChange={this.handelChange} />
          <span className="helper-text" data-error="Make sure you follow the guidelines!" data-success=":)!"></span>
        </div>
        <div className="input-field col s12">
          <input name="passConfirm" id="password-confirm" type="password" className={this.checkPass() ? "valid" : "invalid"} placeholder="Confirm Password" required value={this.state.passConfirm} onChange={this.handelChange} />
          { this.checkPass ? <span className="helper-text" data-error="Passwords don't match!"></span> : <span className="helper-text" data-success=":)!"></span> }     
        </div>
        <div className="row">
          <div className="col s12 m6">
            <button className="btn btn-large btn-login" onClick={this.toMenu}>Back to Menu</button>
          </div>
          <div className="col s12 m6">
            <button  id="next-1" className="btn btn-large btn-login blue darken-2 margin" onClick={this.showNext} disabled={this.disableNext()}>Next</button>
          </div>
        </div>

      </form>
    );

    const pageTwo = (
      <form className="login-form">
        <div className="input-field col s12">
          <select name="gender" id="gender" className="browser-default" required value={this.state.gender} onChange={this.handelChange}>
            <option value="" disabled>Select best match gender</option>
            <option value={0}>Male</option>
            <option value={1}>Female</option>
          </select>
        </div>
        <div className="input-field col s12">
          <input name="height" id="height" type="number" className={this.checkHeight() ? "valid" : "invalid "} placeholder="Height (m)" required value={this.state.height} onChange={this.handelChange} />
          {this.state.checkHeight ? <span className="helper-text" data-success=":)!"></span> : <span className="helper-text" data-error="Enter a valid height!"></span>}
        
        </div>
        <div className="input-field col s12">
          <input name="weight" id="weight" type="number" className={this.checkWeight() ? "valid" : "invalid "} placeholder="Weight (kg)" required value={this.state.weight} onChange={this.handelChange} />
          {this.state.checkWeight ? <span className="helper-text" data-success=":)!"></span> : <span className="helper-text" data-error="Enter a valid weight!"></span>}
        </div>
        <div className="input-field col s12">
          <input name="age" id="age" type="date" className={this.checkAge() ? "valid" : "invalid "} placeholder="Birthdate" required value={this.state.age} onChange={this.handelChange} />
          {this.state.checkAge ? <span className="helper-text" data-success=":)!"></span> : <span className="helper-text" data-error="You must be 13 or older (and born in a reasonable year)!"></span>}
        </div>
        <div className="row">
          <div className="col s12 m6">
            <button className="btn btn-large btn-login blue darken-2" onClick={this.toMenu}>Back to Menu</button>
          </div>
          <div className="col s12 m6 ">
            <button id="next-2" className="btn btn-large btn-login margin" onClick={this.createAccount} disabled={this.disableCreate()}>Submit</button>
          </div>
        </div>
      </form>
    );

    const { next } = this.state;
    const formDisplay = next ? pageTwo : pageOne;
    return (
      <div className="login-menu-outer z-depth-2">
        <div className="row">
          <h4 className="login-subheader">Create User Form</h4>
          {formDisplay}
        </div>
      </div>
    );
  }
}

export default CreateUser;
