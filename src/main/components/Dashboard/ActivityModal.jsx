import React, { Component } from 'react';
import PropTypes from 'prop-types';
import omnivore from '@mapbox/leaflet-omnivore';
import L from 'leaflet';

import { connect } from 'react-redux';
import { actions } from '../../../store/currentRun';


import '../../../style/Map.css';

const DEFAULT_VIEWPORT = {
  center: [52.2391, 6.8506],
  zoom: 13,
};

class ActivityModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: DEFAULT_VIEWPORT,
    };
    this.nav = this.nav.bind(this);
    this.onClickReset = this.onClickReset.bind(this);
    this.renderMap = this.renderMap.bind(this);
  }

  componentDidUpdate(oldProps, oldState) {
    if (!oldProps.gpx && this.props.gpx) {
      this.renderMap();
    }
  }

  onClickReset() {
    this.setState({ viewport: DEFAULT_VIEWPORT });
  }

  async nav() {
    const { handleNav, run, setCurrentRun } = this.props;
    await setCurrentRun(run.id ? run.id : 0);
    handleNav('data');
  }

  renderMap() {
    const { view, index, gpx } = this.props;
    const { viewport } = this.state;
    const center = [(view.latMax + view.latMin) / 2, (view.lonMax + view.lonMin) / 2];
    const c1 = L.latLng(view.latMax, view.lonMax);
    const c2 = L.latLng(view.latMin, view.lonMin);
    const bound = L.latLng(c1, c2);

    const map = L.map(`run-map-${index}`).setView(center, 13);

    // map.fitBounds(bound);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const customLayer = L.geoJson(null, {
    // http://leafletjs.com/reference.html#geojson-style
      style(feature) {
        return { color: '#f00' };
      },
    });
    const xmlGpx = omnivore.gpx.parse(`<?xml version='1.0' encoding='UTF-8'?>${gpx}`, null, customLayer).addTo(map);
  }

  render() {
    const {
      run, index, gpx,
    } = this.props;
    const { viewport } = this.state;
    return (
      <div id={`modal${index}`} className="modal modal-overview modal-fixed-footer">
        <div className="modal-content">
          <h4 className="modal-title">
            {`Your run overview from ${run.date}`}
          </h4>
          <div className="row">
            <div className="col s12 m12 l12">
              <div className="modal-map-container">
                <div id={`run-map-${index}`} className="modal-run-map" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col s12 m6">
              <div className="card blue-grey darken-1">
                <div className="card-content white-text center-align">
                  <span className="card-title">Duration</span>
                  <p>{run.time}</p>
                </div>
              </div>
            </div>
            <div className="col s12 m6">
              <div className="card blue-grey darken-1">
                <div className="card-content white-text center-align">
                  <span className="card-title">Distance</span>
                  <p>{run.distance}</p>
                </div>
              </div>
            </div>
            <div className="col s12 m6">
              <div className="card blue-grey darken-1">
                <div className="card-content white-text center-align">
                  <span className="card-title">Avg. Pace</span>
                  <p>{run.pace}</p>
                </div>
              </div>
            </div>
            <div className="col s12 m6">
              <div className="card blue-grey darken-1">
                <div className="card-content white-text center-align">
                  <span className="card-title">Avg. Speed</span>
                  <p>{run.speed}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <a className="modal-close waves-effect waves-green btn-flat" onClick={this.nav}>Detailed overview</a>
        </div>
      </div>

    );
  }
}
ActivityModal.propTypes = {
  handleNav: PropTypes.func.isRequired,
  run: PropTypes.object.isRequired,
  gpx: PropTypes.string.isRequired,
  setCurrentRun: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  view: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCurrentRun: id => dispatch(actions.setCurrentRun({ id })),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ActivityModal);
