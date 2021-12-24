import React, { Component, useState, useEffect } from "react";
import Plot from "react-plotly.js";
import Plotly from "react-plotly.js";
import { Genre } from "../api/callAPI";
import NavBar from "../public/Navbar";
import "../styles/stat.css";

function Graph() {
  const [pltData, setPltData] = useState(null);
  useEffect(() => {
    // Call API
    async function fetchAPI() {
      const statData = await new Genre("20211101", "20211130").request();
      const plt1 = {
        x: statData.genres,
        y: statData.open_count,
        name: "OpenCounts",
        type: "bar",
      };

      const plt2 = {
        x: statData.genres,
        y: statData.run_count,
        name: "Run Coutns",
        type: "bar",
      };

      const plts = [plt1, plt2];
      setPltData(plts);
    }
    fetchAPI();
  }, []);
  return (
    <div className="stat-container">
      <Plot data={pltData} />
    </div>
  );
}

function Stat() {
  return (
    <div>
      <NavBar />
      <Graph />
    </div>
  );
}

export default Stat;
