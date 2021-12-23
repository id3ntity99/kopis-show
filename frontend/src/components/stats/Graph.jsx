import { DayStat, Genre } from "../api/callAPI";
import React from "react";
import * as d3 from "d3";

const testData = {
  genres: ["a", "b", "c", "d", "e", "f"],
  tickets: [100, 300, 400, 500, 200, 200],
  sales: [300, 200, 700, 800, 350, 250],
  openCount: [300, 500, 100, 200, 400, 300],
  runCount: [200, 100, 200, 300, 600, 500],
};

class GenreGraph extends React.Component {
  constructor(props) {
    super(props);
    this.startDate = this.props.stDate;
    this.endDate = this.props.edDate;
    this.#getData();
    this.data = testData;
    this.margin = { top: 10, right: 30, bottom: 20, left: 50 };
    this.width = 460 - this.margin.left - this.margin.right;
    this.height = 400 - this.margin.top - this.margin.bottom;
    this.processData();
  }

  async #getData() {
    this.data = await new Genre(this.startDate, this.endDate).request();
  }

  processData() {
    const xScale = d3
      .scaleLinear()
      .domain(this.data.genres)
      .range([0, this.width]);
    const yScale = d3
      .scaleBand()
      .domain(this.data.tickets)
      .range([0, this.height]);

    return (
      <svg width={this.width} height={this.height}>
        <rect x={100} y={200} width={400} height={500} />
      </svg>
    );
  }
}

export { GenreGraph };
