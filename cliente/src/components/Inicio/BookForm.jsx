import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import BookServices from '../../services/book-service'


export default class BookForm extends Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
  
      this.state = {
        name:'',
        book_id: '',
        show: false,
      };
      this.services= new BookServices()
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

    
  

    handleSubmit=e=>{
      console.log('submit')
      const theName = this.state.name
      e.preventDefault()
      this.services.postNewBook({name: theName})
        // .then(res=>console.log(res))
        .then(res=> {
          console.log(res._id)
          this.setState({
            book_id: res._id
          })
          //Función desde tales editor para liftUp state
          window.location.href= '/tales-editor'
        }) //RECARGA LA PÁGINA!!!!  
    }

  
    render() {
      return (
        <>
          <Button variant="light" onClick={this.handleShow}>
            Crear cuento
          </Button>
  
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
                <Button type='submit' variant="primary" onClick={this.handleClose}>
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
  