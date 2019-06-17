import React, { Component } from 'react'
import { Button } from 'react-bootstrap';






export class UserInfo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user_id: this.props.user.user_id,
            profilePhoto: this.props.user.profilePhoto,
            username: this.props.user.username,
            email: this.props.user.email,
            password: this.props.user.password,
        }
        console.log(this.props.user.user_id)
    }

    handleChange = (e) => {
        const { name, value } = e.target

        this.setState({
            [name]: value
        })
    }

    handleFileUpload = e => {

        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);

        this.setState({
            data: uploadData
        })

        // console.log(this.state)

    }


    handleSubmit = (e) => {
        e.preventDefault()
        // console.log('handleSubmit', e.target)


        this.services.uploadProfile(this.state.data)
            .then(response => {
                // console.log(response.imageURL)    
                this.setState({
                    profilePhoto: response.imageURL
                })
                this.services.updatePhoto(this.state.profilePhoto, this.state.user_id)
                    .then(res => console.log(res))
            })
    }

    render() {
        return (

            <div>
                <form onSubmit={(e) => this.handleSubmit(e, "imageURL")} className='toolbar'>
                    <input onChange={this.handleFileUpload} type="file" name="imageURL" id="imageURL" placeholder='Elige imagen' /> <br />
                    {this.state.data && <Button>Cambiar imagen de perfil</Button>}<br />
                </form>


                <form onSubmit={this.handleSubmit}>
                    <label> Cambiar nombre de usuario <br />
                        <input type="text" name='username' value={this.state.username} placeholder={this.state.username} onChange={this.handleChange} />
                    </label><br />
                    <label> Cambiar email<br />
                        <input type="text" name='email' value={this.state.email} placeholder={this.state.email} onChange={this.handleChange} />
                    </label><br />
                    <label>Cambiar contraseña<br />
                        <input type="password" name='password' value={this.state.password} placeholder='******' onChange={this.handleChange} />
                    </label>
                    <button>Guardar cambios</button>
                </form>
                <Button onClick={this.props.close}>Cerrar</Button>
            </div>
        )
    }
}







