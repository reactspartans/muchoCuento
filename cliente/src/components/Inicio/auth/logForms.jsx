import React, {Component} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

export class SingUp extends Component{
    constructor(props, context) {
        super(props, context);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    
        this.state = {
          show: false,
        };
      }
    
      handleClose() {
        this.setState({ show: false });
      }
    
      handleShow() {
        this.setState({ show: true });
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
                    <form>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                              <InputGroup.Text id="basic-addon1">☺</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
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
                              type='password'
                              placeholder="******"
                              aria-label="Password"
                              aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                    </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="info" onClick={this.handleClose}>
                  Unirse
                </Button>
                <Button variant="danger " onClick={this.handleClose}>
                  Cerrar
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
      }
    
}

export class Login extends Component{
    constructor(props, context) {
        super(props, context);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    
        this.state = {
          show: false,
        };
      }
    
      handleClose() {
        this.setState({ show: false });
      }
    
      handleShow() {
        this.setState({ show: true });
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
                    <form>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                              <InputGroup.Text id="basic-addon1">☺</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                              placeholder="Username"
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                            />
                        </InputGroup>
            
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                              <InputGroup.Text id="basic-addon1">✎</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                              type='password'
                              placeholder="******"
                              aria-label="Password"
                              aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                    </form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Cerrar
                </Button>
                <Button variant="primary" onClick={this.handleClose}>
                  Login
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
      }
}

export class Logout extends Component{
    constructor(){
        super()
        this.state={}
    }
    render(){
        return(
            <h1>hey</h1>
        )
    }
}