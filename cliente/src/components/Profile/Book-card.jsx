import React from 'react'
import {Button} from 'react-bootstrap'


export const BookCard = (props) =>{
    return(
        <div className="card-image">
        <article className="card">
          <header className="card-body">
            <h5 className="card-title">{props.name}</h5>
            <Button variant="outline-success">Leer cuento</Button>
          </header>
        </article>
        </div>
    )
}