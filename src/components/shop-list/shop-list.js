import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl, HelpBlock, Alert, Modal } from 'react-bootstrap';
import style from './shop-list.css';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import FlipMove from 'react-flip-move';
import { base } from '../../Config/config';

class ShopList extends Component {

  constructor() {
    super();
    this.deleteTask = this.deleteTask.bind(this);
    this.state ={
      items:[],
      index:0
    }
  }

  componentWillMount(){
    var user = firebase.auth().currentUser;
    var itemsRef = base.syncState('users/' + user.uid + '/events/' + this.props.eventKey + '/items', {
      context: this,
      state: 'items',
      asArray: true
     });
  }

  handleSubmit(e){
    var i = this.state.index;
    var a = this.state.items.slice(); //creates the clone of the state
    a[i] = {
      item:this.shop_item.value,
      key:Date.now()
    };

    var user = firebase.auth().currentUser;
    var itemKey = this.shop_item.value;
    const account = firebase.database().ref('users/' + user.uid + '/events/' + this.props.eventKey + '/items').child(itemKey);
    account.set({
      item: this.shop_item.value
    });
    e.target.reset();
    e.preventDefault();
  }

  deleteTask(key) {
    var filteredItems = this.state.items.filter(function (item) {
      return (item.key !== key);
    });

    this.setState({
      items: filteredItems
    });
  }

  render() {
    return (

      <div>
      <FlipMove duration={400} easing="ease-out">
       {this.state.items.map(d => (
         <div className="item_row" key={d.key}>
           <div id="listItem" className="col-sm-6">
             <div id="listItem" key={d.key}>{d.item}</div>
           </div>
           <div id="ex_contain" className="col-sm-6">
             <span id="ex" className="fa fa-times"
               onClick={() => this.deleteTask(d.key)}>
              </span>
           </div>
         </div>
       ))}
     </FlipMove>

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
