import React, { Component } from 'react';
import M from 'materialize-css';
import PropTypes from 'prop-types';

class SaveRun extends Component {
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
    // const { propName } = this.props;
    // this.setState({ someData: propName });
  }

  render() {
    // Add any props here: const { propName } = this.props;
    const { someData } = this.state;
    return (
      <div id="save" className="modal">
        <div className="modal-content">
          <h4>Save this run</h4>
          <div className="row">
            <form className="col s12">
              <div className="row">
                <div className="input-field col s8 push-s2">
                  <textarea id="textarea1" className="materialize-textarea" />
                  <label htmlFor="textarea1">Name this route</label>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-close waves-effect waves-green btn-flat">Cancel</a>
          <a href="#!" className="modal-close waves-effect waves-green btn-flat">Save</a>
        </div>
      </div>
    );
  }
}
SaveRun.propTypes = {
  // Declare props here:
  // propName: PropTypes.string.isRequired,
};

export default SaveRun;
