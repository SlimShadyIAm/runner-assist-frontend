import React, { Component } from 'react';
import M from 'materialize-css';
import moment from 'moment';
import PropTypes from 'prop-types';

import Activity from './Activity';

class ActivityFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activities: [],
      loading: true,
    };

    this.onLoad = this.onLoad.bind(this);
  }

  componentDidMount() {
    M.AutoInit();
    this.onLoad();
  }

  onLoad() {
    const ret = [];
    const { runData } = this.props;
    runData.forEach((run, index) => {
      if (index > 3) return;
      const distance = Number(run.distance);
      const timeSec = Number(moment.duration(run.time, 'h:mm:ss').asSeconds());
      const duration = moment.duration(timeSec / distance, 's');
      ret.push({
        date: moment(run.date, 'YYYY MM DD').format('dddd, D MMMM YYYY'),
        time: moment(run.time, 'hh:mm:ss').format('H:mm.ss'),
        pace: `${moment.utc(duration.asMilliseconds()).format('m:ss')} km/min`,
        speed: `${Number((distance / timeSec) * 3600).toFixed(1)} kmph`,
        title: `${run.distance} km run`,
        distance: `${run.distance} km`,
        id: run.id || index,
      });
    });
    this.setState({ activities: ret });
    this.setState({ loading: false });
  }

  render() {
    const { handleNav } = this.props;
    const { activities, loading } = this.state;

    let content;
    if (loading) {
      content = (
        <div className="preloader-wrapper active">
          <div className="spinner-layer spinner-red-only">
            <div className="circle-clipper left">
              <div className="circle" />
            </div>
            <div className="gap-patch">
              <div className="circle" />
            </div>
            <div className="circle-clipper right">
              <div className="circle" />
            </div>
          </div>
        </div>
      );
    } else if (activities.length === 0) {
      content = <h5 className="no-runs">You have yet to record a run</h5>;
    } else {
      content = activities.map((elem, index) => <Activity key={elem.id} handleNav={handleNav} run={elem} index={index} />);
    }
    return (
      <div className="col l3 m12 s12">
        <div className="row">
          <div className="col s12">
            <h4 className="recent">Recent Activity</h4>
          </div>
          <div className="col s12">
            {content}
          </div>
        </div>
      </div>
    );
  }
}
ActivityFeed.propTypes = {
  handleNav: PropTypes.func.isRequired,
  runData: PropTypes.array.isRequired,
};

export default ActivityFeed;
