import React, { Component } from 'react';
import { Image } from 'react-konva';
import Konva from 'konva'


// custom component that will handle loading image from url
// you may add more logic here to handle "loading" state
// or if loading is failed
// VERY IMPORTANT NOTES:
// at first we will set image state to null
// and then we will set it to native image instance when it is loaded
export class TaleImage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      image: null,
      imageURL: '',
      positionX: 100,
      positionY: 100,
      rotation: 0,
      status: '',
      image_id: '',
      width: 100,
      height: 100
    };
    // console.log(this.props, 'img props')
  }
  componentDidMount() {
    this.loadImage();
    this.imageNode.getLayer().batchDraw();
  }
  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImage();

    }
    this.image.crossOrigin = "Anonymous"

  }
  componentWillUnmount() {
    this.image.removeEventListener('load', this.handleLoad);
  }
  loadImage() {
    // save to "this" to remove "load" handler on unmount
    this.image = new window.Image();
    this.image.src = this.props.src;
    this.image.crossOrigin = "Anonymous"
    this.image.addEventListener('load', this.handleLoad);
  }
  handleLoad = () => {
    // after setState react-konva will update canvas and redraw the layer
    // because "image" property is changed
    // console.log(this.image, 'soy this.image')
    this.setState({
      // ...this.state,
      image: this.image,
      imageURL: this.image.src,
      status: this.props.status
    });
    // if you keep same image object during source updates
    // console.log(this.state)
    // you will have to update layer manually:
    // this.imageNode.getLayer().batchDraw();
    this.image.crossOrigin = "Anonymous"

  };
  handleDragStart = e => {
    e.target.setAttrs({
      shadowOffset: {
        x: 15,
        y: 15
      }
    });
  };
  handleDragEnd = e => {
    e.target.to({
      duration: 0.5,
      easing: Konva.Easings.ElasticEaseOut,
      shadowOffsetX: 5,
      shadowOffsetY: 5
    });
    // console.log(e.target.attrs, 'attrs de imagen')
    this.setState({
      positionX: e.target.attrs.x,
      positionY: e.target.attrs.y,

    })


  };


  alSoltar = (e) => {
    this.setState({
      scaleX: e.target.attrs.scaleX,
      scaleY: e.target.attrs.scaleY
    })
  }

  remove = (e) => {
    if (this.props.selected == this.props.name) {
      this.setState({
        image: ''
      })
    }
  }




  alSoltar = (e) => {
    this.setState({
      scaleX: e.target.attrs.scaleX,
      scaleY: e.target.attrs.scaleY
    })
  }



  render() {
    if (this.props.go) {
      this.props.salvarImagen(this.state, this.props.status)
      // console.log(this.state, 'estoy en taleImage mandando state')
      this.props.goFunction(false)
    }
    const { positionX, positionY, image } = this.state


    return (
      <Image
        // key={image._id}
        x={positionX}
        y={positionY}
        // width={width}
        // height={height}
        name={this.props.name}
        //Para mover la imagen
        draggable
        // rotation={rotation}

        shadowBlur={10}
        shadowOpacity={0.6}
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
        onMouseOut={this.alSoltar}

        onDblClick={this.remove}

        image={image}
        ref={node => {
          this.imageNode = node;
        }

        }
      />
    );
  }
}

