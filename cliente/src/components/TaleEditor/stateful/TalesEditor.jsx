import React, { Component } from 'react';
import foto from '../../../images/Emilia-Dziubak-4.jpg'
import fotito from '../../../images/niñita.jpg'
import {TaleImage} from './TaleImage'
import { Stage, Layer } from 'react-konva';



export class TalesEditor extends Component {
    render() {
      return (

        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            <TaleImage src={foto} />
            <TaleImage src={fotito} />
          </Layer>
        </Stage>
        
      );
    }
}