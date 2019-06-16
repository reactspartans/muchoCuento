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
    this.servicesBook = new BookServices()
  }


  addNewImg = (image, status) => {
    let _page = { ...this.state.page }
    if (status === 'background') {
      _page.imageBackground = image
    } else if (status === 'character') {
      console.log(image)
      _page.imageCharacter.push(image)
    } else {
      _page.texts.push(image)
    }

    console.log(image, _page, "he llegado al back!")

    this.setState({
      page: _page
    })
  }



  //asignar el id del libro a la pagina

  /* addBookId = book_id => {

    let _page = { ...this.state.page }
    _page.book = book_id
    this.setState({
      page: _page
    })
  } */


  saveImageToPage = (ImageState, status) => {
    console.log(ImageState, 'guardando imagen de la pagina con su posicion')
    this.services.postImagePage(ImageState)

    console.log(ImageState, 'estoy guardando esto')
  }


  saveTextToPage = TextState => {
    console.log(TextState, 'entro en services')

    this.servicesBook.postNewText(TextState)

    console.log(TextState, 'estoy guardando el texto')

  }

  savePage = page => {
    console.log(page)
    this.servicesBook.postNewPage(page)

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

            {this.state.page.texts.map((text, i) => <TaleText key={i} text={text} go={this.state.go} color={this.state.page.taleTextColor} goFunction={this.go} saveText={this.saveTextToPage} />)}
          </Layer>
        </Stage>

      </div>

    );
  }
}