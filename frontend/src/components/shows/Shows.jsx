import React from "react";
import Navbar from "../public/Navbar";
import ShowSearchBox from "../public/Search";
import "react-datepicker/dist/react-datepicker.css";

function ShowResult() {
  return (
    <div className="shows">
      <Navbar />
      <ShowSearchBox />
    </div>
  );
}

export default ShowResult;
