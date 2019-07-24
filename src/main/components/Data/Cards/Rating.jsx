import React, { Component } from 'react';
import M from 'materialize-css';
import PropTypes from 'prop-types';
import '../../../../style/Ratings.css';
import services from '../../../../scripts/services';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Rating extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: '',
      description: '',
      showSave: '',
      shoeId: '',
      ourShoe: {},
    };

    this.loadData = this.loadData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.chooseShoe = this.chooseShoe.bind(this);
  }

  componentDidMount() {
    M.AutoInit();
    M.updateTextFields();
    this.loadData();
  }

  async loadData() {
    const {currentRun} = this.props; 
    try {
      const runDat = await services.GetRunDetailed({ query: { run_id: currentRun } })
      if (!runDat.shoe) {
        runDat.shoe = 0;
      }
      this.setState({ rating: runDat.rating, description: runDat.description, shoeId: runDat.shoe})
      
    } catch(e) {
      console.log(e);
    } 

    try {
      const shoeDat = await services.GetShoes();
      this.setState({shoes: shoeDat});
      Object.keys(shoeDat).map((shoe, index) => {
        if (shoeDat[shoe].shoe_id == this.state.shoeId) {
          this.setState({ourShoe: shoeDat[shoe]})
        }
      });
    } catch(e) {
      console.log(e);
    }
  }

  async submit() {
    const { rating, description, shoeId } = this.state;
    const {currentRun} = this.props; 
    try {
      const ret = { run_id: currentRun, rating: rating, description: description, shoe: parseInt(shoeId)}
      await services.SetRunDetailed({ body: ret });
      this.setState({ showSave: false});
      this.loadData();
    } catch(e) {
      console.log(e);
    }
  }

  handleChange(e) {
    const { rating, description, showSave } = this.state;    
    if (e.target.name === "rating") {
      if (rating != e.target.value) {
        this.setState({ rating: parseInt(e.target.value), showSave: true })
      }
    }
    if (e.target.name === "description") {
      if (description != e.target.value) {
        this.setState({ description: e.target.value, showSave: true })
      }
    }
  }

  chooseShoe(e) {
    this.setState({shoeId: e.target.name, showSave: true})
  }

  checkDesc() {
    const { description } = this.state;
    const regex =/^[a-zA-Z0-9 ?!.,'";:\(\)\r\n/]*$/;
    return regex.test(description);
  }

  render() {
    // Add any props here: const { propName } = this.props;
    const {shoes, shoeId} = this.state;
    const {user} = this.props;
    var show = shoes ? Object.keys(shoes).map((shoe, index) => (
      <div className="col s6 m4">
        <div className="card">
          <div className="card-content">
            <span className="card-title">{shoes[shoe].brand} - {shoes[shoe].model}</span>
            <p>Distance run: {shoes[shoe].run_distance} km</p>
          </div>
          <div className="card-action">
            <Link name={shoes[shoe].shoe_id} className="modal-close" onClick={this.chooseShoe}>Choose</Link>
          </div>
        </div>
      </div>
    )
      
    ) : <h1>You have no shoes assigned!</h1>;
    return (
      <div className="card blue-grey darken-3 card-run-overview-primary">
        <div id="shoes" class="modal">
          <div class="modal-content">
            <h4>Assign a shoe to this run</h4>
            {show}
          </div>
        </div>
        <div className="card-content white-text">
          <div className="row">
            <div className="col s12">
              <span className="card-title">Rate this run:</span>
              <div className="center-align rating-stars">
                {this.state.rating < 1 ? <p>You haven't given this run a rating! Click a star below.</p> : ""}
                <fieldset className="rating">
                  <input type="radio" id="star5" name="rating" value="5" checked={this.state.rating == 5} onClick={this.handleChange} /><label className = "full" htmlFor="star5" title="Awesome - 5 stars"></label>
                  <input type="radio" id="star4" name="rating" value="4" checked={this.state.rating == 4} onClick={this.handleChange} /><label className = "full" htmlFor="star4" title="Pretty good - 4 stars"></label>
                  <input type="radio" id="star3" name="rating" value="3" checked={this.state.rating == 3} onClick={this.handleChange} /><label className = "full" htmlFor="star3" title="Meh - 3 stars"></label>
                  <input type="radio" id="star2" name="rating" value="2" checked={this.state.rating == 2} onClick={this.handleChange} /><label className = "full" htmlFor="star2" title="Kinda bad - 2 stars"></label>
                  <input type="radio" id="star1" name="rating" value="1" checked={this.state.rating == 1} onClick={this.handleChange} /><label className = "full" htmlFor="star1" title="Sucks big time - 1 star"></label>
                </fieldset>
              </div>
            </div>
            <form className="col s12">
              <div className="row">
                <div className="input-field col s12">
                  <textarea id="notes" name="description" value={this.state.description} onChange={this.handleChange} className="materialize-textarea white-text" />
                  <label htmlFor="notes">Notes for this run...</label>
                </div>
              </div>
            </form>
            {user.typeid == 2 ? (
            <div className="">
              <p className="card-title">Shoe: {this.state.ourShoe !== {} ? this.state.ourShoe.brand + "-" +  this.state.ourShoe.model : "No shoe assigned"}</p>
              <div className="center-align">
                <Link className='modal-trigger btn' data-target='shoes'>Choose a shoe</Link>
              </div>
            </div>
            ) : <p>Want shoe tracking? Subscribe to premium!</p>}
            
            {this.state.showSave ? <div className="center-align"><br/><button class="btn" onClick={this.submit} disabled={!this.checkDesc()}>Save</button></div> : ""}
          </div>
        </div>
      </div>
    );
  }
}
Rating.propTypes = {
  // Declare props here:
  currentRun: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    currentRun: state.currentRun,
    user: state.user,
  };
}
export default connect(mapStateToProps)(Rating);