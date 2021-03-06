import React, { Component } from "react";
import { Shows } from "../api/callAPI";
import Navbar from "../public/Navbar";
import "react-datepicker/dist/react-datepicker.css";
import { ShowSearchBox } from "../public/Search";

class ShowResult extends Component {
  constructor() {
    super();
    this.caller = new Shows();
  }
  render() {
    return (
      <div className="shows">
        <Navbar />
        <ShowSearchBox type="double" caller={this.caller} />
      </div>
    );
  }
}

export default ShowResult;
