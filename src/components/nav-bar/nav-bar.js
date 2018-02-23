import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import firebase from 'firebase';
import style from './nav-bar.css';
import { Link, NavLink } from 'react-router-dom';

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
        <Nav pullRight>
          {this.props.authenticated
            ? ( // if you are signed in
              <NavItem>
                <NavLink
                  className="navigation-link"
                  to="/sign-out"
                  style={{color:'rgb(83, 99, 117)'}}
                  activeStyle={{textDecoration:'none', color:'rgb(52, 69, 92)'}}
                >
                  <span className="fa fa-sign-out" style={{marginRight:'4px'}}></span>
                  sign out
                </NavLink>
              </NavItem>
            )
            : ( // if you are signed out
              <NavItem>
                  <NavLink
                    className="navigation-link"
                    to="/sign-in"
                    style={{color:'rgb(83, 99, 117)'}}
                    activeStyle={{textDecoration:'none', color:'rgb(52, 69, 92)'}}
                  >
                    <span className="fa fa-sign-in" style={{marginRight:'4px'}}></span>
                    sign in
                  </NavLink>
              </NavItem>
            )
          }

          {this.props.authenticated
            ? (
              <NavItem>
                <NavLink
                  className="navigation-link"
                  to="/profile"
                  style={{color:'rgb(83, 99, 117)'}}
                  activeStyle={{textDecoration:'none', color:'rgb(52, 69, 92)'}}
                >
                  <span className="fa fa-user" style={{marginRight:'4px'}}></span>
                  {this.props.email}
                </NavLink>
              </NavItem>
            )
            : (
              <NavItem>
                <NavLink
                  className="navigation-link"
                  to="/create-account"
                  style={{color:'rgb(83, 99, 117)'}}
                  activeStyle={{textDecoration:'none', color:'rgb(52, 69, 92)'}}
                >
                  <span className="fa fa-user-plus" style={{marginRight:'4px'}}></span>
                  create account
                </NavLink>
              </NavItem>
            )
          }
        </Nav>
      </Navbar>
    );
  }
}
export default NavBar;
