import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import style from './nav-bar.css';
import { Link } from 'react-router-dom';

class NavBar extends Component {

  constructor(){
    super();
    this.state ={
      authenticated:false
    }
  }

  render() {
    return(
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <p>kart</p>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          {this.props.authenticated
            ? ( // if you are signed in
              <NavItem is={Link}>
                <Link to="/">sign out</Link>
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
              <NavItem is={Link}>
                <Link to="/create-account">create account</Link>
              </NavItem>
            )
            : (
              <NavItem is={Link}>
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
