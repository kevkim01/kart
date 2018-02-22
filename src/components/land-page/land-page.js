import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
import style from './land-page.css';

class LandPage extends Component {

  constructor(){
    super();
    this.state ={
    }
  }

  render() {
    return(
      <div>
        <div className="row" id="land_info">
          <span className="fa fa-calendar fa-4x col-sm-6"></span>
          <p className="col-sm-6" id="landing_text">hello</p>
        </div>
        <div className="row" id="land_info">
          <span className="fa fa-calendar fa-4x col-sm-6"></span>
          <p className="col-sm-6" id="landing_text">hello</p>
        </div>
        <div className="row" id="land_info">
          <span className="fa fa-calendar fa-4x col-sm-6"></span>
          <p className="col-sm-6" id="landing_text">hello</p>
        </div>
      </div>
    );
  }
}
export default LandPage;
