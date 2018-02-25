import React, { Component } from 'react';
import { Glyphicon } from 'react-bootstrap';
import style from './land-page.css';
import LandCreateAccount from '../create-account/land-create-account';

class LandPage extends Component {

  constructor(){
    super();
    this.state ={
    }
  }

  render() {
    return(
      <div className="land_contain">
        <div className="row" id="page_con">
          <div className="col-sm-5" id="info_layout">
            <div className="row">
              <h1 id ="kart_head">kart</h1>
            </div>
            <div className="row">
              <h5 id ="kart_mess">family/group shopping made easy</h5>
            </div>

            <div className="row" id="land_info">
              <span className="fa fa-cart-arrow-down fa-4x"></span>
              <h4 id="landing_text">shop smarter</h4>
            </div>
            <div className="row" id="land_info">
              <span className="fa fa-users fa-4x"></span>
              <h4 id="landing_text">add friends</h4>
            </div>
            <div className="row" id="land_info">
              <span className="fa fa-calendar fa-4x"></span>
              <h4 id="landing_text">plan efficiently</h4>
            </div>
          </div>

          <div className="col-sm-7">
            <LandCreateAccount />
          </div>
        </div>
      </div>
    );
  }
}
export default LandPage;
