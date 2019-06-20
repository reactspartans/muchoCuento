import React, { Component } from 'react'
import GalleryServices from '../../services/profile-services'
import { SearchBooks } from './BookSearch';
import { UserInfo } from './User-info'
import { MyBooks } from './MyBooks'
import BookServices from '../../services/book-service'
import { Redirect } from 'react-router-dom'




export class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user_id: this.props.loggedInUser._id,
            profilePhoto: this.props.loggedInUser.profilePhoto,
            username: this.props.loggedInUser.username,
            email: this.props.loggedInUser.email,
            password: this.props.loggedInUser.password,
            redirect: false,
            redirectEdit: false,
            theBookId: ''
        }
        this.services = new GalleryServices()
        this.services = new BookServices()
        console.log(this.props.match.params._id)
    }


    // componentDidMount(){

    //     this.services.getUserBook(this.props.loggedInUser._id)
    //         .then(theBooks=>this.setState({ Books: theBooks}))
    // }

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

    getRed = (thing) => {
        this.setState({
            redirect: thing
        })

    }

     getRedEdit = (thing) => {
        this.setState({
            redirectEdit: thing
        })

    }

    render() {

        return (

            <div>
                {this.state.redirectEdit && <Redirect to={`/tales-editor/${this.state.redirectEdit}`} />}
                {this.state.redirect && <Redirect to={`/cuentos/tales-viewer/${this.state.redirect}`} />}
               <div className='top-profile'> 
                <h3>Bienvenido, {this.props.loggedInUser.username}</h3>
                <SearchBooks />
                </div>
                <div className='user-info profile'>
                    <UserInfo user={this.state} close={this.handleClose} />
                    <div className='mybooks-cards'>
                        <h4>Mis cuentos</h4>
                        
                            <MyBooks  user={this.props.loggedInUser._id} redir={this.getRed} getRedEdit={this.getRedEdit} />

                    </div>         
                </div>
            </div>

        )
    }

}