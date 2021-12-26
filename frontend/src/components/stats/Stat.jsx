import React, { Component, useState, useEffect } from "react";
import Plot from "react-plotly.js";
import NavBar from "../public/Navbar";
import "../styles/stat.css";
import { DayStat, Genre } from "../api/callAPI";
import { PlotSearchBox } from "../public/Search";

class GenreStat extends Component {
  constructor() {
    super();
    this.caller = new Genre();
  }
  render() {
    return (
      <div>
        <NavBar />
        <PlotSearchBox type="double" caller={this.caller} />
      </div>
    );
  }
}

export default GenreStat;
