import React from 'react'
import { Layer, Text, Stage, Group } from 'react-konva';
import Konva from 'konva';
// import Portal from './portal'

class Texto extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      textEditVisible: false,
      textX: 0,
      textY: 0,
      textValue: 'Hello'
    };

  }

  handleTextDblClick = e => {
    console.log('click');
    const absPos = e.target.getAbsolutePosition();
    this.setState({
      textEditVisible: true,
      textX: absPos.x,
      textY: absPos.y
    });
  };
  handleTextEdit = e => {
    this.setState({
      textValue: e.target.value
    });
  };
  handleTextareaKeyDown = e => {
    if (e.keyCode === 13) {
      this.setState({
        textEditVisible: false
      });
    }
  };
  render() {
    return (
      <React.Fragment>

        {/* <Layer> */}
        {/* <Portal> */}
        {/* <input
              style={{
                position: 'absolute',
                top: 10,
                left: 10,
                width: '200px'
              }}
              placeholder="DOM input from Konva nodes"
            /> */}
        {/* </Portal> */}
        <Text
          text={"Erase una vez un profe super guay"}
/*           {this.state.textEditVisible}
 */          x={100}
          y={100}
          fontSize={20}
          onDblClick={this.handleTextDblClick}
        />
        {/* </Layer> */}

        {/* <textarea
          value={this.state.textValue}
          style={{
            display: this.state.textEditVisible ? 'block' : 'none',
            position: 'absolute',
            top: this.state.textY + 'px',
            left: this.state.textX + 'px'
          }}
          onChange={this.handleTextEdit}
          onKeyDown={this.handleTextareaKeyDown}
        /> */}
      </React.Fragment>
    );
  }
}

export default Texto