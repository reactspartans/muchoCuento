import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import BookServices from '../../services/book-service'

// export class YourBookCard extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       redirect: false
//     }
//   }

//   setRedirect = () => {
//     this.setState({
//       redirect: true
//     })
//   }

//   setRedirectEdit = () => {
//     this.setState({
//       redirectEd: true
//     })
//   }

//   // renderRedirect = () => {

//   //   if (this.state.redirect) {
//   //     return <Redirect to='/tales-viewer' />
//   //   }
//   // }


//   render() {
//     if(this.state.redirect===true){
//       this.props.redir(this.props._id)
//     }
//     return (
//       <div className='card-container'>
//             {this.props.pagesToView[0] && <img className='mybook-card-img' src={this.props.pagesToView[0].pagesToView} alt="tale"/>}
//             <h5 className="card-title">{this.props.name}</h5>
//             <button className='card-button' onClick={this.setRedirect} >Leer cuento</button>
//             <button className='card-button' onClick={this.setRedirectEdit} >Editar cuento</button>          
//       </div>
//     )
//   }
//}
// onClick={this.handleView}

export class YourBookCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      redirectEd: false
    }
    this.services = new BookServices()

  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  setRedirectEdit = () => {
    this.setState({
      redirectEd: true

    })
  }

  // renderRedirect = () => {

  //   if (this.state.redirect) {
  //     return <Redirect to='/tales-viewer' />
  //   } 
  // }

  deleteBook = () => {

    this.services.bookDelete(this.props._id)
      .then(books => {
        this.props.isDeleted(books)
        console.log('borrado')
      })

  }



  render() {
    if (this.state.redirect === true) {
      this.props.redir(this.props._id)
    }

    if (this.state.redirectEd === true) {
      this.props.getRedEdit(this.props._id)
    }

    return (

      // <div className="card-image">

      //   <article className="card">
      //     <header className="card-body">
      //       <h5 className="card-title">{this.props.name}</h5>
      //       <Button variant="outline-success" onClick={this.setRedirect} >Leer cuento</Button>
      //       {/* <Link to={`/cuentos/tales-viewer/${this.props._id}`}></Link> */}
      //     </header>
      //   </article>
      // </div>

      <div className='card-container'>
        {this.props.pagesToView[0] && <img className='mybook-card-img' src={this.props.pagesToView[0].pagesToView} alt="tale" />}
        <h5 className="card-title">{this.props.name}</h5>
        <button className='card-button' onClick={this.setRedirect} >Leer cuento</button>
        <button className='card-button' onClick={this.setRedirectEdit} >Editar cuento</button>
        <button className='card-button' onClick={this.deleteBook}> Borrar cuento</button>

      </div>
    )
  }
}