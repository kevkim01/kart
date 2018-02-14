import React, { Component } from 'react';
import LogIn from './components/log-in/log-in.js';
import CreateAccount from './components/create-account/create-account.js';
import NavBar from './components/nav-bar/nav-bar.js';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <NavBar/>
        <div className="row1">
          <div className="col-sm-6"><LogIn/></div>
          <div className="col-sm-6"><CreateAccount/></div>
        </div>
      </div>
    );
  }
}
export default App;
