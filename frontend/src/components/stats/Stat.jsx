import React, { Component } from "react";
import NavBar from "../public/Navbar";
import "../styles/stat.css";
import { DayStat } from "../api/callAPI";
import { DayStatSearchBox } from "../public/Search";

class GenreStat extends Component {
  constructor() {
    super();
    this.caller = new DayStat();
  }
  render() {
    return (
      <div>
        <NavBar />
        <DayStatSearchBox type="single" format="yyyymm" caller={this.caller} />
      </div>
    );
  }
}

export default GenreStat;
