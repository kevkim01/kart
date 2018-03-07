import React, { Component } from 'react';
import { Button, Form, FormGroup, FormControl, HelpBlock, Alert, Modal } from 'react-bootstrap';
import style from './create-event.css';
import firebase from 'firebase';
import { Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import ShopList from '../shop-list/shop-list'

class CreateEvent extends Component {

  constructor(props,context) {
    super(props,context);

    this.state ={
      show: false,
    }
  }

  handleSubmit(e){

  }

  render() {
    return (
      <div>
        <Modal
          show={this.props.show}
          onHide={this.props.handleModal}
        >
            <Modal.Header closeButton>
              <Modal.Title>
                <div className="modalTitle">
                  shopping list for {this.props.title}
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="hold_content">
                <ShopList />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.props.handleModal}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
    );
  }
}
export default CreateEvent;
