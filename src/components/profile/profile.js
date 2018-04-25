import React, { Component } from 'react';
import style from './profile.css';
import firebase from 'firebase';
import { base } from '../../Config/config';
import { Button, Form, FormGroup, FormControl, ControlLabel, HelpBlock, Alert } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Link, NavLink } from 'react-router-dom';


class Profile extends Component {

  constructor() {
    super();
    this.state ={
      disp_name:"",
      friends: new Array(),
      events: new Array()
    }
  }

  componentWillMount(){
    //console.log("pals ", this.state.friends);
    var user = firebase.auth().currentUser;
    this.nameRef = base.syncState('users/' + user.uid +'/email/', {
      context: this,
      state: 'disp_name'
     });

    this.friendsRef = base.syncState('users/' + user.uid +'/friends', {
      context: this,
      state: 'friends',
      asArray: true
    });

    this.eventsRef = base.syncState('users/' + user.uid + '/events/', {
      context: this,
      state: 'events',
      asArray: true
    })
  }

  componentWillUnmount(){
    base.removeBinding(this.nameRef);
    base.removeBinding(this.friendsRef);
    base.removeBinding(this.eventsRef);
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
      console.log(dup.indexOf(fr_email));
      if(fr_email === ""){

      }
      else if(dup.indexOf(fr_email) != -1){
        toast
          ("this user is already a friend", {
            autoClose: false,
            type: toast.TYPE.ERROR,
            position:toast.POSITION.TOP_CENTER
          });
      }
      else if(users == null){
        toast
          ("this email does not exist", {
            autoClose: false,
            type: toast.TYPE.ERROR,
            position:toast.POSITION.TOP_CENTER
          });
      }
      else if(fr_email === me){
        toast
          ("can not add yourself", {
            autoClose: false,
            type: toast.TYPE.ERROR,
            position:toast.POSITION.TOP_CENTER
          });
      }

      else{
        var add_fr = Object.keys(users)[0];

        const account = firebase.database().ref('users/' + user.uid + '/friends').child(add_fr);
        account.set({
          friend_email: fr_email
        });

        const acc = firebase.database().ref('users/' + add_fr + '/friends').child(user.uid);
        acc .set({
          friend_email: me
        })
      }
    });

    e.preventDefault();
    e.target.reset();
  }

  render() {
    return(
      <div id="pg_contain" className="row">
        <div id="left_side" className="col-sm-4">
          <div id="prof_pic">
            <span className="fa fa-user-circle fa-5x" id="prof_avatar"></span>
          </div>

          <div id="disp_name_contain">
            <p>email:</p>
            <h4>{this.state.disp_name}</h4>
          </div>

          <div id="my_events">
            <h3>my events</h3>

            {this.state.events.map(d => (
              <div className="item_row" key={d.key}>
                <div id="listItem">
                  <div id="listItem" key={d.key}>{d.title}</div>
                </div>
              </div>
            ))}

            <div id="goto_cal">
              <Link to="/my-page">
                <Button type="submit" bsStyle="primary">My Calendar</Button>
              </Link>
            </div>
          </div>
        </div>

        <div id="add_friend_contain" className="col-sm-6">
          <h3>my friends</h3>
          <div id="friendsList">
             {this.state.friends.map(d => (
               <div className="item_row" key={d.key}>
                 <div id="listItem">
                   <div id="listItem" key={d.key}>{d.friend_email}</div>
                 </div>
               </div>
             ))}
          </div>

          <form onSubmit={this.handleSubmit.bind(this)} noValidate id="add_form">
            <FormGroup>
              <HelpBlock>add friends</HelpBlock>
              <FormControl
                type="email"
                placeholder="search for friends by email"
                inputRef={(ref)=>{this.friend_email=ref}}
              />
            </FormGroup>
            <div id="button_s">
              <Button type="submit" bsStyle="primary">Submit</Button>
            </div>
          </form>

        </div>
      </div>
    );
  }
}
export default Profile;
