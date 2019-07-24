import React, { Component } from 'react';

import '../style/Main.css';

import LSideBar from './components/LSideBar';
import RSideBar from './components/RSideBar';
import Data from './components/Data';
import Dashboard from './components/Dashboard';
import TopBar from './components/TopBar';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: 'dashboard',
    };

    this.handleNav = this.handleNav.bind(this);
    this.home = this.home.bind(this);
  }

  handleNav(dest) {
    this.setState({ show: dest });
  }

  home() {
    this.setState({ show: 'dashboard' });
  }

  render() {
    const { show } = this.state;
    let content;
    if (show === 'dashboard') {
      content = (
        <Dashboard
          history={this.props.history}
          handleNav={this.handleNav}
        />
      );
    } else if (show === 'data') {
      content = <Data />;
    }
    return (
      <div className="main">
        <LSideBar history={this.props.history} services={this.props.services} />
        <div className="main-view">
          <TopBar navHome={this.home} location={this.state.show} />
          {content}
        </div>
        <RSideBar />
      </div>
    );
  }
}

export default Main;
