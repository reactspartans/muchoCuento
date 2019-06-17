import React, {Component} from 'react'
import {Button} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'


export class BookCard extends Component{
    constructor(props){
      super(props)
      this.state={
        redirect: false
      }
    }

    setRedirect = () => {
      this.setState({
        redirect: true
      })

      setTimeout(() => {
        
        this.renderRedirect()
      }, 1000);
      console.log('setRedirect')
      
    }
  
    
    renderRedirect = () => {
      console.log('redireccionando')
      
      if (this.state.redirect) {
        console.log("entro el redirect")
        return <Redirect to='/' />
      }
    }


    render(){
    return(
        <div className="card-image">
          <article className="card">
            <header className="card-body">
              <h5 className="card-title">{this.props.name}</h5>
              <Button variant="outline-success" onClick={this.setRedirect} >Leer cuento</Button>
            </header>
          </article>
        </div>
    )
  }
}
// onClick={this.handleView}