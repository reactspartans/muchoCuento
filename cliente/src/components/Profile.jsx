import React, {Component} from 'react'

export class Profile extends Component{
    constructor(props){
        super(props)
        this.state={
            profilePhoto: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/eb4e52bd-fc99-4db9-8d65-eadf01fdabbf/d38o83n-fe2ac891-3022-40d9-88fd-338c3e13d3fc.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2ViNGU1MmJkLWZjOTktNGRiOS04ZDY1LWVhZGYwMWZkYWJiZlwvZDM4bzgzbi1mZTJhYzg5MS0zMDIyLTQwZDktODhmZC0zMzhjM2UxM2QzZmMuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.FwzSQx6QReO5lD2K5Ec8AHS6VKr0zOyabBvMUc_6czM',
            username: this.props.loggedInUser.username,
            email: this.props.loggedInUser.email,
            password: this.props.loggedInUser.password,

        }
    }
    

    handleChange=(e)=>{
        const {name, value} = e.target

        this.setState({
            [name]:value
        })
    }

    handleSubmit=(e)=>{
        e.preventDefault()
        
    }

    render(){
        console.log(this.props.loggedInUser.username)
        return(
            <div>
                <h1>Bienvenido, {this.props.loggedInUser.username}</h1>
                <figure>
                    <img src={this.state.profilePhoto} alt="profile-images"/>
                </figure>
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