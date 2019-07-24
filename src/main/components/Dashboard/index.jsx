import React, { Component } from 'react';
import M from 'materialize-css';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import services from '../../../scripts/services';
import { actions } from '../../../store/runs';
import { actions as userActions } from '../../../store/user';
import { actions as runActions } from '../../../store/run';

import ActivityFeed from './ActivityFeed';
import Calender from './Calendar';
import Overview from './Overview';
import Footer from '../Footer';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };

    this.onLoad = this.onLoad.bind(this);
    this.toDetails = this.toDetails.bind(this);
  }

  async componentWillMount() {
    M.AutoInit();
    M.updateTextFields();
    await this.onLoad();
  }

  async onLoad() {
    this.setState({ loading: true });
    const { setRuns } = this.props;
    try {
      const ret = await services.Calendar();
      setRuns(ret.runs);
    } catch (err) {
      console.error(err);
      if (err === 401) {
        const { logoutUser, history } = this.props;
        try {
          await services.Logout();
        } catch (e) {
          console.error(e);
        } finally {
          sessionStorage.clear();
          services.userToken = null;
          await logoutUser();
          sessionStorage.clear();

          process.nextTick(() => {
            history.push('/login');
          });
        }
      }
    } finally {
      this.setState({ loading: false });
    }
  }

  async toDetails() {
    const { currentRun, setRunDetails, handleNav } = this.props;
    try {
      // const runDetails = await services.GetRunDetailed({ query: { runId: currentRun } });
      const runDetails = await services.GetRunDetailed({ query: { run_id: currentRun } });
      setRunDetails(runDetails);
    } catch (err) {
      console.error(err);
    } finally {
      handleNav('data');
    }
  }

  render() {
    const { runs } = this.props;
    if (this.state.loading) {
      return (
        <main>
          <div className="container">
            <div className="centered-box part main-body">
              <div className="progress inner ra-linear-loader-inner">
                <div className="indeterminate ra-linear-loader-background" />
              </div>
            </div>
          </div>
        </main>
      );
    }
    return (
      <main>
        <div className="container">
          <div className="main-body">
            <div id="premium-modal" className="modal">
              <div className="modal-content">
                <h4>Subscribe to premium!</h4>
                <p>Hey there! You're not a premium member. To access this feature, you'll need to subscribe to our premium service</p>
                <p>
You'll get access to things like detailed analysis of your run performance, tracking of how far you've run in shoes,
             , and helpful feedback to let you improve your performance!
                </p>
                <p>Click the button below to get started.</p>
              </div>
              <div className="modal-footer">
                <Link to="settings" className="modal-close waves-effect waves-green btn-flat">Go to settings</Link>
              </div>
            </div>
            <div className="row">
              <ActivityFeed handleNav={this.toDetails} runData={runs} />
              <div className="col s12 m12 l9">
                <Overview />
                <Calender runData={runs} viewRun={this.toDetails} />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </main>

    );
  }
}
Dashboard.propTypes = {
  setRuns: PropTypes.func.isRequired,
  currentRun: PropTypes.number.isRequired,
  runs: PropTypes.array.isRequired,
  handleNav: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  setRunDetails: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    runs: state.runs,
    currentRun: state.currentRun,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setRuns: payload => dispatch(actions.setRunList(payload)),
    setRunDetails: payload => dispatch(runActions.setRunData(payload)),
    logoutUser: () => dispatch(userActions.logout()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
