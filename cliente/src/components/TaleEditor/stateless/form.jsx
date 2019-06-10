import React, {Component} from 'react'

export class Form extends Component{
    constructor(props){
        super(props)
        this.state={
            imageURL: ''
        }
    }

    handleChange= e=>{
        const{name, value}= e.target
        this.setState({
            [name]: value
        })
        console.log(this.state.imageURL + 'vengo del handleChange')
    }

    handleSubmit=e=>{
        e.preventDefault()
        this.props.nuevaImg(this.state.imageURL)
        this.setState({imageURL: ''})
        console.log(this.state.imageURL + 'vengo del handleSubmit')
    }


    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="text" name="imageURL" id="imageURL" value={this.state.imageURL} onChange={this.handleChange}/>
                <button>Súbeme</button>
            </form>
        )
    }


}