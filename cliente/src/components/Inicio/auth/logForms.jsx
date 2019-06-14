import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import AuthServices from './../../../services/auth-services'



export class SingUp extends Component{
    constructor(props, context) {
        super(props, context);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    
        this.state = {
          user: {
            username: '',
            email: '',
            password: '',
          },
          show: false
          
        }
        this.services = new AuthServices()
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
            ...this.state.user,
            [name]: value 
          }
        })
      }

      

      handleSubmit = e => {
          console.log(this.state.user)
          e.preventDefault()
          const { username, email,  password } = this.state.user
          this.services.signup(username, email, password)
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
              Registro
            </Button>
    
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Nuevo usuario</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                
                    <form   onSubmit={this.handleSubmit}  >
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                              <InputGroup.Text id="basic-addon1">☺</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                              as='input'
                              type='text'
                              onChange={this.handleChange}
                              value={this.state.user.username}
                              name='username'
                              placeholder="Username"
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                              <InputGroup.Text id="basic-addon1">✉</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                              as='input'
                              type='text'
                              onChange={this.handleChange}
                              value={this.state.user.email}
                              name='email'
                              placeholder="example@example.com"
                              aria-label="email"
                              aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                              <InputGroup.Text id="basic-addon1">✎</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                              as='input'
                              type='password'                              
                              onChange={this.handleChange}
                              value={this.state.user.password}
                              name='password'
                              placeholder="******"
                              aria-label="Password"
                              aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        <Button 
                        type='submit'
                        variant="info" 
                        onClick={this.handleClose} >
                          Unirse
                        </Button>
                    </form>
              </Modal.Body>
            <Button variant="danger " size='sm' onClick={this.handleClose}>
              Cerrar
            </Button>
        </Modal>
      </>
    );
  }

}











export class Login extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      user:{
        username: '',
        password: ''
      },
      show: false
    }
    this.services = new AuthServices()
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
        ...this.state.user,
        [name]: value 
      }
    })
  }


  handleSubmit = e => {

      e.preventDefault()
      const { username, password } = this.state.user
      console.log(username, password)
      this.services.login(username, password)
          .then(response => {
              this.setState({ username: '', password: '' })
              
              this.props.setTheUser(response)
          })
          .catch(error => console.log(error))
  }


  render() {
    return (
      <>
        <Button variant="light" onClick={this.handleShow}>
          Login
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Tus datos</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form onSubmit={this.handleSubmit}>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">☺</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  as='input'
                  type='text'                              
                  onChange={this.handleChange}
                  value={this.state.user.username}
                  name='username'
                  placeholder="Usuario"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">✎</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  as='input'
                  onChange={this.handleChange}
                  value={this.state.user.password}
                  name='password'
                  type='password'
                  placeholder="******"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
            <Button type='submit' variant="primary" onClick={this.handleClose}>
              Entrar
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








