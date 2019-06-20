import React, { Component } from 'react'
import { Button } from 'react-bootstrap';
import ProfileService from '../../services/profile-services'





export class UserInfo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user_id: this.props.user.user_id,
            profilePhoto: this.props.user.profilePhoto,
            username: this.props.user.username,
            email: this.props.user.email,
        }
        // console.log(this.props.user.user_id)
        this.services = new ProfileService()
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
        for (let prop of uploadData.entries()) {
            // console.log(prop[0])
            // console.log(prop[1])
        }

        this.setState({
            data: uploadData,
        })

    }



    handleSubmit = (e) => {
        e.preventDefault()
        this.services.uploadProfile(this.state.data, this.state.user_id)
            .then(response => {
                // console.log(response)
                this.setState({
                    ...this.state,
                    profilePhoto: response.profilePhoto
                })
            })
    }


    handleUser = e => {
        e.preventDefault()

    }


    render() {
        return (

            <div>
                <figure className='profile-photo'>
                    <img src={this.state.profilePhoto} alt="profile-images" />
                </figure>

                <form onSubmit={(e) => this.handleSubmit(e, "imageURL")} className='toolbar'>
                    <input className='upload-img' onChange={this.handleFileUpload} type="file" name="imageURL" id="imageURL" placeholder='Elige imagen' /> <br />
                    {this.state.data && <Button type='submit'>Cambiar imagen de perfil</Button>}<br />
                </form>


                {/* <form onSubmit={this.handleUser}>
                    <label> Cambiar nombre de usuario <br/>
                        <input type="text" name='username' value={this.state.username} placeholder={this.state.username} onChange={this.handleChange}/>
                    </label><br/>
                    <label> Cambiar email<br/>
                        <input type="text" name='email' value={this.state.email} placeholder={this.state.email} onChange={this.handleChange}/>
                    </label><br/>
                    <button>Guardar cambios</button>
                </form> */}
                {/* <Button onClick={this.props.close}>Cerrar</Button> */}
            </div>
        )
    }
}







