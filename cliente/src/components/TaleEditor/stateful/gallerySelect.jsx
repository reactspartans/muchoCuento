import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import ImageCard from '../stateless/ImageCard'
import GalleryServices from '../../../services/galeria-service'

export class ModalGallery extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.searchImage = this.searchImage.bind(this);


    this.state = {
      gallery: [],
      filtered: [],
      search: "",

      show: false,
      query: "",
    }
    this.services = new GalleryServices()
  }

  componentDidMount() {
    this.services.getGallery()
      .then(allImages => {
        allImages = allImages.map(img => {
          img.crossOrigin = "anonymous"
          return img
        })
        this.setState({ gallery: allImages })
      })
  }

  searchImage(e) {
    // console.log(this.state.gallery)
    this.setState({ query: e.target.value })
    let filtered = this.state.gallery.filter(img => img.name.includes(e.target.value))
    // console.log(filtered)
    this.setState({ filtered })
  }


  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    // console.log(this.state)
    return (
      <>
        <Button variant="light" onClick={this.handleShow}>
          Galería imagenes
            </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>

          <Modal.Header closeButton>
            <Modal.Title>Galeria de imagenes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">Buscar</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="busca una imagen"
                  aria-label="gallery"
                  aria-describedby="basic-addon1"
                  value={this.state.query}
                  onChange={this.searchImage}
                />
              </InputGroup>
            </form>
            <div>

              {this.state.query.length ?
                this.props.status === "background" ?

                  this.state.filtered.filter(theImage => theImage.status === "background").map((theImage, idx) => <ImageCard key={idx} nuevaImg={this.props.nuevaImg} status={this.props.status} {...theImage} go={this.state.go} goFunction={this.go} />)

                  :

                  this.state.filtered.filter(theImage => theImage.status === "character").map((theImage, idx) => <ImageCard key={idx} nuevaImg={this.props.nuevaImg} status={this.props.status} {...theImage} go={this.state.go} goFunction={this.go} />)

                :

                this.state.gallery.map((theImage, idx) => <ImageCard key={idx} nuevaImg={this.props.nuevaImg} {...theImage} go={this.state.go} goFunction={this.go} />)

              }

            </div>
          </Modal.Body>

        </Modal>
      </>
    );
  }

}