import React, { Component } from 'react';
import { TaleImage } from './TaleImage'
import { Stage, Layer, Group } from 'react-konva';

import { FormDesign, FormSave } from '../stateful/form'
import TaleText from './TaleText'
import GalleryServices from '../../../services/galeria-service'
import BookServices from '../../../services/book-service'
import Konva from 'konva';
import TransformerComponent from '../stateless/TransformerComp'





export class TalesEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: {
        book: '',
        texts: [],
        imageBackground: '',
        imageCharacter: [],
        pageNumber: ''
      },
      pageToSave: {
        bookId: "",
        texts: [],
        imageBackground: undefined,
        imageCharacters: [],
      },
      book: {
        pagesToView: []
      },
      go: false,
      selectedShapeName: ""

    }
    this.services = new GalleryServices()
    this.servicesBook = new BookServices()
  }

  handleStageClick = e => {
    console.log(e.target)
    console.log(e.target._id)
    this.setState({
      selectedShapeName: e.target.name()
    });
  };


  addNewImg = (image, status) => {
    let _page = { ...this.state.page }
    if (status === 'background') {
      _page.imageBackground = image
    } else if (status === 'character') {
      // console.log(image)
      _page.imageCharacter.push(image)
    } else {
      _page.texts.push(image)
    }

    // console.log(image, _page, "he llegado al back!")

    this.setState({
      page: _page
    })
  }

  componentDidMount() {

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
    // console.log(ImageState, 'guardando imagen de la pagina con su posicion')
    this.services.postImagePage(ImageState)
      .then(imageCreated => {
        if (imageCreated.status === "background") {
          this.setState({ pageToSave: { ...this.state.pageToSave, imageBackground: imageCreated._id } })
        } else {
          const newArr = [...this.state.pageToSave.imageCharacters]
          newArr.push(imageCreated._id)
          // console.log(newArr)
          this.setState({ pageToSave: { ...this.state.pageToSave, imageCharacters: newArr } })
        }
        // console.log(imageCreated)
      })

  }


  saveTextToPage = TextState => {
    // console.log(TextState, 'entro en services')

    this.servicesBook.postNewText(TextState)
      .then(textCreated => {
        const newArr = [...this.state.pageToSave.texts]
        newArr.push(textCreated._id)
        // console.log(newArr)
        this.setState({ pageToSave: { ...this.state.pageToSave, texts: newArr } })

      })


  }

  savePage = () => {

    setTimeout(() => {
      console.log(this.state)

      // console.log("salvado de pagina", this.state.pageToSave)
      const _pageToSave = { ...this.state.pageToSave };
      _pageToSave.bookId = this.props.getTheBookId

      this.savePageImage()

      // console.log(_pageToSave)
      // console.log("===================================================================================")
      this.servicesBook.postNewPage(_pageToSave)
        .then(res => {
          //console.log("--------------SAVE PAGE----------------")
          //console.log(res)
          this.setState({
            page: {
              book: '',
              texts: [],
              imageBackground: "",
              imageCharacter: [],
              pageNumber: ''
            },
            pageToSave: {
              bookId: "",
              texts: [],
              imageBackground: undefined,
              imageCharacters: [],
            },
          })

        })
    }, 3000)

  }



  go = res => {
    // console.log('me ejecuto')
    this.setState({ go: res })
  }

  // PageImageToBook = (img) => {
  //   this.setState({
  //     ...this.state.book.pagesToView.push(img),

  //   })
  //console.log(img, this.state.book)
  // }

  handleFileUpload = (e) => {

    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);

    this.setState({
      data: uploadData,

    })
    console.log(this.props.status)

    // console.log(this.state)
  }

  savePageImage() {

    //FUNCIÓN POR SI QUEREMOS DESCARGAR LAS IMÄGENES AL ORDENADOR
    // function downloadURI(uri, name) {
    //   var link = document.createElement('a');
    //   link.download = name;
    //   link.href = uri;
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    // }


    const stage = this.refs.stage.getStage()
    const test = stage.toDataURL({ pixelRatio: 2 })
    // LLAMADA FUNCIÓN DESCARGAR: downloadURI(test, 'stage.png');
    console.log(this.state.data)
    this.servicesBook.handleFileUpload(this.state.data, "character")
      .then(response => {
        console.log(response, 'estoy en el then de services')
        console.log(test)
          //setstate

          .catch(err => console.log('Error', err))
      })
    // NOTA SUBIR ESTO A CLOUDINARY Y GUARDAR LA URL DE LA IMAGEN RESULTANTE EN EL ARRAY 
    // DE IMÁGENES DE PÁGINAS DEL MODELO DE BOOK 

    // NOTA 2 IMÁGENES DE BACKGROUND QUE SE SUBEN DOBLES

    //NOTA 3  MIRAR CÓMO BORRAR IMÁGENES Y TEXTOS CUANDO TE ARREPIENTES
  }







  render() {
    return (
      <div className="flex-editor" >
        {/* {console.log(this.state.page, "statepage")} */}
        < FormDesign nuevaImg={this.addNewImg} />
        <FormSave go={this.go} savePage={this.savePage} saveToBook={this.savePageImage} />

        <Stage width={window.innerWidth / 1.2} height={window.innerHeight / 1.2} ref="stage" onClick={this.handleStageClick}>
          {/* ref={node => this.stage = node} */}
          <Layer  >
            <Group ref="grupito" >

              <TaleImage src={this.state.page.imageBackground} go={this.state.go} goFunction={this.go} salvarImagen={this.saveImageToPage} status={"background"} />

              {this.state.page.imageBackground ?
                <TaleImage src={this.state.page.imageBackground} go={this.state.go} goFunction={this.go} salvarImagen={this.saveImageToPage} status={"background"} />
                :
                null
              }
              {this.state.page.imageCharacter.map((img, idx) => {
                return <TaleImage key={idx} src={img} go={this.state.go} goFunction={this.go} salvarImagen={this.saveImageToPage} status={"character"} />
              })}

              {this.state.page.texts.map((text, i) => <TaleText key={i} text={text} go={this.state.go} color={this.state.page.taleTextColor} goFunction={this.go} saveText={this.saveTextToPage} />)}

              <TransformerComponent
                selectedShapeName={this.state.selectedShapeName} />
            </Group>
          </Layer>
        </Stage>
        <button type='submit' onClick={this.saveImagesToBook}>Push img</button>
      </div>

    );
  }
}