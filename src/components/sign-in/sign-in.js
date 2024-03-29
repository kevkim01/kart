import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl, HelpBlock, Alert } from 'react-bootstrap';
import style from './sign-in.css';
import firebase from 'firebase';
import { Redirect, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Logo from '../logo/logo';
import ResetPassword from '../reset-password/reset-password';

class SignIn extends Component {

  constructor() {
    super();
    this.state ={
      redirect:false,
      show: false,
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

  handleClick() {
    this.setState({
      show: true
    })
  }

  handleModal() {
    this.setState({
      show:false
    })
  }

  render() {
    if(this.state.redirect === true){
      return <Redirect to='/my-page' />
    }
    return(
      <div className="main_content_si">

        <ResetPassword show={this.state.show} handleModal={this.handleModal.bind(this)}/>

        <div className="contain_form">

          <div className="heads">
            <Logo/>
            <h3>sign in to kart</h3>
          </div>

          <form onSubmit={this.handleSubmit.bind(this)} noValidate className="form_info_si">

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
                placeholder="password"
                inputRef={(ref)=>{this.pword_in=ref}}
              />
            </FormGroup>

            <div className="button_el">
              <Button type="submit" bsStyle="primary">Submit</Button>
            </div>

          </form>
          <div className="f_password">
            <a className="hov"><p onClick={this.handleClick.bind(this)}>forgot password?</p></a>
          </div>
        </div>
      </div>
    );
  }
}
export default SignIn;
