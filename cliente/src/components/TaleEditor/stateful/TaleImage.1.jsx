/* import React from "react";
import { render } from "react-dom";
import { Stage, Layer, Rect, Transformer } from "react-konva";

const Rectangle = ({ shapeProps, isSelected, onSelect, onChange }) => {
  const shapeRef = React.useRef();
  const trRef = React.useRef();

  React.useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.setNode(shapeRef.current);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <React.Fragment>
      <Rect
        onClick={onSelect}
        ref={shapeRef}
        {...shapeProps}
        draggable
        onDragEnd={e => {
          onChange({
            ...shapeProps,
            x: e.target.x(),
            y: e.target.y()
          });
        }}
        onTransformEnd={e => {
          // transformer is changing scale
          const node = shapeRef.current;
          const scaleX = node.scaleX();
          const scaleY = node.scaleY();

          // we will reset it back
          node.scaleX(1);
          node.scaleY(1);
          onChange({
            ...shapeProps,
            x: node.x(),
            y: node.y(),
            width: node.width() * scaleX,
            height: node.height() * scaleY
          });
        }}
      />
      {isSelected && <Transformer ref={trRef} />}
    </React.Fragment>
  );
};

const initialRectangles = [
  {
    x: 10,
    y: 10,
    width: 100,
    height: 100,
    fill: "red",
    id: "rect1"
  },
  {
    x: 150,
    y: 150,
    width: 100,
    height: 100,
    fill: "green",
    id: "rect2"
  }
];

const App = () => {
  const [rectangles, setRectangles] = React.useState(initialRectangles);
  const [selectedId, selectShape] = React.useState(null);

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={e => {
        // deselect when clicked on empty area
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
          selectShape(null);
        }
      }}
    >
      <Layer>
        {rectangles.map((rect, i) => {
          return (
            <Rectangle
              key={i}
              shapeProps={rect}
              isSelected={rect.id === selectedId}
              onSelect={() => {
                selectShape(rect.id);
              }}
              onChange={newAttrs => {
                const rects = rectangles.slice();
                rects[i] = newAttrs;
                setRectangles(rects);
              }}
            />
          );
        })}
      </Layer>
    </Stage>
  );
};

render(<App />, document.getElementById("root")); */




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
    console.log(this.image, 'soy this.image')
    this.setState({
      // ...this.state,
      image: this.image,
      imageURL: this.image.src,
      status: this.props.status
    });
    // if you keep same image object during source updates
    console.log(this.state)
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



    console.log(e.target)
    console.log(e.target.attrs.x + ' pos X')
    console.log(e.target.attrs.y + ' pos Y')

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

