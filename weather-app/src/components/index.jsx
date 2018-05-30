import React, { Component } from 'react'

import Weather from './Weather';
import ErrorBoundary from './ErrorBoundary';
import Loader from './Loader';
import Sun from './media/sun.svg';


import { firebaseAuth } from '../data/config';

import umbrellaIcon from './media/umbrella.svg'

import './index.css'


let contentLoader = {
  display:"flex",
  height:"100vh",
  justifyContent:"center",
  alignItems:"center"
}

class App extends Component{

  constructor(...props){
    super(...props)

    this.state = {
      user:null,
      loading:true
    }

    this.handleLoginGoogle = this.handleLoginGoogle.bind(this);
    this.renderFormLogin = this.renderFormLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

  }


  componentDidMount(){

    firebaseAuth().onAuthStateChanged(user => {
        this.setState({user,loading:false})
    })

  }


  handleLoginGoogle(){

    const provider = new firebaseAuth.GoogleAuthProvider();

    firebaseAuth().signInWithPopup(provider)
        .then(result =>result.user)
  }


  handleLogout(){
      firebaseAuth().signOut();
  }


  renderFormLogin(){
    return (
      this.state.user
        ? (

          <div>
            <div className="profile">
              <img className="profile__img" src={ this.state.user.photoURL } alt=""/>
              <h2 className="profile__title">Hi! {this.state.user.displayName}</h2>
              <p>this is the weather in your city</p>
              <button className="btn-logout" onClick={this.handleLogout}>Log Out</button>
            </div>
            <ErrorBoundary>
            <Weather />
            </ErrorBoundary>
          </div>
        )
        : (
          <div className="content-login">
            <div className="login">
              <h2>Weather App</h2>
              <img className="login-img" width="100" src={umbrellaIcon} alt="umbrella"/>
              <button onClick={this.handleLoginGoogle} className="btn-login">
                <span className="fa fa-google"></span>
                Sign in with Google
              </button>
            </div>
          </div>
        )
    )

  }

  render(){
    return (
      this.state.loading
        ? (
          <div style={ contentLoader }>
            <Loader logo={Sun} title={" Cargando "} />
          </div>

        )
        : this.renderFormLogin()
    )
  }

}

export default App