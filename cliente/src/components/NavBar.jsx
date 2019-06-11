import React from 'react'
import {Link} from 'react-router-dom'
import {SingUp, Login, Logout} from './Inicio/auth/logForms'


export  const NavBar =()=>{
    return(
    
        <nav>
            <h3>MuchoCuento</h3>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/tales-editor'>Create tale</Link></li>
                <li><SingUp/></li>
                <li><Login/></li>

                <li><Link to='/auth/login'>Logout</Link></li>

            </ul>
        </nav>
    )
}