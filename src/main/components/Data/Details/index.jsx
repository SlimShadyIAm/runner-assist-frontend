import React, { Component } from 'react';
import M from 'materialize-css';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { actions } from '../../../../store/runs';

import Detail from './Detail';

class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      charts: [
        {
          label: 'Axial Sacral Acceleration',
          name: 'axsacacc',
          icon: 'place',
          iconColor: 'blue-grey',
        },
        {
          label: 'Axial Tibial Acceleration',
          name: 'axtibacc',
          icon: 'place',
          iconColor: 'blue-grey',
        },
        {
          label: 'Tibial Impact',
          name: 'tibimpact',
          icon: 'place',
          iconColor: 'blue-grey',
        },
        {
          label: 'Tibial Initial Rotation',
          name: 'tibintrot',
          icon: 'place',
          iconColor: 'blue-grey',
        },
        {
          label: 'Sacral Impact',
          name: 'sacimpact',
          icon: 'place',
          iconColor: 'blue-grey',
        },
        {
          label: 'Breaking Force',
          name: 'brakingforce',
          icon: 'place',
          iconColor: 'blue-grey',
        },
        {
          label: 'Push off Power',
          name: 'pushoffpower',
          icon: 'place',
          iconColor: 'blue-grey',
        },
        {
          label: 'Verticle lower leg angle on moment of initial contact',
          name: 'vll',
          icon: 'place',
          iconColor: 'blue-grey',
        },
        {
          label: 'Initial Contact',
          name: 'ic',
          icon: 'place',
          iconColor: 'blue-grey',
        },
      ],
      options: {
        responsive: true,
        maintainAspectRatio: true,
      },
      show: {
        heartrate: true,
        speed: false,
        power: false,
        force: false,
        impact: false,
        gait: false,
      },
    };

    this.loadCharts = this.loadCharts.bind(this);
    this.toggleChart = this.toggleChart.bind(this);
  }

  componentWillMount() {
    M.updateTextFields();
    this.loadCharts();
  }

  componentDidMount() {
    M.AutoInit();
  }

  loadCharts() {
    const { charts } = this.state;
    const { runDetails } = this.props;

    const { data } = runDetails;
    charts.map((chart) => {
      let datSet;
      if (!data || !data[chart.name]) return;
      if (data[chart.name].right && data[chart.name].left && data[chart.name].left.length > 0) {
        datSet = [
          {
            label: chart.name,
            fillColor: 'rgba(255, 104, 27, .2)',
            strokeColor: 'rgba(255, 104, 27, 1)',
            pointRadius: 0,
            radius: 0,
            data: data[chart.name].right,
          }, {
            label: chart.name,
            strokeColor: 'rgba(7, 57, 109, 1)',
            pointRadius: 0,
            radius: 0,
            data: data[chart.name].left,
          },
        ];
      } else if (data[chart.name].right) {
        datSet = [
          {
            label: chart.name,
            fillColor: 'rgba(220,220,220,0.2)',
            strokeColor: 'rgba(220,220,220,1)',
            pointRadius: 0,
            radius: 0,
            data: data[chart.name].right,
          },
        ];
      }
      chart.data = {
        labels: data.times,
        datasets: datSet,
      };
      return chart;
    });
  }

  toggleChart(name) {
    const { show } = this.state;
    show[name] = !show[name];
    this.setState({ show });
  }

  render() {
    const { charts, show, options } = this.state;
    const { user } = this.props;
    const proFeatures = ["Breaking Force", "Push off Power", "Verticle lower leg angle on moment of initial contact", "Initial Contact"]
    const view = charts.map((chartData) => {
      if (!chartData.data || !chartData.data.datasets) return;
      const chartView = show[chartData.name] ? (
        <div>
          <Detail chartData={chartData.data} chartOptions={options} />
        </div>
      ) : <div />;
      return (
        <div>
          {!proFeatures.includes(chartData.label) ? (
            <li key={chartData.name}>
              <div className= "collapsible-header" onClick={() => this.toggleChart(chartData.name)}>
              <i className={`material-icons ${chartData.iconColor}-text`}>{chartData.icon}</i>{chartData.label}
              </div>
              {chartView}
            </li>
            // chartView
          ) : (
            user.typeid == 1 ? (
              <li key={chartData.name}>
                <div className="collapsible-header modal-trigger" data-target="premium-modal">
                  <i className={`material-icons ${chartData.iconColor}-text`}>{chartData.icon}</i>{chartData.label}
                  <span className="badge">PRO</span>
                </div>
              </li>
            ) : (
              <li key={chartData.name}>
                <div className= "collapsible-header" onClick={() => this.toggleChart(chartData.name)}>
                  <i className={`material-icons ${chartData.iconColor}-text`}>{chartData.icon}</i>{chartData.label}
                  <span className="badge">PRO</span>
                </div>
                {chartView}
              </li>
            )
          )
          }
        </div>
      );
    });
    return (
      <div className="div">
        <div id="premium-modal" className="modal">
          <div className="modal-content">
            <h4>Subscribe to premium!</h4>
            <p>Hey there! You're not a premium member. To access this feature, you'll need to subscribe to our premium service</p>
            <p>You'll get access to things like detailed analysis of your run performance, tracking of how far you've run in shoes, 
             , and helpful feedback to let you improve your performance!</p>
            <p>Click the button below to get started.</p>
          </div>
          <div className="modal-footer">
            <Link to="settings" className="modal-close waves-effect waves-green btn-flat">Go to settings</Link>
          </div>
        </div>

        <div className="col s12">
          <ul className="collapsible">
            {view}
          </ul>
        </div>
      </div>
    );
  }
}

Details.propTypes = {
  runDetails: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateUser: payload => dispatch(actions.updateUser(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);
