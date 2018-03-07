import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl, ControlLabel, HelpBlock, Alert } from 'react-bootstrap';
import style from './land-create-account.css';
import firebase from 'firebase';
import { Redirect, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

class LandCreateAccount extends Component {

  constructor() {
    super();
    this.state ={
      redirect:false
    }
  }

  handleSubmit(e) {
    const e_val = this.email_in.value;
    const p_val = this.pword_in.value;

    firebase.auth().createUserWithEmailAndPassword(e_val, p_val)
      .then(function(){
        toast.dismiss();
        this.setState({
          redirect:true
        })

        var e_user = firebase.auth().currentUser;
        e_user.sendEmailVerification()
          .then(function() {
          }).catch(function(error) {
          });

        var user = firebase.auth().currentUser;
        const account = firebase.database().ref('users').child(user.uid);
        account.set({
          email: e_val
        });

      }.bind(this))
      .catch(function(error){
        var errorCode = error.code;
        var errorMessage = error.message;

        toast.dismiss();

        if (errorCode === 'auth/email-already-in-use'){
          toast
            ("email already in use", {
              autoClose: false,
              type: toast.TYPE.ERROR,
              position:toast.POSITION.TOP_CENTER
            });
        }
        else if (errorCode === 'auth/invalid-email'){
          toast
            ("invalid email", {
              autoClose: false,
              type: toast.TYPE.ERROR,
              position:toast.POSITION.TOP_CENTER
            });
        }
        else if(errorCode === 'auth/weak-password'){
          toast
            ("password must be at least 6 characters", {
              autoClose: false,
              type: toast.TYPE.ERROR,
              position:toast.POSITION.TOP_CENTER
            });
        }
        else{
          toast
            (errorMessage, {
              autoClose: false,
              type: toast.TYPE.ERROR,
              position:toast.POSITION.TOP_CENTER
            });
        }
      });
    e.preventDefault();
  }

  render() {
    if(this.state.redirect === true){
      return <Redirect to='/my-page' />
    }
    return(
      <div className="land_main_content">

        <div className="land_head">
          <h2>Get Started!</h2>
        </div>

        <div className="land_form_contain">
          <h4 id="create_mess">create an account</h4>
          <form onSubmit={this.handleSubmit.bind(this)} noValidate className="land_form_info">

            <FormGroup validationState={this.state.email_state}>
              <HelpBlock>email address</HelpBlock>
              <FormControl
                className="email_input"
                type="email"
                placeholder="you@example.com"
                inputRef={(ref)=>{this.email_in=ref}}
              />
            </FormGroup>

            <FormGroup validationState={this.state.password_state}>
              <HelpBlock>password</HelpBlock>
              <FormControl
                className="pword"
                type="password"
                placeholder="password must be at least 6 characters"
                inputRef={(ref)=>{this.pword_in=ref}}
              />
            </FormGroup>

            <div className="land_button_element">
              <Button type="submit" bsStyle="primary">create account</Button>
              <div id="ques">
                <p id="account_mess">already have an account?</p>
                <Link to="/sign-in">sign in here</Link>
              </div>
            </div>


          </form>
        </div>
      </div>
    );
  }
}

export default LandCreateAccount;
