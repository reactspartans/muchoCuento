import React from "react";
import { Stage, Layer, Rect, Transformer } from "react-konva";



class TransformerComponent extends React.Component {


  componentDidMount() {
    this.checkNode();
  }
  componentDidUpdate() {
    this.checkNode();
  }
  checkNode() {
    const stage = this.transformer.getStage();
    const { selectedShapeName } = this.props;
    const selectedNode = stage.findOne("." + selectedShapeName);
    if (selectedNode === this.transformer.node()) {
      return;
    }
    if (selectedNode) {
      this.transformer.attachTo(selectedNode);
    } 
    else {
      this.transformer.detach();
    }
    this.transformer.getLayer().batchDraw();

    
  }







  render() {
    return (
      <Transformer
        ref={node => {
          this.transformer = node;
          console.log(node)
        }}
      />
    );
  }
}


export default TransformerComponent 