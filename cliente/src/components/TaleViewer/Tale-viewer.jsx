import React, {Component} from 'react'
import {Stage, Layer, Image, Text} from 'react-konva'

export class TaleViewer extends Component{
    constructor(props){
        super(props)
        this.state={
            book:[]
        }
        
    }
    componentDidMount(){
        //rellenar el state con las páginas q pertenecen al book
    }


    render(){
        return(
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    {/* {this.state.map(elm =>)} */}
                </Layer>
            </Stage>
        )
    }
} 