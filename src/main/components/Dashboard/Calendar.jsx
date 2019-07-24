import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions } from '../../../store/currentRun';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = BigCalendar.momentLocalizer(moment);

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      loading: true,
    };

    this.onLoad = this.onLoad.bind(this);
    this.viewSelectedRun = this.viewSelectedRun.bind(this);
  }

  componentWillMount() {
    this.onLoad();
  }

  onLoad() {
    const ret = [];
    const { runData } = this.props;
    runData.forEach((run) => {
      ret.push({
        start: new Date(moment(run.date, 'YYYY MM DD').format()),
        end: new Date(moment(run.date, 'YYYY MM DD').add(1, 'D').format()),
        title: `${run.distance}km Run`,
        desc: `You ran ${run.distance}km in ${run.time}`,
        id: run.id,
      });
    });

    this.setState({ events: ret, loading: false });
  }

  async viewSelectedRun(ev) {
    const { viewRun, setCurrentRun } = this.props;
    await setCurrentRun(ev.id);
    viewRun('data');
  }

  render() {
    const { events } = this.state;
    return (
      <div className="Calendar">
        <BigCalendar
          className="z-depth-1"
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="month"
          views={['month']}
          events={events}
          style={{ width: '100%', height: '80vh' }}
          onSelectEvent={this.viewSelectedRun}
        />
      </div>
    );
  }
}
Calendar.propTypes = {
  runData: PropTypes.array.isRequired,
  viewRun: PropTypes.func.isRequired,
  setCurrentRun: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
