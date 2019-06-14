import React, { Component } from 'react';
import { TaleImage } from './TaleImage'
import { Stage, Layer } from 'react-konva';

import { FormDesign, FormSave } from '../stateful/form'
import TaleText from './TaleText'
import GalleryServices from '../../../services/galeria-service'
import BookServices from '../../../services/book-service'





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


  addNewImg = (image, status) => {
    let _page = { ...this.state.page }
    if (status === 'background') {
      _page.imageBackground = image
    } else if (status === 'character') {
      _page.imageCharacter.push(image)
    } else {
      _page.texts.push(image)
    }


    console.log(image, _page, "he llegado al back!")

    this.setState({
      page: _page
    })
  }

  saveImageToPage = (ImageState, status) => {
    this.services.postImagePage(ImageState)
    console.log(ImageState, 'estoy gurdando esto')
  }

  saveTextToPage = TextState => {
    console.log('entro en services')
    this.servicesBook.postNewText(TextState)

    console.log(TextState, 'estoy guardando el texto')

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
        <FormSave go={this.go} />

        <Stage width={window.innerWidth} height={window.innerHeight}>
          {/* <Layer >
        
         <TaleImage key={i} src={elm} go={this.state.go} goFunction={this.go} salvarImagen={this.saveImageToPage} status={"background"} />
          
       
        </Layer> */}
          <Layer >
            <TaleImage src={this.state.page.imageBackground} go={this.state.go} goFunction={this.go} salvarImagen={this.saveImageToPage} status={"background"} />

            {this.state.page.imageCharacter.map((img, idx) => {
              return <TaleImage key={idx} src={img} go={this.state.go} goFunction={this.go} salvarImagen={this.saveImageToPage} status={"character"} />
            })}

            {this.state.page.texts.map((text, i) => {

              return <TaleText key={i} text={text} color={this.state.page.taleTextColor} goFunction={this.state.go} saveText={this.saveTextToPage} />
            })}
          </Layer>
        </Stage>

      </div>

    );
  }
}