import React, { Component } from 'react';
import Konva from 'konva'
import { Text } from 'react-konva'

class TaleText extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: this.props.text,
      positionX: 100,
      positionY: 100,
      text_id: this.props._id
    };
  }
  /* this.textNode = new Konva.Text({
    text: 'Some text here',
    x: 50,
    y: 80,
    fontSize: 20,
    draggable: true,
    width: 200
  });

  this.tr = new Konva.Transformer({
    node: textNode,
    enabledAnchors: ['middle-left', 'middle-right'],
    // set minimum width of text
    boundBoxFunc: function (oldBox, newBox) {
      newBox.width = Math.max(30, newBox.width);
      return newBox;
    }
  }) */


  handleDragStart = e => {
    e.target.setAttrs({
      shadowOffset: {
        x: 0,
        y: 0
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
      shadowOffsetX: 0,
      shadowOffsetY: 0
    });
    this.setState({
      positionX: e.target.attrs.x,
      positionY: e.target.attrs.y

    })
    console.log(e.target.attrs.x, this.state.positionX)
    console.log(e.target.attrs.y, this.state.positionY)

  }


  render() {

    if (this.props.go) {
      console.log('entro en taleText para salvar texto')
      this.props.saveText(this.state)
      console.log(this.state)
      this.props.goFunction(false)
    }
    const { content, positionX, positionY } = this.state

    return (
      <React.Fragment>

        <Text
          text={content}
          x={positionX}
          y={positionY}
          fontSize={20}
          onDragStart={this.handleDragStart}
          onDragEnd={this.handleDragEnd}
          draggable
          fill={this.props.color}
        />

      </React.Fragment>
    );
  }
}

export default TaleText