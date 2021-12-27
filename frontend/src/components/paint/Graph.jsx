import { Component } from "react";
import Plot from "react-plotly.js";

class BarChart extends Component {
  constructor(props) {
    super();
    this.plt = [
      {
        x: props.x,
        y: props.y,
        name: props.legend,
        type: "bar",
      },
    ];
  }

  render() {
    return <Plot data={this.plt} />;
  }
}

export default BarChart;
