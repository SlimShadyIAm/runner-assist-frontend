import React, { Component } from 'react';
import M from 'materialize-css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import Alert from './Alert';
import Feedback from './Feedback';
import services from '../../../scripts/services';

class RSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alerts: [],
      feedback: [],
      files: {
        gpxFile: null,
        csvFile: null,
      },
    };

    this.updateFile = this.updateFile.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.getAdvice = this.getAdvice.bind(this);
  }

  componentDidMount() {
    const elems = document.querySelectorAll('.sidenav-right');
    M.Sidenav.init(elems, {
      edge: 'right',
      isFixed: true,
    });
    this.getAdvice();
  }

  componentDidUpdate() {
    const elems = document.querySelectorAll('.sidenav-right');
    M.Sidenav.init(elems, {
      edge: 'right',
      isFixed: true,
    });
  }

  updateFile(file) {
    this.setState({ files: { ...file } });
  }

  async getAdvice() {
    try {
      const advices = await services.Advice({ body: {} });
      if (advices == null) { advices = []; }
      this.setState({ alerts: advices.advices });
    } catch (e) {
      console.log(e);
    }
  }

  async uploadFile(ev) {
    ev.preventDefault();
    console.log('UP: ', ev);
    const { gpxFile, csvFile } = this.state;
    console.log('UP2: ', gpxFile);

    if (gpxFile && csvFile) return;
    await services.AddRun({ body: { gpx: gpxFile, csv: csvFile } });
  }

  render() {
    const { alerts, feedback, files } = this.state;
    const { user } = this.props;
    const alertList = alerts.map(item => (
      <Alert
        key={item.id}
        title={`Your ${item.distance}km run on ${moment(item.date, 'YYYY-MM-DD hh:mm:ss ').format('dddd, D MMMM YYYY')}`}
        body={item.message}
      />
    ));
    const adviceList = feedback.map(item => (
      <Feedback
        key={item.id}
        title={`Your ${item.distance}km run on ${moment(item.date, 'YYYY-MM-DD hh:mm:ss ').format('dddd, D MMMM YYYY')}`}
        body={item.message}
      />
    ));
    return (
      <div className="RSideBar">
        <ul id="slide-out-right" className="sidenav sidenav-right">
          <li><Link className="sidenav-close" to="/"><i className="material-icons">close</i></Link></li>
          <div className="row">
            <div className="col s12 center-align">
              <div className="card card-feedback">
                <form>
                  <div className="card-content white-text">
                    <span className="card-title">Upload a file</span>
                    <div className="row">
                      <div className="file-field input-field">
                        <div className="btn">
                          <span>GPX file</span>
                          <input type="file" />
                        </div>
                        <div className="file-path-wrapper">
                          <input name="gpx-file" className="file-path validate" type="file" />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="file-field input-field">
                        <div className="btn">
                          <span>CSV file</span>
                          <input type="file" />
                        </div>
                        <div className="file-path-wrapper">
                          <input name="csv-file" className="file-path validate" type="file" />
                        </div>
                      </div>
                    </div>
                    <input type="submit" className="btn" onClick={this.uploadFile} value="Upload Run" />
                  </div>
                </form>
              </div>
            </div>
            <div className="col s12">
              {user.typeid == 1 ? (
                <div className="center-align">
                  <h5 className="center">Want curated advice to help you improve your run performance? Subscribe to premium today!</h5>
                  <button className="btn btn-large modal-trigger" data-target="premium-modal">Learn more</button>
                </div>
              ) : (
                adviceList
              )}
            </div>
            <div className="col s12">
              {user.typeid == 1 ? (
                <div className="">
                  <h5 className="center-align">Want curated advice to help you improve your run performance? Subscribe to premium today!</h5>
                  <button className="btn btn-large modal-trigger" data-target="premium-modal">Learn more</button>
                </div>
              ) : (
                alertList
              )}
            </div>
          </div>
        </ul>
      </div>
    );
  }
}

RSideBar.propTypes = {
  user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(RSideBar);
