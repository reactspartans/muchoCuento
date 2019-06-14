import React, { Component } from 'react';
import Konva from 'konva'
import { Text } from 'react-konva'

class TaleText extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      textX: 100,
      textY: 100,
    };

  }

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
      textX: e.target.attrs.x,
      textY: e.target.attrs.y

    })
    console.log(e.target.attrs.x, this.state.textX)
    console.log(e.target.attrs.y, this.state.textY)

  }


  render() {

    if (this.props.go) {
      console.log('entro en taleText para salvar texto')
      this.props.saveText(this.state)
      console.log(this.state)
      this.props.goFunction(false)
    }
    const { textX, textY } = this.state

    return (
      <React.Fragment>

        <Text
          text={this.props.text}
          x={textX}
          y={textY}
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