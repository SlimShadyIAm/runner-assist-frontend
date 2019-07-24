import React, { Component } from 'react';
import PropTypes from 'prop-types';
import omnivore from '@mapbox/leaflet-omnivore';
import L from 'leaflet';

import SaveRun from '../SaveRun';

import '../../../../style/Map.css';

const DEFAULT_VIEWPORT = {
  center: [52.2391, 6.8506],
  zoom: 13,
};

class Route extends Component {
  constructor(props) {
    super(props);

    this.state = {
      viewport: DEFAULT_VIEWPORT,
    };

    this.renderMap = this.renderMap.bind(this);
  }

  componentDidMount() {
    this.renderMap();
  }

  renderMap() {
    const { bounds, gpx } = this.props;

    const center = [(bounds.latMax + bounds.latMin) / 2, (bounds.lonMax + bounds.lonMin) / 2];
    const c1 = L.latLng(bounds.latMax, bounds.lonMax);
    const c2 = L.latLng(bounds.latMin, bounds.lonMin);
    const bound = L.latLng(c1, c2);

    const map = L.map('run-map').setView(center, 14);

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
    return (
      <div className="col s12">
        {/* <SaveRun /> */}
        <div className="card card-today z-depth-2">
          <div className="card-content white-text">
            <div className="row">
              <div className="col s12">
                <p className="card-title">
Your route
                  {/* <a href="#save" className="btn btn-large right modal-trigger btn-save">Save this route</a> */}
                </p>
              </div>
              <div className="col s12">
                <div className="map-container">
                  <div id="run-map" className="run-map" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Route.propTypes = {
  // Declare props here:
  bounds: PropTypes.object.isRequired,
  gpx: PropTypes.string.isRequired,
};

export default Route;
