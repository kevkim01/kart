import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl, HelpBlock, Alert } from 'react-bootstrap';
import style from './create-account.css';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

class CreateAccount extends Component {

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
      })
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
      })
    e.preventDefault();
  }

  render() {
    if(this.state.redirect === true){
      return <Redirect to='/' />
    }
    return(
      <div>
      <ToastContainer />
      <h3>CREATE ACCOUNT</h3>
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
export default CreateAccount;
