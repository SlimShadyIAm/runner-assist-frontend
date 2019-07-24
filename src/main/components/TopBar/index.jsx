import React, { Component } from 'react';
import PropTypes from 'prop-types';
import M from 'materialize-css';

class TopBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    const elems = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(elems, {});
  }

  render() {
    const { navHome, location } = this.props;
    return (
      <div className="intro-thicc">
        <a href="#menu" data-target="slide-out-left" className="sidenav-trigger tooltipped" data-position="bottom" data-tooltip="Go home">
          <i
            className="material-icons"
          >
menu
          </i>
        </a>
        <p className="intro-thicc-title clickable" onClick={navHome}>
          {'// Runner Assist'}

          <br className="hide-on-large-only" />
          <i className="intro-thicc-subtitle">
            {` - ${location}`}
          </i>
        </p>
        <div className="right-align">
          <a
            href="#sidebar"
            className="btn right-align btn-large btn-floating  btn-notif sidenav-trigger"
            data-target="slide-out-right"
            name="Add run"
          >
            <i className="material-icons">add_circle_outline</i>
          </a>
          <a
            href="#sidebar"
            className="btn right-align btn-large btn-floating pulse btn-notif sidenav-trigger"
            data-target="slide-out-right"
          >
            <i className="material-icons">notifications</i>
          </a>
        </div>
      </div>
    );
  }
}
TopBar.propTypes = {
  navHome: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired,
};

export default TopBar;
