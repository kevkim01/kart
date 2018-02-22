import React, { Component } from 'react';
import firebase from 'firebase';
import { DB_CONFIG } from './Config/config';
import CreateAccount from './components/create-account/create-account';
import NavBar from './components/nav-bar/nav-bar';
import LandPage from './components/land-page/land-page';
import SignIn from './components/sign-in/sign-in';
import { BrowserRouter,Route } from 'react-router-dom';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.app = firebase.initializeApp(DB_CONFIG);
    //this.db = this.app.database().ref().child();
    this.state ={
      authenticated:false,
      loading:true
    }
  }

  componentWillMount() {
    this.removeAuthListener = this.app.auth().onAuthStateChanged((user) => {
      if(user){
        this.setState({
          authenticated:true,
          loading:false
        })
      }
      else {
        this.setState({
          authenticated:false,
          loading:false
        })
      }
    })
  }

  componentWillUnmount(){
    this.removeAuthListener;
  }

  render() {
    if (this.state.loading === true) {
      return (
        <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%" }}>
          <h3>Loading</h3>
          <i class="fa fa-spinner fa-spin fa-5x"></i>
        </div>
      )
    }
    return (
      <BrowserRouter>
        <div>
          <NavBar authenticated={this.state.authenticated}/>

          <div className="container">
            <Route exact path = "/" component={LandPage}/>
            <Route exact path = "/sign-in" component={SignIn}/>
            <Route exact path = "/create-account" component={CreateAccount}/>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
