import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'



export default class BookForm extends Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
  
      this.state = {
        name:'',
        show: false,
      };
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
          user:{
            ...this.state,
            [name]: value 
          }
        })
      }

      

    handleSubmit = e => {
        console.log(this.state.user)
        e.preventDefault()
        const { name } = this.state
        this.services.signup(name)
            .then(response => {
                this.setState({ user:{username: '', email: '', password: ''}})
                this.props.setTheUser(response)
                console.log(this.state.user)
            })
            .catch(error => console.log(error))
    }

  
    render() {
      return (
        <>
          <Button variant="light" onClick={this.handleShow}>
            Crear cuento
          </Button>
  
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Tus datos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">✎</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    as='input'
                    type='text'
                    onChange={this.handleChange}
                    value={this.state.name}
                    name='email'
                    placeholder="Las aventuras de unos patos bien locos"
                    aria-label="name"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
                <Button 
                    type='submit'
                    variant="info" 
                    onClick={this.handleClose} >
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
  