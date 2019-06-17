import React, { Component } from 'react'
import GalleryServices from '../../services/profile-services'
import { SearchBooks } from './BookSearch';
import { UserInfo } from './User-info'
import { Button } from 'react-bootstrap'

export class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: this.props.loggedInUser._id,
            profilePhoto: this.props.loggedInUser.profilePhoto,
            username: this.props.loggedInUser.username,
            email: this.props.loggedInUser.email,
            password: this.props.loggedInUser.password,
            show: false
        }
        this.services = new GalleryServices()
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

    handleShow = () => {
        this.setState({
            show: true
        })
    }


    handleClose = () => {
        this.setState({
            show: false
        })
    }

    render() {
        // console.log(this.props.loggedInUser.profilePhoto)
        return (
            <div>
            <h1>Bienvenido, {this.props.loggedInUser.username}</h1>
            <div className='user-info'>
                
                <Button className='horror-button'onClick={this.handleShow}>Información de usuario</Button>
                {this.state.show ? <UserInfo user={this.state} close={this.handleClose}/> : null}
              
                <SearchBooks />
            </div>
            </div>

        )
    }
}