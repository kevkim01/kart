import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl, HelpBlock, Alert } from 'react-bootstrap';
import style from './create-account.css';
import firebase from 'firebase';

class CreateAccount extends Component {

  constructor(){
    super();
    this.state ={
      username:"",
      username_error:"username must be between 5-15 characters",
      username_valid:true,

      email:"",
      email_error:"invalid email",
      email_valid:true,

      password:"",
      pass_error:"password must be at least 6 characters",
      pass_valid:true,

      verify_password:"",
      verify_password_valid:true,

      form_valid:false,
      form_error:"",

      show_alert:false
    }
  }
  getValidationStateUserName(){
    const valid = this.state.username;
    if(valid===""){
      return null;
    }
    else if(valid.match(/^\w{5,15}$/)){
      return 'success';
    }
    return 'error';
  }

  getValidationStateEmail(){
    const valid = this.state.email;
    if (valid===""){
      return null;
    }
    else if(valid.match(/^\S+@\S+\.\S+$/i)){
      return 'success';
    }
    return 'error';
  }

  getValidationStatePassword(){
    const length = this.state.password.length;
    if(length>=6){ return 'success'; }
    else if(length>0){ return 'error'; }
    return null;
  }

  handleSubmit(e){
    const u_val = this.form_uname.value;
    const e_val = this.form_email.value;
    const p_val = this.form_pass.value;

    if(u_val.length===0 || e_val.length===0 || p_val.length===0){
      this.setState({
        form_error:"please fill in all fields",
        show_alert:true
      })
    }
    else if(!this.state.form_valid){
      this.setState({
        form_error:"there are invalid fields",
        show_alert:true
      })
    }
    else {
      this.setState({
        username: u_val,
        email: e_val,
        password: p_val,
        form_error:"",
        show_alert:false
      }, function(){
        console.log(this.state);
        firebase.auth().createUserWithEmailAndPassword(e_val, p_val).catch(function(error){
          var errorCode = error.code;
          var errorMessage = error.message;

          if (errorCode === 'auth/email-already-in-use'){
            //alert('email-already-in-use.');
            this.setState({
              form_error:"this email is already in use",
              show_alert:true
            })
          }
          else{
            alert(errorMessage);
            }
          console.log(error);
        }.bind(this));
      });
    }
    e.preventDefault();
  }

  handleChange(e){
    let u_v; let e_v; let p_v;

    const u_val = this.form_uname.value;
    const e_val = this.form_email.value;
    const p_val = this.form_pass.value;
    // set username properties
    if(u_val.match(/^\w{5,15}$/) || u_val.length===0){
      this.setState({
        username:u_val,
        username_valid:true
      })
      u_v = true;
    }
    else if(u_val.match(/^\w{1,4}$/) || u_val.match((/^\w{16,}$/))){
      this.setState({
        username:u_val,
        username_valid: false,
        username_error: "username must be between 5-15 characters"
      })
    }
    else{
      this.setState({
        username:u_val,
        username_valid:false,
        username_error:"username has invalid character"
      })
      u_v = false;
    }
    // set email properties
    if(e_val.match(/^\S+@\S+\.\S+$/i) || e_val.length===0){
      this.setState({
        email:e_val,
        email_valid:true
      })
      e_v = true;
    }
    else{
      this.setState({
        email: e_val,
        email_valid: false
      })
      e_v = false;
    }
    // set password properties
    if(p_val.length >= 6 || p_val.length ===0){
      this.setState({
        password: p_val,
        pass_valid: true
      })
      p_v = true;
    }
    else{
      this.setState({
        password: p_val,
        pass_valid: false
      })
      p_v = false;
    }
    // regulate form validity
    if(u_val.length===0 || e_val.length===0 || p_val.length===0){
      this.setState({
        form_valid: false,
      })
    }
    else if(u_v && e_v && p_v){
      this.setState({
        form_valid: true,
        show_alert: false
      })
    }
    else{
      this.setState({
        form_valid: false,
      })
    }
  }

  renderAlert(){
    if(this.state.show_alert){
      const val_form = this.state.form_valid;
      return (
        <Alert bsStyle="danger" className="ca_f_alert">
          <strong>{!val_form ?this.state.form_error : ""}</strong>
        </Alert>
      )
    }
  }

  render() {
    const val_uname = this.state.username_valid;
    const val_email = this.state.email_valid;
    const val_pass = this.state.pass_valid;
    const val_form = this.state.form_valid;
    return (
      <div className="ca_con">
        <h3>Create Account</h3>
        <form onSubmit={this.handleSubmit.bind(this)} noValidate className="ca_form_info">

          <FormGroup validationState={this.getValidationStateUserName()}>
            <FormControl
              className="formuname"
              type="text"
              placeholder="enter username (letters, numbers, underscore)"
              value={this.state.username}
              inputRef={(ref)=>{this.form_uname=ref}}
              onChange={this.handleChange.bind(this)}
            />
            <FormControl.Feedback/>
            <HelpBlock>
              <p>{!val_uname ? this.state.username_error : ""}</p>
            </HelpBlock>
          </FormGroup>

          <FormGroup validationState={this.getValidationStateEmail()}>
            <FormControl
              className="formemail"
              type="email"
              placeholder="enter email"
              value={this.state.email}
              inputRef={(ref)=>{this.form_email=ref}}
              onChange={this.handleChange.bind(this)}
            />
            <FormControl.Feedback/>
            <HelpBlock>
              <p>{!val_email ? this.state.email_error : ""}</p>
            </HelpBlock>
          </FormGroup>

          <FormGroup validationState={this.getValidationStatePassword()}>
            <FormControl
              className="formpass"
              type="password"
              placeholder="enter password"
              value={this.state.password}
              inputRef={(ref)=>{this.form_pass=ref}}
              onChange={this.handleChange.bind(this)}
            />
            <FormControl.Feedback/>
            <HelpBlock>
              <p>{!val_pass ? this.state.pass_error : ""}</p>
            </HelpBlock>
          </FormGroup>

          <Button type="submit" bsStyle="primary">Submit</Button>
          {this.renderAlert()}
        </form>
      </div>
    );
  }
}
export default CreateAccount;
