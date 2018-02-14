import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl, HelpBlock, Alert } from 'react-bootstrap';
import style from './create-account.css';

class CreateAccount extends Component {

  constructor(){
    super();
    this.state ={
      email:"",
      email_error:"invalid email",
      email_valid:true,

      password:"",
      pass_error:"password must be at least 6 characters",
      pass_valid:true,

      form_valid:false,
      form_error:"",

      show_alert:false
    }
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
    const e_val = this.form_email.value;
    const p_val = this.form_pass.value;

    if(e_val.length===0 || p_val.length===0){
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
        email: this.form_email.value,
        password: this.form_pass.value,
        form_error:"",
        show_alert:false
      }, function(){
        console.log(this.state);
      });
    }
    e.preventDefault();
  }

  handleChange(e){
    const e_val = this.form_email.value;
    const p_val = this.form_pass.value;

    if(e_val.match(/^\S+@\S+\.\S+$/i) && p_val.length >=6){
      this.setState({ // form is valid
        email: e_val,
        email_valid: true,
        password: p_val,
        pass_valid: true,
        form_valid: true,
        show_alert: false
      })
    }
    else if(!e_val.match(/^\S+@\S+\.\S+$/i) && p_val.length >=6){
      this.setState({ // email is not valid ~ password is valid
        email: e_val,
        email_valid: false,
        password: p_val,
        pass_valid: true,
        form_valid: false,
      })
    }
    else if(e_val.match(/^\S+@\S+\.\S+$/i) && !(p_val.length >=6)){
      this.setState({ // email is valid ~ password is not valid
        email: e_val,
        email_valid: true,
        password: p_val,
        pass_valid: false,
        form_valid: false
      })
    }
    else{
      this.setState({ // none are valid
        email: e_val,
        email_valid: false,
        password: p_val,
        pass_valid: false,
        form_valid: false
      })
    }
    if(e_val.length===0){
      this.setState({
        email_valid: true
      })
    }
    if(p_val.length===0){
      this.setState({
        pass_valid: true
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
    const val_email = this.state.email_valid;
    const val_pass = this.state.pass_valid;
    const val_form = this.state.form_valid;
    return (
      <div className="ca_con">
        <h3>Create Account</h3>
        <form onSubmit={this.handleSubmit.bind(this)} noValidate className="ca_form_info">
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
              <p>{!val_email ? this.state.email_error : ' '}</p>
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
