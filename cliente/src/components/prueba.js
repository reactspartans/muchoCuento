import React, { Component } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Image } from 'react-konva';
import Konva from 'konva'

// the first very simple and recommended way:
// export const LionImage = () => {
//   const [image] = useImage('https://konvajs.org/assets/lion.png');
//   return <Image image={image} />;
// };



// custom component that will handle loading image from url
// you may add more logic here to handle "loading" state
// or if loading is failed
// VERY IMPORTANT NOTES:
// at first we will set image state to null
// and then we will set it to native image instance when it is loaded
export class URLImage extends Component {
  constructor(){
    super()
    
    this.state = {
      image: null
    };

  }
  componentDidMount() {
    this.loadImage();
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
    this.setState({
      image: this.image
    });
    // if you keep same image object during source updates
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
  };

  // const [rectangles, setRectangles] = React.useState(initialRectangles);
  // const [selectedId, selectShape] = React.useState(null);

  // useEffect = () => {React.useEffect(() => {
  //   if (isSelected) {
  //     // we need to attach transformer manually
  //     trRef.current.setNode(shapeRef.current);
  //     trRef.current.getLayer().batchDraw();
  //   }
  // }, [isSelected]);

  render() {
    return (
      <Image
        key={3}
        x={10}
        y={10}
        numPoints={5}
        innerRadius={20}
        outerRadius={40}
        fill="#89b717"
        // opacity={0.8}
        draggable
        
        shadowColor="black"
        shadowBlur={10}
        shadowOpacity={0.6}
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
  
        image={this.state.image}
        ref={node => {
          this.imageNode = node;
        }
        
      }
      />
    );
  }
}

