import React, { Component } from 'react';
import foto from '../../../images/Emilia-Dziubak-4.jpg'
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
        _page.imageURL.push(image)
        this.setState({
            page:_page,
        })
        console.log(this.state.page + 'vengo del addNewImage')
    }

    render() {
      return (
        <div>
            {console.log(this.state.page)}
            <Form nuevaImg={this.addNewImg}/>
            <Stage width={window.innerWidth} height={window.innerHeight}>
              <Layer>
                <TaleImage src={this.state.page.imageURL[0]} />
              </Layer>
            </Stage>

        </div>
        
      );
    }
}