import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import services from '../../../scripts/services';
import { actions } from '../../../store/user';

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: {
        time: null,
        effort: null,
        distance: null,
        elevation: null,
      },
    };

    this.getAge = this.getAge.bind(this);
  }

  async componentWillMount() {
    const { user } = this.props;
    const ret = await services.WeekSummary();
    console.log('RD', ret);
    this.setState({
      summary: {
        ...ret,
      },
    });
  }

  getAge() {
    const { user } = this.props;
    return moment().diff(user.age, 'years');
  }

  render() {
    const { user } = this.props;
    const { summary } = this.state;

    const userWeight = user.weight ? (
      <li className="today-element">
        <span className="today-highlight">Weight:</span>
        {`${Number(user.weight).toFixed(2)} kg`}
      </li>
    ) : <div />;
    const age = user.age && this.getAge() ? (
      <li className="today-element">
        <span className="today-highlight">Age:</span>
        {this.getAge()}
      </li>
    ) : <div />;
    const elevation = summary.elivation ? (
      <li className="today-element">
        <span className="today-highlight">Elivation Gain:</span>
        {summary.elevation}
      </li>
    ) : <div />;
    const totalTime = summary.time ? (
      <li className="today-element">
        <span className="today-highlight">Weekly Time Active:</span>
        {moment.utc(1000 * summary.time).format('HH:mm.ss')}
      </li>
    ) : <div />;
    const totalDistance = summary.distance ? (
      <li className="today-element">
        <span className="today-highlight">
Distance this week:
        </span>
        {`${summary.distance} km`}
      </li>
    ) : <div />;
    const effort = summary.effort ? (
      <li className="today-element">
        <span className="today-highlight">Effort Level:</span>
        {summary.effort}
      </li>
    ) : <div />;

    return (
      <div className="overview">
        <div className="row">
          <div className="col s12">
            <div className="card card-today z-depth-2">
              <div className="card-content white-text">
                <span className="card-title"><b>Today's Overview</b></span>
                <div className="row">
                  <div className="col s12 m6">
                    { userWeight }
                    { age }
                    {elevation}
                    {totalTime}
                  </div>
                  <div className="col s12 m6">
                    {effort}
                    {totalDistance}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Overview.propTypes = {
  user: PropTypes.object.isRequired,
  setUserData: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUserData: payload => dispatch(actions.login(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
