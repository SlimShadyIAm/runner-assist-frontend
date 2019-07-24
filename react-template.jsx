import React, { Component } from 'react';
import M from 'materialize-css';
import PropTypes from 'prop-types';

class Template extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // State data
      someData: '',
    };

    // Bind functions:
    this.func = this.func.bind(this);
  }

  componentDidMount() {
    M.AutoInit();
    // Code to run on component creation:
  }

  // functions go here:
  func() {
    const { propName } = this.props;
    this.setState({ someData: propName });
  }

  render() {
    // Add any props here: const { propName } = this.props;
    const { someData } = this.state;
    return (
    // Add code here
      <div>
        <p>{ someData }</p>
        <button type="button" onClick={this.func}>Click Me!</button>
      </div>
    );
  }
}
Template.propTypes = {
  // Declare props here:
  propName: PropTypes.string.isRequired,
};

export default Template;
