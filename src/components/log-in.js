import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Form, FormGroup, FormControl } from 'react-bootstrap';
import { Glyphicon } from 'react-bootstrap';

class LogIn extends Component {

  constructor(){
    super();
    this.state ={
      email:"",
      password:""
    }
  }

  getValidationState(){
    const length = this.state.password.length;
    if(length>6) {return 'success';}
    else if(length>3) {return 'warning';}
    else if(length>0) {return 'error';}
    return null;
  }

  handleSubmit(e){
    if(this.form_email.value === ""){
      alert('email is required');
    }
    else if(this.form_pass.value === ""){
      alert('password is required');
    }
    else {
      this.setState({
        email: this.form_email.value,
        password: this.form_pass.value
      }, function(){
        console.log(this.state);
      });
    }
    e.preventDefault();
  }

  handleChange(e){
    this.setState({
      password: this.form_pass.value
    })
  }

  render() {
    return (
      <div>
        <h3>Sign In</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup validationState={this.getValidationState()}>
            <FormControl
              className="formemail"
              type="email"
              placeholder="enter email"
              inputRef={(ref)=>{this.form_email=ref}}
            />
          </FormGroup>
          <FormGroup>
            <FormControl
              className="formpass"
              type="password"
              placeholder="enter password"
              inputRef={(ref)=>{this.form_pass=ref}}
              onChange={this.handleChange.bind(this)}
            />
          </FormGroup>
          <Button type="submit" bsStyle="primary">Submit</Button>
        </form>
      </div>

    );
  }
}

export default LogIn;
