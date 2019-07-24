import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import services from '../../../scripts/services';
import { actions } from '../../../store/user';
import store from '../../../store';
import M from 'materialize-css';

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'weight': '',
      'height': ''
    }

    this.checkWeight = this.checkWeight.bind(this);
    this.checkHeight = this.checkHeight.bind(this);
    this.disableSave = this.disableSave.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  componentDidMount() {
    const { user } = this.props;
    this.setState({weight: user.weight, height: user.height})
    M.updateTextFields();
    const tooltips = document.querySelectorAll('.tooltipped');
    const tinstances = M.Tooltip.init(tooltips, {});
  }

  checkWeight() {
    const { weight } = this.state;
    return weight > 0 && weight < 640;
  }
  
  checkHeight() {
    const { height } = this.state;
    return height > 0 && height <= 3 ;
  }

  handleChange(event) {
    const ret = {};
    ret[event.target.name] = event.target.value;
    this.setState(ret);
  }

  disableSave() {
    return !this.checkHeight() || !this.checkWeight();
  }

  
  async setUser() {
    const { weight, height } = this.state;
    try {

      const ret = { weight: weight, height: height };
      await services.SetUserData({body: ret });
      const localUser = JSON.parse(sessionStorage.getItem('user'))
      Object.keys(ret).forEach((key) => {
        (localUser[key] = ret[key]);
      });
      sessionStorage.setItem('user', JSON.stringify(localUser));
      store.dispatch(actions.updateUser(localUser));
    } catch(e) {
      console.log(e)
    }
}


  render() {
    function unhideWeight(e) {
      e.preventDefault();
      document.getElementById('weight-preview').classList.add('hide');
      document.getElementById('weight-input').classList.remove('hide');
    }
    function unhideHeight(e) {
      e.preventDefault();
      document.getElementById('height-preview').classList.add('hide');
      document.getElementById('height-input').classList.remove('hide');
    }
    const { user } = this.props;
    return (
      <div className="user">
        <div className="row">
          <div className="col s8 push-s2">
            <h5>User metrics</h5>
            {/* <div className="row setting-row">
              <div className="col s4 center"><span className="setting-title">Weight</span></div>
              <div className="col s8">
                <span className="setting-body">
                  {`${user.weight} kg`}
                </span>
              </div>
            </div> */}
            <div className="row setting-row">
              <div className="col s4 center"><span className="setting-title">Weight (kg)</span></div>
              <div className="col s8">
                <span id="weight-preview" className="setting-body tooltipped" data-position="bottom" data-tooltip="Click to edit!" onClick={unhideWeight}>{user.weight}</span>
                <div className="input-field hide" id="weight-input">
                  <input value={this.state.weight} name="weight" id="weight" type="number" className={this.checkWeight() ? "valid" : "invalid"} onChange={this.handleChange} />
                  <label htmlFor="weight">Weight</label>
                </div>
              </div>
            </div>
            <hr />
            {/* <div className="row setting-row">
              <div className="col s4 center"><span className="setting-title">Height</span></div>
              <div className="col s8"><span className="setting-body">{`${user.height} m`}</span></div>
            </div> */}
            <div className="row setting-row">
              <div className="col s4 center"><span className="setting-title">Height (m)</span></div>
              <div className="col s8">
                <span id="height-preview" className="setting-body tooltipped" data-position="bottom" data-tooltip="Click to edit!" onClick={unhideHeight}>{user.height}</span>
                <div className="input-field hide" id="height-input">
                  <input value={this.state.height} name="height" id="height" type="number" className={this.checkHeight() ? "valid" : "invalid"} onChange={this.handleChange} />
                  <label htmlFor="height">Height</label>
                </div>
              </div>
            </div>
            <hr />
          </div>
        </div>
        <button className="btn btn-large green save-btn" onClick={this.setUser} disabled={this.disableSave()}>SAVE</button>
      </div>
    );
  }
}

User.propTypes = {
  user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateUser: payload => dispatch(actions.updateUser(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
