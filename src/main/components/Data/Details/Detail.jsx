import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Charts from 'react-chartjs';

class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // State data
    };
  }

  componentDidMount() {
    // Code to run on component creation:
  }

  render() {
    // Add any props here: const { propName } = this.props;
    const { chartData, chartOptions } = this.props;
    const LineChart = Charts.Line;
    return (
      <div className="detail-chart">
        <LineChart data={chartData} options={chartOptions} />
      </div>
    );
  }
}
Detail.propTypes = {
  // Declare props here:
  chartData: PropTypes.object.isRequired,
  chartOptions: PropTypes.object.isRequired,
};

export default Detail;
