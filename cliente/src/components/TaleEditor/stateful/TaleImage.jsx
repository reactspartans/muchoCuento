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
    const { src, status } = this.props;
    this.loadImage(src, status);
    this.imageNode.getLayer().batchDraw();
  }
  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      const { src, status } = this.props;
      this.loadImage(src, status);
    }
  }

  loadImage(src, status) {
    const image = new window.Image();
    image.src = src+'?'+Math.floor(Math.random()*1000000);
    image.crossOrigin = "Anonymous";
    console.log(image);
    image.addEventListener('load', () => {
      image.crossOrigin = "Anonymous";
      this.setState({
        image,
        imageURL: image.src,
        status
      });
    });
  }

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
    if (this.props.selected === this.props.name) {
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

