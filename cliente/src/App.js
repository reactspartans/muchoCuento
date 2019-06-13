import React, { Component } from 'react';
import './App.css';
import { TalesEditor } from './components/TaleEditor/stateful/TalesEditor';
import { Switch, Route } from 'react-router-dom'
import { Index } from './components/Inicio/Index';
import { NavBar } from './components/NavBar';
import {Login, SingUp, Logout} from './components/Inicio/auth/logForms'
import AuthServices from './services/auth-services'



export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = { loggedInUser: null }
    this.services = new AuthServices()
  }

  setUser = userObj => this.setState({ loggedInUser: userObj })

  fetchUser = () => {
    if (this.state.loggedInUser === null) {
      this.services.loggedin()
        .then(response => this.setState({ loggedInUser: response }))
        .catch(x => this.setState({ loggedInUser: false }))
    }
  }



    render() {
      return (
        <main>

          <NavBar setTheUser={this.setUser}/>

          <Switch>
            <Route path="/" exact component={Index} />
            <Route path="/tales-editor" exact component={TalesEditor} />
          </Switch>
        

          
        </main>
        
      );
    }
}



