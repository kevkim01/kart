import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl, ControlLabel, HelpBlock, Alert } from 'react-bootstrap';
import style from './create-account.css';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Logo from '../logo/logo';

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
        this.setState({
          redirect:true
        })
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
      })
    e.preventDefault();
  }

  render() {
    if(this.state.redirect === true){
      return <Redirect to='/my-page' />
    }
    return(
      <div className="main_content">

        <ToastContainer/>

        <div className="head">
          <Logo/>
          <h3>create kart account</h3>
        </div>

        <div className="form_contain">
          <form onSubmit={this.handleSubmit.bind(this)} noValidate className="form_info">

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

            <div className="button_element">
              <Button type="submit" bsStyle="primary">create account</Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default CreateAccount;
