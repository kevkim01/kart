import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import firebase from 'firebase';
import style from './nav-bar.css';
import { Link } from 'react-router-dom';

class NavBar extends Component {

  constructor(){
    super();
    this.state ={
    }
  }

  render() {
    return(
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            {this.props.authenticated
              ? (
                <Link to="/my-page"><p>kart</p></Link>
              )
              : (
                <Link to="/"><p>kart</p></Link>
              )
            }

          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          {this.props.authenticated
            ? ( // if you are signed in
              <NavItem>
                <Link to="/sign-out">sign out</Link>
              </NavItem>
            )
            : ( // if you are signed out
              <NavItem>
                  <Link to="/sign-in">sign in</Link>
              </NavItem>
            )
          }

          {this.props.authenticated
            ? (
              <NavItem>
                <Link to="/profile">{this.props.email}</Link>
              </NavItem>
            )
            : (
              <NavItem>
                <Link to="/create-account">create account</Link>
              </NavItem>
            )
          }
        </Nav>
      </Navbar>
    );
  }
}
export default NavBar;
