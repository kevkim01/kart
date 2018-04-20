import React, { Component } from 'react';
import style from './profile.css';
import firebase from 'firebase';
import { base } from '../../Config/config';
import { Button, Form, FormGroup, FormControl, ControlLabel, HelpBlock, Alert } from 'react-bootstrap';


class Profile extends Component {

  constructor() {
    super();
    this.state ={
      disp_name:"",
      friends: new Array()
    }
  }

  componentWillMount(){
    //console.log("pals ", this.state.friends);
    var user = firebase.auth().currentUser;
    this.eventsRef = base.syncState('users/' + user.uid +'/0', {
      context: this,
      state: 'disp_name'
     });

     this.friendsRef = base.syncState('users/' + user.uid +'/friends', {
       context: this,
       state: 'friends',
       asArray: true
      });
  }

  componentWillUnmount(){
    base.removeBinding(this.eventsRef);
    base.removeBinding(this.friendsRef);
  }

  handleSubmit(e){
    var fr_email = this.friend_email.value;

    var dup = this.state.friends.slice();
    var me = this.state.disp_name;

    var user = firebase.auth().currentUser;
    let usersRef = firebase.database().ref('users');
    usersRef.orderByChild('email').equalTo(fr_email).on("value", function(snapshot) {

      const users = snapshot.val();
      // USE USERS INFO TO ADD 'ME' TO THEIR FRIENDS LIST -> extract uid
      // make a path for the user to be added, use value 'me' to add friend if valid

      if(dup.indexOf(fr_email) === -1 && users && fr_email != me){
        var add_fr = Object.keys(users)[0];
        var key_me = new Date()+ '0';
        var key_fr = new Date() + '1';

        const account = firebase.database().ref('users/' + user.uid + '/friends').child(key_me);
        account.set({
          friend_email: fr_email
        });

        const acc = firebase.database().ref('users/' + add_fr + '/friends').child(key_fr);
        acc .set({
          friend_email: me
        })
      }
    });

    e.preventDefault();
    e.target.reset();
  }

  render() {
    console.log(this.state.friends);
    const friendsL = this.state.friends.map((fr) =>
      <li>{Object.values(fr)[0]}</li>
    )

    return(
      <div id="pg_contain">
        <div id="disp_name_contain">
          <h3>{this.state.disp_name}</h3>
        </div>
        <div id="add_friend_contain">
          <h3>add friends</h3>
          <form onSubmit={this.handleSubmit.bind(this)} noValidate className="">
            <FormGroup>
              <FormControl
                type="email"
                placeholder="search for friends by email"
                inputRef={(ref)=>{this.friend_email=ref}}
              />
            </FormGroup>
            <div className="button_el">
              <Button type="submit" bsStyle="primary">Submit</Button>
            </div>
          </form>

          <div id="friendsList">
            <ul>{friendsL}</ul>
          </div>

        </div>
      </div>
    );
  }
}
export default Profile;
