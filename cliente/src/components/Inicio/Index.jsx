import React, { Component } from 'react'

export class Index extends Component {

    render() {
        return (
            <div>
                <div className='flex-container-index'>
                    <figure >
                        <p className="txt-index">
                        Mucho Cuento te permite crear
                        tu propio cuento desde cero.
                        elige tu imagen de fondo, tus 
                        personajes y empieza a escribir
                        tu historia
                        </p>        
                        <img className="img-index" src="https://res.cloudinary.com/lulas/image/upload/v1560959810/Galeria-cuentos/nin%CC%83a-en-libro.png.png" alt="imagen niña escribiendo dentro de un libro" />
                    </figure>

                </div>

            </div>

        )
    }
}