import React, { Component } from 'react';
import './App.css';
import { TalesEditor } from './components/TaleEditor/stateful/TalesEditor';
import { Switch, Route } from 'react-router-dom'
import { Index } from './components/Inicio/Index';
import { NavBar } from './components/NavBar';
import {Login, SingUp, Logout} from './components/Inicio/auth/logForms'

export default class App extends Component {
    render() {
      return (
        <main>

          <NavBar/>

          <Switch>
            <Route path="/" exact component={Index} />
            <Route path="/tales-editor" exact component={TalesEditor} />
           
          </Switch>
        

          
        </main>
        
      );
    }
}



