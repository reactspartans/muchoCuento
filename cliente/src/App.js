import React, { Component } from 'react';
import './App.css';
import { TalesEditor } from './components/TaleEditor/stateful/TalesEditor';
import { Switch, Route } from 'react-router-dom'
import { Index } from './components/Inicio/Index';
import { NavBar } from './components/NavBar';
import AuthServices from './services/auth-services'
import { Profile } from './components/Profile/Profile';
import ProtectedRoute from './components/protected-route'


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = { loggedInUser: null, bookId: undefined }
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

  setTheBookId = bookId => {
    console.log(bookId)
    this.setState({ bookId })
  }
  getTheBookId = () => {
    console.log(this.state.bookId)
    return this.state.bookId
  }


  render() {

    this.fetchUser()





    return (
      <main>

        <NavBar setTheBookId={this.setTheBookId} setTheUser={this.setUser} user={this.state.loggedInUser} />

        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/tales-editor" exact render={() => <TalesEditor user={this.state.loggedInUser} getTheBookId={this.getTheBookId} />} />
          <ProtectedRoute path={`/private/profile/:_id`} exact component={Profile} user={this.state.loggedInUser} setTheUser={this.setUser} />
        </Switch>

      </main>

    );
  }
}



