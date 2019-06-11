import React, { Component } from 'react';
import {TaleImage} from './TaleImage'
import { Stage, Layer } from 'react-konva';
import Book from '../../../book.json'
import {Form} from '../stateless/form'
import TaleText from './TaleText'





export class TalesEditor extends Component {
    constructor(){
        super()
        this.state={
            page: Book
        }
    }
    addNewImg=image=>{
      let _page={...this.state.page}
      _page.backImageURL = image.backImageURL
      _page.characterImageURL = image.characterImageURL
      _page.taleText = image.taleText
      _page.taleTextColor=image.taleTextColor
      console.log(image, "he llegado al back!")
      
      this.setState({
          page: _page
        })
    }

    render() {
      return (
        <div>
            {console.log(this.state.page, "hello")}
            <Form nuevaImg={this.addNewImg} buttonText={'Crea tu página'}/>
            
            <Stage width={window.innerWidth} height={window.innerHeight}>
              <Layer >
                <TaleImage src={this.state.page.backImageURL} />
                <TaleImage src={this.state.page.characterImageURL} />
                <TaleText text={this.state.page.taleText} color={this.state.page.taleTextColor}/>
              </Layer>
            </Stage>

        </div>
        
      );
    }
}