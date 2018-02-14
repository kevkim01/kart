import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import style from './nav-bar.css';

class NavBar extends Component {

  constructor(){
    super();
    this.state ={
    }
  }

  render() {
    return(
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <p>hello</p>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem>
            <p>hi</p>
          </NavItem>
          <NavItem>
            <p>hi</p>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
export default NavBar;
