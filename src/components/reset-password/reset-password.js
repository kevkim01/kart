import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl, HelpBlock, Alert, Modal } from 'react-bootstrap';
import style from './reset-password.css';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

class ResetPassword extends Component {

  constructor(props,context) {
    super(props,context);

    this.state ={
      show: false,
      change: false,
    }
  }

  resetModal() {
    this.setState({
      change:false
    });
  }

  handleSubmit(e){
    var auth = firebase.auth();
    const emailAddress = this.email_in.value;

    e.preventDefault();

    toast.dismiss();

    firebase.auth().sendPasswordResetEmail(emailAddress)
      .then(function() {
        console.log('here');
        toast.dismiss();
        this.setState({
          change: true
        });
      }.bind(this))
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if(errorCode == 'auth/invalid-email'){
          toast
            ("invalid email", {
              autoClose: false,
              type: toast.TYPE.ERROR,
              position:toast.POSITION.TOP_CENTER
            });
        }
        else if(errorCode === 'auth/user-disabled'){
          toast
            ("user disabled", {
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
        else {
          toast
            (errorMessage, {
              autoClose: false,
              type: toast.TYPE.ERROR,
              position:toast.POSITION.TOP_CENTER
            });
        }
      });
  }

  render() {
    return (
      <div>

        <Modal
          show={this.props.show}
          onHide={this.props.handleModal}
          onHide={this.state.change ? this.resetModal() : null}
        >
            <Modal.Header closeButton>
              <Modal.Title>
                <div className="modalTitle">
                  reset your password <span className="fa fa-exclamation-triangle"></span>
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>

            {this.state.change
              ? (
                  <div className="hold_content">
                    <h4>email sent! <span className="fa fa-check-circle"></span> </h4>
                  </div>
              )
              : (
                  <div className="hold_content">
                    <p>
                      Enter your email and we will send you a new password
                    </p>

                    <div className="modal_e_contain">
                      <form onSubmit={this.handleSubmit.bind(this)} noValidate className="form_info_m">

                        <FormGroup validationState={this.state.email_state}>
                          <HelpBlock>email address</HelpBlock>
                          <FormControl
                            className="email_input"
                            type="email"
                            placeholder="you@example.com"
                            inputRef={(ref)=>{this.email_in=ref}}
                          />
                        </FormGroup>

                        <div className="button_m">
                          <Button type="submit" bsStyle="primary">Submit</Button>
                        </div>
                      </form>
                    </div>
                  </div>
              )
            }
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.props.handleModal}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
    );
  }
}
export default ResetPassword;
