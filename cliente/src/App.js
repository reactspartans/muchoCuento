import React, { Component } from 'react';
import './App.css';
import { TalesEditor } from './components/TaleEditor/stateful/TalesEditor';
import { Switch, Route } from 'react-router-dom'
import { Index } from './components/Inicio/Index';
import { NavBar } from './components/NavBar';
import AuthServices from './services/auth-services'
import { Profile } from './components/Profile';
import ProtectedRoute from './components/protected-route'


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

    this.fetchUser()
    console.log(this.state.loggedInUser, 'logged user')

    return (
      <main>

        <NavBar setTheUser={this.setUser} user={this.state.loggedInUser} />

        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/tales-editor" exact component={TalesEditor} user={this.state.loggedInUser} />
          <ProtectedRoute path='/private/profile' exact component={Profile} user={this.state.loggedInUser} setTheUser={this.setUser} />
        </Switch>



      </main>

    );
  }
}



