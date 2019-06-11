import React, { Component } from 'react';
import {TaleImage} from './TaleImage'
import { Stage, Layer } from 'react-konva';
import Book from '../../../book.json'
import {Form} from '../stateless/form'

export class TalesEditor extends Component {
    constructor(){
        super()
        this.state={
            page: Book
        }
    }
    addNewImg=image=>{
        const _page={...this.state.page}
        console.log(_page)
        _page.backImageURL.push(image)
        this.setState({
            page:_page,
        })
        console.log(this.state.page + 'vengo del addNewImage')
    }

    render() {
      return (
        <div>
            {console.log(this.state.page)}
            <Form nuevaImg={this.addNewImg} buttonText={'Sube un fondo'}/>
            <Form nuevaImg={this.addNewImg} buttonText={'Sube un personaje'}/>
            
            <Stage width={window.innerWidth} height={window.innerHeight}>
              <Layer >
                <TaleImage src={this.state.page.backImageURL[0]} />
                <TaleImage src={this.state.page.backImageURL[1]} />

              </Layer>
            </Stage>

        </div>
        
      );
    }
}