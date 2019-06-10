import React, { Component } from 'react';
import './App.css';
import { TalesEditor } from './components/TaleEditor/stateful/TalesEditor';

export default class App extends Component {
    render() {
      return (
        <div>
          <TalesEditor/>
        </div>
        
      );
    }
}



