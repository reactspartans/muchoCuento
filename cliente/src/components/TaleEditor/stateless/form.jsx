import React, {Component} from 'react'


export class Form extends Component{
    constructor(props){
        super(props)
        this.state={
            page:{
                backImageURL: "",
                characterImageURL: "",
                taleText: "",
                taleTextColor: "#000"

            }
        }
    }
    handleChange = e => {
        const { name, value } = e.target
        this.setState({
            page: {
                ...this.state.page,
                [name]: value
            }
        },() => console.log(this.state.page + 'soy handleChange'))
        console.log(this.state + 'ikjnmln')    
    }
    

    handleSubmit=e=>{
        
        e.preventDefault()
        console.log(this.state.page + '    vengo del handleSubmit')
        console.log(this.state.page, this.state.page.backImageURL, "soy el de teo")

        this.props.nuevaImg(this.state.page)
        
        this.setState({
            page:{
                backImageURL: "",
                characterImageURL: "",
                taleText: ""
            }
        })
    }



    render(){
        return(
            <form onSubmit={this.handleSubmit} className='toolbar'>

                <input type="text" name="backImageURL" id="backImageURL" placeholder='Pega la URL' value={this.state.page.backImageURL} onChange={this.handleChange}/> <br/>  
                <button>{this.props.buttonText}</button><br/>
                
                
                <input type="text" name="characterImageURL" id="characterImageURL" placeholder='Pega la URL' value={this.state.page.characterImageURL} onChange={this.handleChange}/><br/>
                <button>{this.props.buttonText}</button><br/>
                
                <input type="text" name="taleText" id="taleText" placeholder='Escribe tu cuento' value={this.state.page.taleText} onChange={this.handleChange}/><br/>
                <button>{this.props.buttonText}</button><br/>
                
                
                <input type="color" name="taleTextColor" id="taleTextColor" value={this.state.page.taleTextColor} onChange={this.handleChange}/><br/>
                <button>{this.props.buttonText}</button><br/>

            </form>
        )
    }


}