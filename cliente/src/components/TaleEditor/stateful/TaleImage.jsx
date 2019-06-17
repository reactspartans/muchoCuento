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
      image_id: ''
    };

  }
  componentDidMount() {
    this.loadImage();
    this.imageNode.getLayer().batchDraw();
  }
  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImage();
    }


  }
  componentWillUnmount() {
    this.image.removeEventListener('load', this.handleLoad);
  }
  loadImage() {
    // save to "this" to remove "load" handler on unmount
    this.image = new window.Image();
    this.image.src = this.props.src;
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
  };
  handleDragStart = e => {
    e.target.setAttrs({
      shadowOffset: {
        x: 15,
        y: 15
      },
      scaleX: 1.1,
      scaleY: 1.1
    });
  };
  handleDragEnd = e => {

    e.target.to({
      duration: 0.5,
      easing: Konva.Easings.ElasticEaseOut,
      scaleX: 1,
      scaleY: 1,
      shadowOffsetX: 5,
      shadowOffsetY: 5
    });
    this.setState({
      positionX: e.target.attrs.x,
      positionY: e.target.attrs.y

    })



    // console.log(e.target)
    // console.log(e.target.attrs.x + ' pos X')
    // console.log(e.target.attrs.y + ' pos Y')

  };



  render() {
    if (this.props.go) {
      this.props.salvarImagen(this.state, this.props.status)
      // console.log(this.state, 'estoy en taleImage mandando state')
      this.props.goFunction(false)
    }
    const { positionX, positionY, rotation, image } = this.state


    return (
      <Image
        // key={image._id}
        x={positionX}
        y={positionY}



        //Para mover la imagen
        draggable
        rotation={rotation}

        shadowBlur={10}
        shadowOpacity={0.6}
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}

        image={image}
        ref={node => {
          this.imageNode = node;
        }

        }
      />
    );
  }
}

