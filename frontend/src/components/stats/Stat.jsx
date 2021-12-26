import React, { Component, useState, useEffect } from "react";
import Plot from "react-plotly.js";
import NavBar from "../public/Navbar";
import "../styles/stat.css";
import { DayStat } from "../api/callAPI";
import { SearchBox } from "../public/Search";

class Stat extends Component {
  constructor() {
    super();
    this.caller = new DayStat();
  }
  render() {
    return (
      <div>
        <NavBar />
        <SearchBox type="single" caller={this.caller} />
      </div>
    );
  }
}

export default Stat;
