import React, { Component } from 'react';
import { TaleImage } from './TaleImage'
import { Stage, Layer } from 'react-konva';

import { FormDesign, FormSave } from '../stateful/form'
import TaleText from './TaleText'
import GalleryServices from '../../../services/galeria-service'





export class TalesEditor extends Component {
  constructor() {
    super()
    this.state = {
      page: {
        book: '',
        texts: [],
        imageBackground: '',
        imageCharacter: [],
        pageNumber: ''
      },
      go: false,

    }
    this.services = new GalleryServices()
  }


  addNewImg = (image) => {
    let _page = {...this.state.page} 
    _page.imageBackground = image
  
    
    console.log(image, _page, "he llegado al back!")

    this.setState({
      page: _page
    })
  }

  saveImageToPage = (ImageState) => {
    this.services.postImagePage(ImageState)
    console.log(ImageState, 'estoy gurdando esto')
  }

  go = res => {
    console.log('me ejecuto')
    this.setState({ go: res })
  }





  render() {
    return (
      <div className="flex-editor">
        {console.log(this.state.page, "statepage")}
        <FormDesign nuevaImg={this.addNewImg} />
        <FormSave go={this.go}/>

        <Stage width={window.innerWidth} height={window.innerHeight}>
        {/* <Layer >
        
         <TaleImage key={i} src={elm} go={this.state.go} goFunction={this.go} salvarImagen={this.saveImageToPage} status={"background"} />
          
       
        </Layer> */}
          <Layer >
            <TaleImage src={this.state.page.imageBackground} go={this.state.go} goFunction={this.go} salvarImagen={this.saveImageToPage} status={"background"} />
            <TaleImage src={this.state.page.imageURLChar} go={this.state.go} goFunction={this.go} salvarImagen={this.saveImageToPage} status={"character"} />
            <TaleText text={this.state.page.taleText} color={this.state.page.taleTextColor} go={this.state.go} funcion={this.funcion} />
          </Layer>
        </Stage>

      </div>

    );
  }
}