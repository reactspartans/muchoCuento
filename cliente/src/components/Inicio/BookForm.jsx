import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import BookServices from '../../services/book-service'
import { Redirect } from 'react-router-dom'


export default class BookForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      name: '',
      book_id: '',
      show: false,
      redirect: false,
    };
    this.services = new BookServices()
  }


  setRedirect = () => {
    // this.setState({
    //   redirect: true
    // })
    this.handleClose()
  }


  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='`/tales-editor`' />
    }
  }


  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }


  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value

    })
  }




  handleSubmit = e => {
    // console.log('submit')
    const theName = this.state.name
    e.preventDefault()
    this.services.postNewBook({ name: theName })
      // .then(res=>console.log(res))
      .then(res => {
        // console.log(res)
        this.props.setTheBookId(res._id)
        this.setState({
          book_id: res._id, red: true
        })

        //Función desde tales editor para liftUp state
        // window.location.href = '/tales-editor'
      }) //RECARGA LA PÁGINA!!!!  
  }


  render() {
    if (this.state.red) {
      return <Redirect to={`/tales-editor/${this.state.book_id}`} />
    }
    return (
      <>
        <button className='bookform-button' onClick={this.handleShow}>
          Crear cuento
          </button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Tu cuento</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit}>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">✎</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  as='input'
                  type='text'
                  onChange={this.handleChange}
                  value={this.state.name}
                  name='name'
                  placeholder="Las aventuras de unos patos bien locos"
                  aria-label="name"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              {this.renderRedirect()}
              <Button type='submit' variant="primary" onClick={this.setRedirect}>
                Crear
              </Button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Cerrar
              </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
