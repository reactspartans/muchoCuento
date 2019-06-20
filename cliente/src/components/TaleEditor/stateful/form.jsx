import React, { Component } from 'react'
import GalleryServices from '../../../services/galeria-service'
import { ModalGallery } from './gallerySelect'
import BookServices from '../../../services/book-service'

export class FormDesign extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imageURL: "",
            imageURLChar: '',
            taleText: "",
            taleTextColor: "",
            status: ""
        }

        this.services = new GalleryServices()
        this.servicesBook = new BookServices()
    }

    handleChange = e => {
        const { name, value } = e.target
        this.setState({

            [name]: value

        }, () => console.log(this.state + 'soy handleChange'))
        // console.log(this.state + 'sigo siendo handleChange')
    }

    handleFileUpload = (e) => {

        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);

        this.setState({
            data: uploadData,
        })
        // console.log(this.props.status, '=======fileUpload Gallery==========')

        // console.log(this.state)

    }


    // handleFileCharacterUpload = e => {

    //     const uploadData = new FormData();
    //     uploadData.append("imageUrl", e.target.files[0]);
    //     console.log(e.target.files[0])
    //     this.services.handleUpload(uploadData)
    //         .then(response => {
    //             console.log(response.data[0].imageURL)
    //             this.setState({
    //                 characterImageURLBack: response.data[0].imageURL

    //             })
    //             console.log(this.state.imageURLBack)
    //         })
    //         .catch(err => console.log(err))
    // }


    handleSubmit = (e) => {
        // console.log('yo soy el primero de handleSubmit  ' + this.state.data[0] + 'en medio data')
        e.preventDefault()
        // console.log("===========================")
        this.services.handleUpload(this.state.data, "background")
            .then(response => {
                // console.log(response, 'estoy en el then de services')
                this.props.nuevaImg(response.imageURL, 'background')

                // console.log(status, 'soy el status')
                this.setState({
                    imageURLBack: response.imageURL
                })
            })
            .catch(err => console.log(err))
    }





    handleSubmitChar = (e) => {
        // console.log('yo soy el primero de handleSubmitCHAR  ' + this.state.data + 'en medio data')
        e.preventDefault()

        this.services.handleUpload(this.state.data, "character")
            .then(response => {
                // console.log(response, 'estoy en el then de services')

                this.props.nuevaImg(response.imageURL, 'character')

                // console.log(response.imageURL, 'yo tb estoy en el then, pero despues')
                this.setState({
                    imageURLCharDos: response.imageURL
                })
            })
            .catch(err => console.log(err))

        // console.log(this.state, this.state.imageURLCharDos, "soy el de teo 2")

    }


    handleSubmitText = (e) => {
        // console.log('yo soy el primero de handleSubmitText  ' + this.state.data + 'en medio data')
        e.preventDefault()

        // this.servicesBook.postNewText(this.state.taleText)
        //     .then(response => {
        //         console.log(response, 'estoy en el then de services')

        this.props.nuevaImg(this.state.taleText)

        // console.log(status, 'soy el status')
        this.setState({
            taleText: ''
        })
        // })
        // .catch(err => console.log(err))
    }







    render() {
        return (

            <div className='toolvar-div'>

                <form onSubmit={(e) => this.handleSubmit(e)} className='toolbar'>
                    {/* <label for="imageURL" className="toolbar-file"> */}
                    <input onChange={this.handleFileUpload} type="file" name="imageURL" id="imageURL" placeholder='Pega la URL' value={this.state.imageURL} status='background' /> <br />
                     {this.state.data && <button className="button-add-image">Añadir fondo</button>}
                     {/* </label> */}


                    <ModalGallery nuevaImg={this.props.nuevaImg} status="background" go={this.state.go} goFunction={this.go} />
                </form>


                <form onSubmit={(e) => this.handleSubmitChar(e)} className='toolbar'>
                     {/* <label for="imageURLChar" className="toolbar-file"> */}
                    <input type="file" name="imageURLChar" id="imageURLChar" placeholder='Pega la URL' value={this.state.imageURLChar} onChange={this.handleFileUpload} status='character' /><br />
                     {this.state.data && <button className="button-add-image">Añadir personaje</button>}
                    {/* </label> */}
                    <ModalGallery nuevaImg={this.props.nuevaImg} go={this.state.go} goFunction={this.go} status='character' />
                </form>

                <form onSubmit={(e) => this.handleSubmitText(e, "taleText")} className='toolbar'>

                    <input type="text" name="taleText" id="taleText" placeholder='Escribe tu cuento' value={this.state.taleText} onChange={this.handleChange} /><br />
                   {this.state.data && <button>Escribe tu cuento</button>}

                </form>
{/* 
                <form className='toolbar'>

                    <input type="color" name="taleTextColor" id="taleTextColor" value={this.state.taleTextColor} onChange={this.handleChange} /><br />
                    <button>Elige color del texto</button><br />
                </form> */}

            </div>
        )
    }
}







export class FormSave extends Component {
    constructor(props) {
        super(props)
        this.services = new GalleryServices()

    }



    handleSubmit = e => {
        e.preventDefault()
        // console.log('llega a submit form')
        this.props.savePage()
        this.props.go(true)

        // console.log('ejecuto go')
        // this.props.saveToBook()
    }




    render() {
        return (
            <form onSubmit={this.handleSubmit} className='toolbar'>
                <button  className="button-save">Guarda tu cuento</button>
            </form>
        )
    }
}

