import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl, HelpBlock, Alert } from 'react-bootstrap';
import style from './sign-in.css';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

class SignIn extends Component {

  constructor() {
    super();
    this.state ={
      redirect:false
    }
  }

  handleSubmit(e) {
    const e_val = this.email_in.value;
    const p_val = this.pword_in.value;

    toast.dismiss();

    firebase.auth().signInWithEmailAndPassword(e_val, p_val)
      .then(function(){
        toast.dismiss();
        this.setState({
          redirect:true
        })
      }.bind(this))
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        if(errorCode === 'auth/invalid-email'){
          toast
            ("invalid email", {
              autoClose: false,
              type: toast.TYPE.ERROR,
              position:toast.POSITION.TOP_CENTER
            });
        }
        else if(errorCode === 'auth/user-disabled'){
          toast
            ("user has been disabled", {
              autoClose: false,
              type: toast.TYPE.ERROR,
              position:toast.POSITION.TOP_CENTER
            });
        }
        else if(errorCode === 'auth/user-not-found'){
          toast
            ("user not found", {
              autoClose: false,
              type: toast.TYPE.ERROR,
              position:toast.POSITION.TOP_CENTER
            });
        }
        else if(errorCode === 'auth/wrong-password'){
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
      <div>
        <ToastContainer />
        <h3>SIGN IN</h3>
        <form onSubmit={this.handleSubmit.bind(this)} noValidate>
          <FormGroup validationState={this.state.email_state}>
            <FormControl
              className="email_input"
              type="email"
              placeholder="email"
              inputRef={(ref)=>{this.email_in=ref}}
            />
          </FormGroup>
          <FormGroup validationState={this.state.password_state}>
            <FormControl
              className="pword"
              type="password"
              placeholder="password"
              inputRef={(ref)=>{this.pword_in=ref}}
            />
          </FormGroup>
          <Button type="submit" bsStyle="primary">Submit</Button>
        </form>
      </div>
    );
  }
}
export default SignIn;
