import React, { Component } from 'react';
import services from '../../../scripts/services';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actions } from '../../../store/user';

class Shoes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shoes: [],
      drop: '',
      height_forefoot: '',
      weight: '',
      model: '',
      brand: '',
      height_heel: '',
      message: '',
    }

    this.getShoeData = this.getShoeData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeNum = this.handleChangeNum.bind(this);
    this.checkBrand = this.checkBrand.bind(this);
    this.checkModel = this.checkModel.bind(this);
    this.addShoe = this.addShoe.bind(this);
  }

  componentDidMount() {
    this.getShoeData();
  }
  async getShoeData() {
    try {
      const ret = await services.GetShoes();
      // do thing with shoes;      
      this.setState({shoes: ret});
    } catch (e) {
      console.error(e);
    }
    
  }

  async addShoe() {
      const {shoes, drop,
      height_forefoot,
      weight,
      model,
      brand,
      height_heel } = this.state;
      try {
        await services.SetShoes({body: {drop: drop,
        height_forefoot: height_forefoot,
        weight: weight,
        model: model,
        brand: brand,
        height_heel: height_heel}});
       this.getShoeData();
      } catch(e) {
        console.log(e)
      }
  }

  async deleteShoe(event) {
    alert("Done!")
    try {
      await services.RemoveShoe({query: {id: event.target.name}});
    } catch(e) {
      console.log(e)
    }
  }

  disableSave() {
    const {weight, height_forefoot, height_heel, drop } = this.state;
    return !this.checkBrand() || !this.checkModel() || !weight || !height_forefoot || !height_heel || !drop; 
  }

  handleChange(event) {
    const ret = {};
    ret[event.target.name] = event.target.value;
    this.setState(ret);
  }

  handleChangeNum(event) {
    const ret = {};
    ret[event.target.name] = parseInt(event.target.value);
    this.setState(ret);
  }

  checkBrand() {
    const { brand } = this.state;
    var regex = /^[a-zA-Z][a-zA-Z\s]*$/;
    return regex.test(brand) && brand.length > 3;
  }

  checkModel() {
    const { model } = this.state;
    var regex = /^[a-zA-Z][a-zA-Z\s]*$/;
    return regex.test(model) && model.length > 3;
  }

  render() {
    const {shoes, message, index} = this.state;
    var i = 0;
    
    var show = shoes ? Object.keys(shoes).map((shoe, index) => (
      <div className="col s6 m4">
        <div className="card">
          <div className="card-content">
            <span className="card-title">{shoes[shoe].brand} - {shoes[shoe].model}</span>
            <p>Distance run: {shoes[shoe].run_distance} km</p>
          </div>
          <div className="card-action">
            <Link name={shoes[shoe].shoe_id} onClick={this.deleteShoe}>Delete</Link>
          </div>
        </div>
      </div>
    )
      
    ) : <h1>You have no shoes assigned!</h1>;
    const {user} = this.props;
    return (
      <div className="container">
         { user.typeid == 1 ? <h4>Shoes are a premium feature! Subscribe to premium to view this section</h4> : (
        <div>
        <div id="shoesmodal" className="modal">
          <div className="modal-content">
            <h4>Add a shoe to your collection</h4>
            <div className="row">
              <div className="input-field col s6">
                <input name="brand" id="brand" type="text" className={this.checkBrand() ? "valid" : "invalid"} value={this.state.brand} onChange={this.handleChange} />
                <label htmlFor="brand">Shoe Brand</label>
              </div>
              <div className="input-field col s6">
                <input name="model" id="model" type="text" className={this.checkModel() ? "valid" : "invalid"} value={this.state.model} onChange={this.handleChange}/>
                <label htmlFor="model">Shoe Model</label>
              </div>
              <div className="input-field col s6">
                <input name="weight" id="weight" type="number" className="validate" value={this.state.weight} onChange={this.handleChangeNum} />
                <label htmlFor="weight">Weight</label>
              </div>
              <div className="input-field col s6">
                <input name="height_forefoot" id="height_forefoot" type="number" className="validate" value={this.state.height_forefoot} onChange={this.handleChangeNum} />
                <label htmlFor="height_forefoot">Height Forefoot</label>
              </div>
              <div className="input-field col s6">
                <input name="height_heel" id="height_heel" type="number" className="validate" value={this.state.height_heel} onChange={this.handleChangeNum} />
                <label htmlFor="height_heel">Height heel</label>
              </div>
              <div className="input-field col s6">
                <input name="drop" id="drop" type="number" className="validate" value={this.state.drop} onChange={this.handleChangeNum} />
                <label htmlFor="drop">Drop</label>
              </div>
            </div>
            <div className="row">
            <button className="btn btn-large green save-btn modal-close" onClick={this.addShoe} disabled={this.disableSave()}>SAVE</button>
            </div>
          </div>
        </div>
               <div className="row">
            <div className="col s6">
              <h5>Your shoes</h5>
            </div>
            <div className="col s6">
              <a href="#shoesmodal" className="btn btn-floating right modal-trigger"><i
                  className="material-icons">add</i></a>
            </div>
        </div>
        <div className="row">
          {show}
        </div>
        </div>
         )}
      </div>
    );
  }
}


Shoes.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Shoes);
