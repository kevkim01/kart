import React, { Component } from 'react';
import firebase from 'firebase';
import { app } from './Config/config';
import CreateAccount from './components/create-account/create-account';
import NavBar from './components/nav-bar/nav-bar';
import LandPage from './components/land-page/land-page';
import SignIn from './components/sign-in/sign-in';
import SignOut from './components/sign-out/sign-out';
import Profile from './components/profile/profile';
import MyPage from './components/my-page/my-page';
import { BrowserRouter,Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state ={
      authenticated:false,
      loading:true,
      email: ""
    }
  }

  componentWillMount() {
    this.removeAuthListener = app.auth().onAuthStateChanged((user) => {
      if(user){
        this.setState({
          authenticated:true,
          loading:false,
          email: user.email
        })
      }
      else {
        this.setState({
          authenticated:false,
          loading:false,
          email: ""
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
        <div style={{ textAlign: "center", position: "absolute", top: "25%", left: "50%", color: "rgb(236, 241, 244)"}}>
          <h3>Loading</h3>
          <i className="fa fa-spinner fa-spin fa-5x"></i>
        </div>
      )
    }
    return (
      <div>
      <ToastContainer />
      <BrowserRouter>
        <div className="main">
          <NavBar authenticated={this.state.authenticated} email={this.state.email}/>

          <div className="content">
            <Route exact path = "/" component={LandPage}/>
            <Route exact path = "/sign-in" component={SignIn}/>
            <Route exact path = "/sign-out" component={SignOut}/>
            <Route exact path = "/create-account" component={CreateAccount}/>
            <Route exact path = "/profile" component={Profile}/>
            <Route exact path = "/my-page" component={MyPage}/>
          </div>
        </div>
      </BrowserRouter>
      </div>
    );
  }
}
export default App;
