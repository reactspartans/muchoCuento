import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export class Index extends Component {

    render() {
        return (
            <div>
                <div className='flex-container-index'>
                    <div className="container-left-text">
                    <p className="txt-index">
                        Mucho Cuento te permite crear
                        tu propio cuento desde cero.
                        Elige tu imagen de fondo, tus
                        personajes y empieza a escribir
                        tu historia
                        </p>

                      <Link to={'/demo'} className="button-demo">Ver Demo</Link>
   
                    </div>
                    <figure >
                        <img className="img-index" src="https://res.cloudinary.com/lulas/image/upload/v1560959810/Galeria-cuentos/nin%CC%83a-en-libro.png.png" alt="imagen niña escribiendo dentro de un libro" />
                    </figure>

                </div>

            </div>

        )
    }
}