import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { SingUp, Login } from './Inicio/auth/logForms'
import BookForm from './Inicio/BookForm'
import Button from 'react-bootstrap/Button'
import AuthServices from '../services/auth-services'




export class NavBar extends Component {

    constructor(props) {
        super(props)
        this.service = new AuthServices()
    }

    logout = () => {
        this.service.logout()
            .then(x => {
                // console.log('logged out')
                this.props.setTheUser(null)
            })
    }

    render() {
        return (

            <nav>
                <ul>
                    <li className='lis'><Link className='links' to='/'><h3>MuchoCuento</h3></Link></li>
                    <li className='lis' ><Link className='links' to='/'><Button>Home</Button></Link></li>

                    {this.props.user ?
                        <li className='lis'><BookForm setTheBookId={this.props.setTheBookId} /></li> : null}


                    {this.props.user ? <li className='lis'><Button onClick={this.logout}>Logout </Button></li> :

                        <li className='lis'><SingUp setTheUser={this.props.setTheUser} /> <Login setTheUser={this.props.setTheUser} /> </li>
                    }

                    {this.props.user ? <li> <Link to={`/prof/private/profile/${this.props.user._id}`} className='links'> Perfil</Link> </li> : null}





                </ul>
            </nav>
        )
    }
}