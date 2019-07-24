import React, { Component } from 'react';
import M from 'materialize-css';
import PropTypes from 'prop-types';

class AddInfo extends Component {
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
      <div className="card card-run-overview">
        <div className="card-content">
          <div className="row">
            <div className="col s12">
              <span className="card-title">Additional information</span>

            </div>
            <form className="col s12">
              <div className="row">
                <div className="input-field col s12">
                  <textarea id="sleepTime" className="materialize-textarea" disabled value="1 hour" />
                  <label htmlFor="sleepTime">Sleep time:</label>
                </div>
                <div className="input-field col s12">
                  <textarea id="restHeart" className="materialize-textarea" disabled value="0 bpm" />
                  <label htmlFor="restHeart">Resting heartrate:</label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
AddInfo.propTypes = {
  // Declare props here:
  // propName: PropTypes.string.isRequired,
};

export default AddInfo;
