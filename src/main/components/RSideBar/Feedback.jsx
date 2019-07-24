import React, { Component } from 'react';
import M from 'materialize-css';
import PropTypes from 'prop-types';

class Feedback extends Component {
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
    console.log('Done!');
  }

  render() {
    // Add any props here:
    const { title, body } = this.props;
    const { someData } = this.state;
    return (
      <div className="card">
        <div className="card-content white-text card-alert blue-grey darken-1">
          <span className="card-title">{title}</span>

          <p>{body}</p>
        </div>
      </div>
    );
  }
}
Feedback.propTypes = {
  // Declare props here:
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

export default Feedback;
