import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import M from 'materialize-css';

import Account from './Account';
import Shoes from './Shoes';
import User from './User';
import '../../../style/Settings.css';

class Settings extends Component {
  componentDidMount() {
    const elem = document.querySelectorAll('.tabs');
    const instance = M.Tabs.init(elem, {});
    const modal = document.querySelectorAll('.modal');
    const minstances = M.Modal.init(modal, {});
  }

  constructor(props) {
    super(props);

    this.state = {
      view: 'default',
    };
    this.handleShow = this.handleShow.bind(this);
  }

  handleShow(nav) {
    if (nav === 'default' || nav === 'account' || nav === 'shoes' || nav === 'user') {
      this.setState({ view: nav });
    }
  }

  render() {
    return (
      <div className="body">
        <nav className="nav-extended">
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo center">// Runner assist</Link>
          </div>
          <div className="nav-content">
            <ul className="tabs tabs-transparent">
              <li className="tab"><Link className="active" to="#account">Accounts</Link></li>
              <li className="tab"><Link className="active" to="#metrics">Your metrics</Link></li>
              <li className="tab"><Link className="active" to="#shoes">Shoes<span class="badge">Pro</span></Link></li>
              <li className="tab-home"><Link to="/">Back to dashboard</Link></li>
            </ul>
          </div>
        </nav>
        <div id="account" className="col s12">
          <div className="container form-container">
            <Account showView={this.handleShow} />
          </div>
        </div>
        <div id="metrics" className="col s12">
          <div className="container form-container">
            <User onLogin={this.handleLogin} />
          </div>
        </div>
        <div id="shoes" className="col s12">
          <div className="container form-container">
            <Shoes showMenu={this.handleShow} />
          </div>
        </div>
      </div>


    );
  }
}

Settings.propTypes = {
};
/*
function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
*/
export default Settings;
