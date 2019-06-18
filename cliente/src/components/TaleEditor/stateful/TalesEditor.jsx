import React, { Component } from 'react';
import { TaleImage } from './TaleImage'
import { Stage, Layer, Group } from 'react-konva';

import { FormDesign, FormSave } from '../stateful/form'
import TaleText from './TaleText'
import GalleryServices from '../../../services/galeria-service'
import BookServices from '../../../services/book-service'
import Konva from 'konva';





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

    }
    this.services = new GalleryServices()
    this.servicesBook = new BookServices()
  }


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
    }, 4000)

  }



  go = res => {
    // console.log('me ejecuto')
    this.setState({ go: res })
  }

  meteLaimg = (img) => {
    this.setState({
      ...this.state.book.pagesToView.push(img),

    })
    //console.log(img, this.state.book)
  }


  /* saveImagesToBook = () => {
    this.group.toImage = (img) => {
      this.meteLaimg(img)
    }

  } */

  /*   savePageImage() {
  
      let image = Stage.toImage((img) => {
  
        const newArr = [...this.state.book.pagesToView]
        newArr.push(img)
        return image
      }
      )
    } */



  render() {
    return (
      <div className="flex-editor">
        {/* {console.log(this.state.page, "statepage")} */}
        <FormDesign nuevaImg={this.addNewImg} />
        <FormSave go={this.go} savePage={this.savePage} saveToBook={this.savePageImage} />

        <Stage width={window.innerWidth / 1.2} height={window.innerHeight / 1.2} ref={node => this.stage = node}>
          <Layer  >
            <Group ref={node => this.group = node} >

              {this.state.page.imageBackground ?
                <TaleImage src={this.state.page.imageBackground} go={this.state.go} goFunction={this.go} salvarImagen={this.saveImageToPage} status={"background"} />
                :
                null
              }
              {this.state.page.imageCharacter.map((img, idx) => {
                return <TaleImage key={idx} src={img} go={this.state.go} goFunction={this.go} salvarImagen={this.saveImageToPage} status={"character"} />
              })}

              {this.state.page.texts.map((text, i) => <TaleText key={i} text={text} go={this.state.go} color={this.state.page.taleTextColor} goFunction={this.go} saveText={this.saveTextToPage} />)}
            </Group>
          </Layer>
        </Stage>
              <button type='submit' onClick={this.saveImagesToBook}>Push img</button>
      </div>

    );
  }
}