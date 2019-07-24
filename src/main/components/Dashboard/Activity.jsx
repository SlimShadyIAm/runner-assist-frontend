import React, { Component } from 'react';
import M from 'materialize-css';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import services from '../../../scripts/services';

import ActivityModal from './ActivityModal';

class Activity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gpxData: {
        gpx: '',
        lonMax: 0,
        lonMin: 0,
        latMax: 0,
        latMin: 0,
      },
    };
    this.loadGpxData = this.loadGpxData.bind(this);
  }

  componentDidMount() {
    M.AutoInit();
  }

  async loadGpxData() {
    const { run } = this.props;
    // const ret = await services.RunGps({ query: { runId: run.id } });
    const ret = await services.RunGps({ query: { run_id: run.id } });
    this.setState({ gpxData: ret });
  }

  render() {
    const { handleNav, run, index } = this.props;
    const { gpxData, showModal } = this.state;
    const mapView = {
      lonMax: gpxData.longMax,
      lonMin: gpxData.longMin,
      latMax: gpxData.latMax,
      latMin: gpxData.latMin,
    };
    const modal = run !== null
      ? (<ActivityModal index={index} handleNav={handleNav} run={run} gpx={gpxData.gpx} view={mapView} />)
      : <div />;
    return (
      <div>
        {modal}
        <div className="card blue-grey darken-1 card-activity z-depth-2" onClick={this.loadGpxData}>
          <a href={`#modal${index}`} className="modal-trigger">
            <div className="card-content white-text">
              <div className="row">
                <div className="col s12">
                  <span className="card-title card-activity-highlight">
                    {run.title}
                  </span>
                  <span className="card-activity-date">{run.date}</span>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    );
  }
}
Activity.propTypes = {
  handleNav: PropTypes.func.isRequired,
  run: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default Activity;
