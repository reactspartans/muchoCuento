import React, { Component } from 'react'
import { Button } from 'react-bootstrap'


export class BookCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false
    }
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }


  // renderRedirect = () => {

  //   if (this.state.redirect) {
  //     return <Redirect to='/tales-viewer' />
  //   }
  // }


  render() {
    if(this.state.redirect===true){
      this.props.redir(this.props._id)
    }
    return (
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