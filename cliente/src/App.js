import React, { Component } from 'react';
import './App.css';
import { Stage, Layer } from 'react-konva';
import {URLImage} from './components/prueba'
import foto from './images/Emilia-Dziubak-4.jpg'
import fotito from './images/niñita.jpg'

export default class App extends Component {
    render() {
      return (
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            <URLImage src={foto} />
            <URLImage src={fotito} />
          </Layer>
        </Stage>
        
      );
    }
}



