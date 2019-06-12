import React, { Component } from 'react'
import GalleryServices from '../../../services/galeria-service'

export class FormDesign extends Component {
    constructor(props) {
        super(props)
        this.state = {
            /*   name: String,
              tags: Array,
              status: {
                  type: String,
                  enum: ["background", "character"]
              }, */
            imageURL: String
        }

        this.services = new GalleryServices()
    }

    handleChange = e => {
        const { name, value } = e.target
        this.setState({

            [name]: value

        }, () => console.log(this.state + 'soy handleChange'))
        console.log(this.state + 'ikjnmln')
    }

    handleFileUpload = e => {

        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);
        console.log(e.target.files[0])
        this.services.handleUpload(uploadData)
            .then(response => {
                console.log(response)
                this.setState({
                    imageURLBack: response.secure_url

                })
            })
            .catch(err => console.log(err))
    }


    handleSubmit = (e, type) => {

        e.preventDefault()
        console.log(this.state + '    vengo del handleSubmit')
        console.log(this.state, this.state.imageURLBack, "soy el de teo")

        this.props.nuevaImg(this.state[type], type)

    }


    render() {
        return (

            <div>

                <form onSubmit={(e) => this.handleSubmit(e, "imageURL")} className='toolbar'>
                    {/* <input onChange={this.handleFileUpload} type="file" className="form-control" id="imageUrl" name="imageUrl" /> */}
                    <input onChange={this.handleFileUpload} type="file" name="imageURL" id="imageURL" placeholder='Pega la URL' value={this.state.imageURL} /> <br />
                    <button>Añadir fondo</button><br />

                </form>

                {/* <form onSubmit={(e) => this.handleSubmit(e, "characterImageURL")} className='toolbar'>

                    <input type="file" name="characterImageURL" id="characterImageURL" placeholder='Pega la URL' value={this.state.characterImageURL} onChange={this.handleChange} /><br />
                    <button>Añadir personaje</button><br />
                </form>

                <form onSubmit={(e) => this.handleSubmit(e, "taleText")} className='toolbar'>

                    <input type="text" name="taleText" id="taleText" placeholder='Escribe tu cuento' value={this.state.page.taleText} onChange={this.handleChange} /><br />
                    <button>Escribe tu cuento</button><br />

                </form>

                <form onSubmit={(e) => this.handleSubmit(e, "taleTextColor")} className='toolbar'>


                    <input type="color" name="taleTextColor" id="taleTextColor" value={this.state.page.taleTextColor} onChange={this.handleChange} /><br />
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
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.go()
    }




    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <button>Guarda tu cuento</button>
            </form>
        )
    }
}