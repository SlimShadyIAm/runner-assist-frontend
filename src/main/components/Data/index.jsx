import React, { Component } from 'react';
import M from 'materialize-css';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import services from '../../../scripts/services';
import { actions } from '../../../store/run';

import Details from './Details';
import Route from './Cards/Route';
import Rating from './Cards/Rating';
import AddInfo from './Cards/AddInfo';


class Data extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gpxData: {},
      runData: {},
      loading: true,
    };
    this.loadDetails = this.loadDetails.bind(this);
    this.loadGpx = this.loadGpx.bind(this);
  }

  componentDidMount() {
    M.AutoInit();
    M.updateTextFields();
    this.loadGpx();
    this.loadDetails();
  }

  async loadDetails() {
    const { currentRun } = this.props;
    try {
      const runDat = await services.GetRunDetailed({ query: { run_id: currentRun } });
      this.setState({ runData: runDat });
    } catch (err) {
      console.log(err);
    }
  }

  async loadGpx() {
    this.setState({ loading: true });
    const { currentRun } = this.props;
    try {
      const gpxData = await services.RunGps({ query: { run_id: currentRun } });
      this.setState({ gpxData });
    } catch (err) {
      console.err(err);
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { runData, gpxData, loading } = this.state;
    const mapView = {
      lonMax: gpxData.longMax,
      lonMin: gpxData.longMin,
      latMax: gpxData.latMax,
      latMin: gpxData.latMin,
    };

    const loader = (
      <div className="centered-box">
        <div className="progress inner ra-linear-loader-inner">
          <div className="indeterminate ra-linear-loader-background" />
        </div>
      </div>
    );
    const runDetails = runData && runData.data ? <Details runDetails={runData} /> : <div />;
    const content = loading ? loader : (
      <div className="row">
        <Route gpx={gpxData.gpx} bounds={mapView} />
        { runDetails }
      </div>
    );

    const { currentRun } = this.props;
    return (
      <main>
        <div className="main-body">
          <div className="container">
            <div className="row">
              <div className="col s12 m3">
                <div className="row">
                  <div className="col s12">
                    <Rating runNo={currentRun} />
                  </div>
                  <div className="col s12">
                    <AddInfo />
                  </div>

                </div>
              </div>
              <div className="col s12 m9">
                {content}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
Data.propTypes = {
  runDetails: PropTypes.object.isRequired,
  currentRun: PropTypes.number.isRequired,
  setGpxData: PropTypes.func.isRequired,
  setRunData: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    runDetails: state.run,
    currentRun: state.currentRun,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setGpxData: gpx => dispatch(actions.setGpx(gpx)),
    setRunData: dat => dispatch(actions.setRunData(dat)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Data);
