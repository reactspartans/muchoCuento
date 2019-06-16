import React, {Component} from 'react'
import GalleryServices from '../services/galeria-service'


export class Profile extends Component{
    constructor(props){
        super(props)
        this.state={
            profilePhoto: '',
            username: this.props.loggedInUser.username,
            email: this.props.loggedInUser.email,
            password: this.props.loggedInUser.password,

        }
        this.services = new GalleryServices()
    }
    

    handleChange=(e)=>{
        const {name, value} = e.target

        this.setState({
            [name]:value
        })
    }

    handleFileUpload = e => {

        const uploadData = new FormData();
        uploadData.append("imageUrl", e.target.files[0]);

        this.setState({
            data: uploadData
        })

        console.log(this.state)

    }


    handleSubmit=(e)=>{
        e.preventDefault()
        console.log('handleSubmit', e.target)
 
    
        this.services.uploadProfile(this.state.data)
            .then(response => {
                this.setState({
                    profilePhoto: response.secure_url
                    
                })
            })
            .catch(err => console.log(err))
    }
    



    render(){
        console.log(this.props.loggedInUser.username)
        return(
            <div>
                <h1>Bienvenido, {this.props.loggedInUser.username}</h1>
                <figure>
                    <img src={this.state.profilePhoto} alt="profile-images"/>
                </figure>


                <form onSubmit={(e) => this.handleSubmit(e, "imageURL")} className='toolbar'>
                    <input onChange={this.handleFileUpload} type="file" name="imageURL" id="imageURL" placeholder='Pega la URL' value={this.state.profilePhoto}  /> <br />
                    {this.state.data && <button>Añadir fondo</button>}<br />
                </form>


                <form onSubmit={this.handleSubmit}>
                    <label> Cambiar nombre de usuario <br/>
                        <input type="text" name='username' value={this.state.username} placeholder={this.state.username} onChange={this.handleChange}/>
                    </label><br/>
                    <label> Cambiar email<br/>
                        <input type="text" name='email' value={this.state.email} placeholder={this.state.email} onChange={this.handleChange}/>
                    </label><br/>
                    <label>Cambiar contraseña<br/>
                        <input type="password" name='password' value={this.state.password} placeholder='******' onChange={this.handleChange}/>
                    </label>
                    <button>Guardar cambios</button>
                </form>
            </div>

            
        )
    }
}