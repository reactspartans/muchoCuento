import React, {Component} from 'react'


export class FormDesign extends Component{
    constructor(props){
        super(props)
        this.state={
            page:{
                backImageURL: "",
                characterImageURL: "",
                taleText: "",
                taleTextColor: ""

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
    

    handleSubmit=(e, type)=>{
        
        e.preventDefault()
        console.log(this.state.page + '    vengo del handleSubmit')
        console.log(this.state.page, this.state.page.backImageURL, "soy el de teo")

        this.props.nuevaImg(this.state.page[type], type)
        
    }



    render(){
        return(

            <div>
            
                <form onSubmit={(e) => this.handleSubmit(e, "backImageURL")} className='toolbar'>

                    <input type="text" name="backImageURL" id="backImageURL" placeholder='Pega la URL' value={this.state.page.backImageURL} onChange={this.handleChange}/> <br/>  
                    <button>Añadir fondo</button><br/>

                </form>

                <form onSubmit={(e) => this.handleSubmit(e, "characterImageURL")} className='toolbar'>

                     <input type="text" name="characterImageURL" id="characterImageURL" placeholder='Pega la URL' value={this.state.page.characterImageURL} onChange={this.handleChange}/><br/>
                     <button>Añadir personaje</button><br/>
                </form>    

                <form onSubmit={(e) => this.handleSubmit(e, "taleText")} className='toolbar'>

                     <input type="text" name="taleText" id="taleText" placeholder='Escribe tu cuento' value={this.state.page.taleText} onChange={this.handleChange}/><br/>
                     <button>Escribe tu cuento</button><br/>
            
                </form>

                <form onSubmit={(e) => this.handleSubmit(e, "taleTextColor")} className='toolbar'>

            
                     <input type="color" name="taleTextColor" id="taleTextColor" value={this.state.page.taleTextColor} onChange={this.handleChange}/><br/>
                     <button>Elige color del texto</button><br/>
                </form>
            
            </div>    
        )
    }
}


export class FormSave extends Component{
    constructor(props){
        super(props)
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        this.props.go()
    }

    
    

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <button>Guarda tu cuento</button>
            </form>
        )
    }
}