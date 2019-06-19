import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import BookServices from '../../services/book-service'
import { BookCard } from './Book-card'
import {Redirect} from 'react-router-dom'


export class SearchBooks extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.searchBook = this.searchBook.bind(this);


    this.state = {
      bookId:'',
      books: [],
      searchBook: [],
      search: "",
      show: false,
      query: "",
      redirect: false
    }
    this.services = new BookServices()
  }

  

  componentDidMount() {
    this.services.booksList()
      .then(allBooks => this.setState({ books: allBooks }))
  }



  searchBook(e) {
    // console.log(this.state.books)
    this.setState({ query: e.target.value })
    let searchBook = this.state.books.filter(book => book.name.includes(e.target.value))
    // console.log(searchBook)
    this.setState({ searchBook })
  }


  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }


  // setRedirect = () => {
  //   this.setState({
  //     redirect: true
  //   })
  // }
  getRed=(thing)=>{
    this.setState({
      redirect: thing
    })
    
  }

  renderRedirect = () => {
      return <Redirect to={`/tales-viewer/${this.state.redirect}`} />
  }

  render() {
    if(this.state.redirect){
       this.renderRedirect()
    }
    else 
    return (
      <>
        <Button className='horror-button' variant="light" onClick={this.handleShow}>
          Buscar cuentos
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>

          <Modal.Header closeButton>
            <Modal.Title>Todos los cuentos</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">⌨</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Buscar cuentos"
                aria-label="books"
                aria-describedby="basic-addon1"
                value={this.state.query}
                onChange={this.searchBook}
              />
            </InputGroup>
            <div>

              {this.state.query.length ?

                this.state.searchBook.map((book, idx) => <BookCard redir={this.getRed} key={idx} {...book} />)

                :

                this.state.books.map((book, idx) => <BookCard redir={this.getRed} key={idx} {...book} />)

              }

            </div>
          </Modal.Body>

        </Modal>
      </>
    );
  }

}