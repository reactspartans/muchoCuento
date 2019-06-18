import React, { Component } from 'react'
import { Rectangulo } from '../pruebaCuadrados'
export class Index extends Component {

    render() {
        return (
            <div>
                <div className='explain-book'>
                    <figure >
                        <img src="https://res.cloudinary.com/lulas/image/upload/v1560246748/ilustraciones/fondos%20paisajes/montan%CC%83as-tonos-naranja_labxqa.jpg" alt="montañas" />
                    </figure>

                </div>
                <Rectangulo />
            </div>

        )
    }
}