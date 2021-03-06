import React, { Component } from 'react';
import { TaleImage } from './TaleImage'
import { Stage, Rect, Layer, Group } from 'react-konva';

import { FormDesign, FormSave } from '../stateful/form'
import TaleText from './TaleText'
import GalleryServices from '../../../services/galeria-service'
import BookServices from '../../../services/book-service'
// import Konva from 'konva';
import TransformerComponent from '../stateless/TransformerComp'



const RectBackgroundStage = () => (
  <Rect

    // x={60}
    // y={120}
    width={window.innerWidth / 1.2}
    height={window.innerHeight / 1.2}
    fill="white"
  // draggable
  />
);


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
    // console.log('las props', this.props)
    // console.log(e.target._id)
    this.setState({
      selectedShapeName: e.target.name()
    });
  };


  addNewImg = (image, status) => {
    let _page = { ...this.state.page }
    console.log("LA IMAGEN");
    console.log(image);
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
  //asignar el id del libro a la pagina

  /* addBookId = book_id => {

    let _page = { ...this.state.page }
    _page.book = book_id
    this.setState({
      page: _page
    })
  } */

  //SALVAR IMAGENES A SU MODELO DE IMAGEPAGE PARA PODER LUEGO EDITARLAS
  saveImageToPage = (ImageState, status) => {
    // console.log(ImageState, 'guardando imagen de la pagina con su posicion')
    this.services.postImagePage(ImageState)
      .then(imageCreated => {
        imageCreated.crossOrigin = "anonymous"
        if (imageCreated.status === "background") {
          this.setState({ pageToSave: { ...this.state.pageToSave, imageBackground: imageCreated._id } })
        } else {
          const newArr = [...this.state.pageToSave.imageCharacters]
          // console.log(imageCreated._id, '-------------personajes id----------')
          newArr.push(imageCreated._id)
          // console.log(newArr, '-------------------array id personajes---------')
          // console.log(this.state.pageToSave)
          // console.log(this.props.bookId)
          this.setState({ pageToSave: { ...this.state.pageToSave, imageCharacters: newArr } })

        }
        // console.log(imageCreated)
      })

  }

  //SALVAR LOS TEXTOS EN EL MODELO TEXTPAGE PARA PODER EDITARLOS
  saveTextToPage = TextState => {
    console.log(TextState, 'entro en services')
    // console.log(this.props)
    this.servicesBook.postNewText(TextState)
      .then(textCreated => {
        const newArr = [...this.state.pageToSave.texts]
        newArr.push(textCreated._id)
        // console.log(newArr)
        this.setState({ pageToSave: { ...this.state.pageToSave, texts: newArr } })

      })


  }
  //SALVAR PAGINA CON LOS IDS DE LOS COMPONENTES (PARA EDITAR CUENTO)
  savePage = () => {

    setTimeout(() => {
      // console.log(this.state)

      // console.log("salvado de pagina", this.state.pageToSave)
      const _pageToSave = { ...this.state.pageToSave };
      _pageToSave.bookId = this.props.getTheBookId|| this.props.match.params.id 
      this.savePageImage()
        .then(() => {
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

        })

      // console.log(_pageToSave)
      // console.log("===================================================================================")
    }, 3000)

  }



  go = res => {
    // console.log('me ejecuto')
    this.setState({ go: res })
  }


  //FUNCION PARA PUSHEAR LAS IMAGENES COMPUESTAS DE LA PAGINA EN EL MODELO LIBRO
  PageImageToBook = (img) => {
    let initialLength = this.state.book.pagesToView.length
    // console.log("ENTROOOOOOOOOOOOOOOOOOOOOOOOO")

    let pages = [...this.state.book.pagesToView]
    // console.log(img, pages[pages.length - 1])
    // console.log(img === pages[pages.length - 1])
    pages.push(img)
    this.setState({
      book: {
        ...this.state.book,
        pagesToView: pages
      }
    })
    return initialLength
    // console.log(img, this.state.book)
  }

  //GUARDAR IMAGEN EN CLOUDINARY
  handleFileUpload = (e) => {

    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);

    this.setState({
      data: uploadData,

    })
    // console.log(uploadData, '========handleUpload')
    // console.log(this.props.status, 'status=============')

    // console.log(this.state)
  }

  //SALVAR LA COMPOSICION DE LA PAGINA EN UNA IMAGEN, SUBIRLA A CLOUDINARY Y GUARDARLA EN MODELO BOOK
  savePageImage = () => {

    //FUNCIÓN POR SI QUEREMOS DESCARGAR LAS IMÄGENES AL ORDENADOR
    // function downloadURI(uri, name) {
    //   var link = document.createElement('a');
    //   link.download = name;
    //   link.href = uri;
    //   document.body.appendChild(link);
    //   link.click();
    //   document.body.removeChild(link);
    // }

    function dataURLtoFile(dataurl, filename) {
      console.log(dataurl, filename)
      var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    }

    const stage = this.refs.stage.getStage()
    // console.log(stage);
    console.log(stage.toDataURL())
    const test = stage.toDataURL({ pixelRatio: 2 })

    //Usage example:
    var file = dataURLtoFile(test, 'crisylu');
    // console.log(file);
    // LLAMADA FUNCIÓN DESCARGAR: downloadURI(test, 'stage.png');

    const uploadPageData = new FormData();
    uploadPageData.append("imageUrl", file)
    // console.log(file);
    return this.servicesBook.UploadPage(uploadPageData)
      .then(response => {

        console.log(response, 'upload imagen composicion editor ================')



        // this.PageImageToBook(response)




        // let promise = new Promise((resolve, reject) => {
        //   console.log(response, 'en promesa---------------------')
        //   while (this.PageImageToBook(response) === this.state.book.pagesToView.length) {
        //     console.log(this.PageImageToBook(response) === this.state.book.pagesToView.length)
        //     console.log("Waiting")
        //   }
        //   resolve("ha acabado")
        // })

        // promise.then(res => {
        //   console.log(res, 'respuesta promesa************************')
        //   console.log(this.props.getTheBookId|| this.props.match.params.id, 'book id')
        //   console.log(this.state.book.pagesToView, 'para mandar a updateBook^^^^^^^^^^^^^^^^^^^^')



        return this.servicesBook.UpdateBook(response, this.props.getTheBookId|| this.props.match.params.id)
          .then(updatedBook => console.log(updatedBook, '-----------------respuesta back updateBook'))
          .catch(err => console.log(err))
        // })

      })
      .catch(err => console.log('Error', err))
    // NOTA SUBIR ESTO A CLOUDINARY Y GUARDAR LA URL DE LA IMAGEN RESULTANTE EN EL ARRAY 
    // DE IMÁGENES DE PÁGINAS DEL MODELO DE BOOK 


    //NOTA 3  MIRAR CÓMO BORRAR IMÁGENES Y TEXTOS CUANDO TE ARREPIENTES
  }


  random() { Math.random().toString() }
  randomBis = (Math.random() * (900 - 200) + 200).toString()

  textStyle() {
    const zRand = Math.floor((Math.random() * (900 - 200) + 200)).toString()

    return `z-index: ${zRand}`
  }






  render() {

    // console.log(this.state.page.imageCharacter.length === 1 ? this.state.page.imageCharacter[0] : "")

    return (
      <div className="flex-editor" >
        {/* {console.log(this.state.page, "statepage")} */}
        <div>
          < FormDesign nuevaImg={this.addNewImg} />
          <FormSave go={this.go} savePage={this.savePage} saveToBook={this.savePageImage} />
        </div>
        <Stage className="stage" width={window.innerWidth / 1.2} height={window.innerHeight / 1.2} ref="stage" onClick={this.handleStageClick}>
          {/* ref={node => this.stage = node} */}
          <Layer  >
            <RectBackgroundStage />
            <Group ref="grupito" >

              {this.state.page.imageBackground ?
                <TaleImage key={this.state.page.imageBackground} selected={this.state.selectedShapeName} name='gaby' src={this.state.page.imageBackground} go={this.state.go} goFunction={this.go} salvarImagen={this.saveImageToPage} status={"background"} />
                :
                null
              }
              {/* {this.state.page.imageCharacter.map((img, idx) => {
                return <TaleImage name={this.random} key={idx} src={img} go={this.state.go} goFunction={this.go} salvarImagen={this.saveImageToPage} status={"character"} />
              })} */}
              {
                this.state.page.imageCharacter.map((e,i) => (
                  <TaleImage 
                  key={e} 
                  selected={this.state.selectedShapeName} 
                  name={e} 
                  src={e} 
                  go={this.state.go} 
                  goFunction={this.go} 
                  salvarImagen={this.saveImageToPage} status={"character"} />
                ))
              }
              {/* {this.state.page.imageCharacter[0] && <TaleImage key="img1" selected={this.state.selectedShapeName} name={'pipa'} src={this.state.page.imageCharacter[0]} go={this.state.go} goFunction={this.go} salvarImagen={this.saveImageToPage} status={"character"} />}
              {this.state.page.imageCharacter[1] && <TaleImage key="img2" selected={this.state.selectedShapeName} name={'pepe'} src={this.state.page.imageCharacter[1]} go={this.state.go} goFunction={this.go} salvarImagen={this.saveImageToPage} status={"character"} />}
              {this.state.page.imageCharacter[2] && <TaleImage key="img3" selected={this.state.selectedShapeName} name={'pepona'} src={this.state.page.imageCharacter[2]} go={this.state.go} goFunction={this.go} salvarImagen={this.saveImageToPage} status={"character"} />}
              {this.state.page.imageCharacter[3] && <TaleImage key="img4" selected={this.state.selectedShapeName} name={'pepona'} src={this.state.page.imageCharacter[3]} go={this.state.go} goFunction={this.go} salvarImagen={this.saveImageToPage} status={"character"} />} */}

              {/* {this.state.page.texts.map((text, i) => <TaleText style={this.textStyle()} name={this.random+2} key={i+4} text={text} go={this.state.go} color={this.state.page.taleTextColor} goFunction={this.go} saveText={this.saveTextToPage} />)} */}

              <TaleText selected={this.state.selectedShapeName} name={'ger'} text={this.state.page.texts[0]} go={this.state.go} color={this.state.page.taleTextColor} goFunction={this.go} saveText={this.saveTextToPage} />
              <TaleText selected={this.state.selectedShapeName} name={'pepito'} text={this.state.page.texts[1]} go={this.state.go} color={this.state.page.taleTextColor} goFunction={this.go} saveText={this.saveTextToPage} />
              <TaleText selected={this.state.selectedShapeName} name={'david'} text={this.state.page.texts[2]} go={this.state.go} color={this.state.page.taleTextColor} goFunction={this.go} saveText={this.saveTextToPage} />
              <TaleText selected={this.state.selectedShapeName} name={'manu'} text={this.state.page.texts[3]} go={this.state.go} color={this.state.page.taleTextColor} goFunction={this.go} saveText={this.saveTextToPage} />
              <TaleText selected={this.state.selectedShapeName} name={'noah'} text={this.state.page.texts[4]} go={this.state.go} color={this.state.page.taleTextColor} goFunction={this.go} saveText={this.saveTextToPage} />
              <TaleText selected={this.state.selectedShapeName} name={'guille'} text={this.state.page.texts[5]} go={this.state.go} color={this.state.page.taleTextColor} goFunction={this.go} saveText={this.saveTextToPage} />
              <TaleText selected={this.state.selectedShapeName} name={'oli'} text={this.state.page.texts[6]} go={this.state.go} color={this.state.page.taleTextColor} goFunction={this.go} saveText={this.saveTextToPage} />
              <TaleText selected={this.state.selectedShapeName} name={'olivia'} text={this.state.page.texts[7]} go={this.state.go} color={this.state.page.taleTextColor} goFunction={this.go} saveText={this.saveTextToPage} />



              <TransformerComponent selectedShapeName={this.state.selectedShapeName} />

            </Group>
          </Layer>
        </Stage>

      </div>

    );
  }
}