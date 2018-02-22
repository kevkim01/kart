import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl, HelpBlock, Alert } from 'react-bootstrap';
import style from './sign-out.css';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

class SignOut extends Component {

  constructor() {
    super();
    this.state ={
      redirect: false
    }
  }

  componentWillMount() {
    firebase.auth().signOut().then(function() {
      this.setState({
        redirect: true
      })
    }.bind(this))
  }

  render() {
    if(this.state.redirect === true) {
      return <Redirect to="/" />
    }
    return (
      <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%" }}>
        <h3>Logging Out</h3>
        <i className="fa fa-spinner fa-spin fa-5x"></i>
      </div>
    );
  }
}
export default SignOut;
