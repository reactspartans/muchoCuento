import React from 'react'
import {Link} from 'react-router-dom'
import {SingUp, Login, Logout} from './Inicio/auth/logForms'
import BookForm from './BookForm'

export  const NavBar =(props)=>{

    return(
    
        <nav>
            <ul>
                <li className='lis'><Link className='links' to='/'><h3>MuchoCuento</h3></Link></li>
                <li className='lis' ><Link className='links' to='/'>Home</Link></li>
                <li className='lis'>
                <Link className='links' to='/tales-editor'>
                <BookForm/>
                </Link></li>
                <li className='lis'><SingUp setTheUser={props.setTheUser}/></li>
                <li className='lis'><Login/></li>

                <li className='lis'><Link className='links' to='/auth/login'>Logout</Link></li>

            </ul>
        </nav>
    )
}