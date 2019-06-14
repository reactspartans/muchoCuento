import React, { Component } from 'react'
import GalleryServices from '../../../services/galeria-service'
import { ModalGallery } from './gallerySelect'

export class FormDesign extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imageURL: '',
            imageURLChar:''
        }

        this.services = new GalleryServices()
    }

    handleChange = e => {
        const { name, value } = e.target
        this.setState({

            [name]: value

        }, () => console.log(this.state + 'soy handleChange'))
        console.log(this.state + 'sigo siendo handleChange')
    }

    handleFileUpload = e => {

        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);

        this.setState({
            data: uploadData
        })

        console.log(this.state)

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
        console.log('yo soy el primero de handleSubmit  ' + this.state.data[0] + 'en medio data')
        e.preventDefault()

        this.services.handleUpload(this.state.data)
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

        this.services.handleUpload(this.state.data, )
            .then(response => {
                console.log(response, 'estoy en el then de services')

                this.props.nuevaImg( response.imageURL, 'character')

                console.log(response.imageURL, 'yo tb estoy en el then, pero despues')
                this.setState({
                    imageURLCharDos: response.imageURL
                })
            })
            .catch(err => console.log(err))

        console.log(this.state, this.state.imageURLCharDos , "soy el de teo 2")

    }



    render() {
        return (

            <div>

                <form onSubmit={(e) => this.handleSubmit(e, "imageURL", 'background')} className='toolbar'>
                    <input onChange={this.handleFileUpload} type="file" name="imageURL" id="imageURL" placeholder='Pega la URL' value={this.state.imageURL} status='background'/> <br />
                    <button>Añadir fondo</button><br />

                </form>


                <form onSubmit={(e) => this.handleSubmitChar(e, "imageURL")} className='toolbar'>

                    <input type="file" name="imageURLChar" id="imageURLChar" placeholder='Pega la URL' value={this.state.imageURLChar} onChange={this.handleFileUpload} status='character'/><br />
                    <button>Añadir personaje</button><br />
                </form>

                {/* <form onSubmit={(e) => this.handleSubmit(e, "taleText")} className='toolbar'>

<input type="text" name="taleText" id="taleText" placeholder='Escribe tu cuento' value={this.state.page.taleText} onChange={this.handleChange} /><br />
<button>Escribe tu cuento</button><br />

</form>

<form onSubmit={(e) => this.handleSubmit(e, "taleTextColor")} className='toolbar'>


<input type="color" name="taleTextColor" id="taleTextColor" value={this.state.page.taleTextColor} onChange={this.handleChange} /><br />
<button>Elige color del texto</button><br />
</form>  */}

                <ModalGallery nuevaImg={this.props.nuevaImg} />
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
        console.log('llega a submit form')
        this.props.go(true)
        console.log('ejecuto go')
    }




    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <button>Guarda tu cuento</button>
            </form>
        )
    }
}