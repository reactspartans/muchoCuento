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


  componentDidUpdate(oldProps) {
    if (oldProps.text !== this.props.text) {
      this.setState({
        content: this.props.text
      })
    }
  }  

 


  
  handleDragStart = e => {
    e.target.setAttrs({
      shadowOffset: {
        x: 0,
        y: 0
      }
    });
  };
  handleDragEnd = e => {
    
    e.target.to({
      duration: 0.5,
      easing: Konva.Easings.ElasticEaseOut,
      shadowOffsetX: 0,
      shadowOffsetY: 0
    });
    this.setState({
      positionX: e.target.attrs.x,
      positionY: e.target.attrs.y
      
    })
    // console.log(e.target.attrs.x, this.state.positionX)
    // console.log(e.target.attrs.y, this.state.positionY)
    
  }
  remove=(e)=>{
    if(this.props.selected==this.props.name){
        this.setState({
          content: ''
        })      
      }
    }  
  
  alSoltar=(e)=>{
    this.setState({
      scaleX: e.target.attrs.scaleX,
      scaleY: e.target.attrs.scaleY
    })
  }
  
  render() {
    
    if (this.props.go) {
      // console.log('entro en taleText para salvar texto')
      this.props.saveText(this.state)
      // console.log(this.state)
      this.props.goFunction(false)
    }
    const { content, positionX, positionY } = this.state
    
    // console.log(this.props)
    return (
      <React.Fragment>

        <Text
          
          name={this.props.name}
          onMouseOut={this.alSoltar}
          onDblClick={this.remove}
          text={content}
          x={positionX}
          y={positionY}
          fontSize={40}
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