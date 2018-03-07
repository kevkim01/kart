import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl, HelpBlock, Alert, Modal } from 'react-bootstrap';
import style from './shop-list.css';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

class ShopList extends Component {

  constructor() {
    super();
    this.createTasks = this.createTasks.bind(this);
    this.state ={
      items:[],
      index:0
    }
  }

  handleSubmit(e){
    var i = this.state.index;
    var a = this.state.items.slice(); //creates the clone of the state
    a[i] = {
      item:this.shop_item.value,
      key:Date.now()
    };
    this.setState({
      items: a,
      index: i+1
    })
    e.target.reset();
    e.preventDefault();
  }

  createTasks(d) {
    return <li key={d.key}>{d.item}<span className="fa fa-times"></span></li>
  }

  render() {
    var listItems = this.state.items.map(this.createTasks);
    return (
      <div>
        {listItems.length != 0
          ? (
            <div>
              <ul className="disp_list">
                {listItems}
              </ul>
            </div>
          )
          : (
            <div></div>
          )
      }
        <form onSubmit={this.handleSubmit.bind(this)} noValidate>
          <FormGroup validationState={this.state.password_state}>
            <FormControl
              type="text"
              placeholder="add item"
              inputRef={(ref)=>{this.shop_item=ref}}
            />
          </FormGroup>

          <div className="button_el">
            <Button type="submit" bsStyle="primary">add</Button>
          </div>
        </form>
      </div>
    );
  }
}
export default ShopList;
