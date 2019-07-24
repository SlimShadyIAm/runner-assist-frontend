import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import services from '../../../scripts/services';
import { actions } from '../../../store/user';

import '../../../style/LSideBar.css';
import bgImage from '../../../assets/image.jpg';
import pfpImage from '../../../assets/trimm.png';
import M from 'materialize-css';

class LSideBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    this.handleMenuToggle = this.handleMenuToggle.bind(this);
    this.toLogin = this.toLogin.bind(this);
  }

  componentDidMount() {
    const collapsibleElem = document.querySelector('.collapsible');
    M.Collapsible.init(collapsibleElem, {});
  }

  handleMenuToggle() {
    this.setState(state => ({ open: !state.open }));
  }

  async toLogin(ev) {
    ev.stopPropagation();
    ev.preventDefault();
    const { logoutUser } = this.props;
    await services.Logout();
    try {
      // TODO: create logout api method
      // const ret = await this.props.services.logout();
      // if (!ret) throw ({ message: 'logout failed' });

      sessionStorage.clear();
      services.userToken = null;
      await logoutUser();
      sessionStorage.clear();

      process.nextTick(() => {
        window.location.replace('/app/login');
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { user } = this.props;
    return (
      <header>
        <ul id="slide-out-left" className="sidenav sidenav-left">
          <li className="sidenav-user-view">
            <div className="user-view">
              <div className="background">
                <img src={bgImage} alt="background" />
              </div>
              <div><img className="circle" src={pfpImage} alt="circle" /></div>
              <div><span className="white-text name"><b>{user.name}</b></span></div>
              <div>
                <span className="white-text email">
                {user.email}
                </span>
              </div>
            </div>
          </li>
          <li>
            <Link onClick={this.toLogin} to="/login">
              <i className="material-icons">exit_to_app</i>
Log out
            </Link>
          </li>
          <li>
            <ul className="collapsible collapsible-accordion">
              <li className="no-padding">
                <span className="collapsible-header">
Settings
                  <i className="material-icons">arrow_drop_down</i>
                </span>
                <div className="collapsible-body">
                  <ul>
                    <li><Link to="settings">Account settings</Link></li>
                    <li><Link to="settings#metrics">User Metrics</Link></li>
                    <li><Link to="settings#shoes">Shoe settings</Link></li>
                  </ul>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </header>
    );
  }
}
LSideBar.propTypes = {
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logoutUser: () => dispatch(actions.logout()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LSideBar);
