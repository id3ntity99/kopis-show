import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { Genre } from "../api/callAPI";
function Stat() {
  const [pltData, setPltData] = useState(null);
  useEffect(() => {
    // Call API
    async function fetchAPI() {
      const statData = await new Genre("20211101", "20211130").request();
      const plt1 = {
        x: statData.genres,
        y: statData.open_count,
        names: "Open Counts",
        type: "bar",
      };

      const plt2 = {
        x: statData.genres,
        y: statData.run_count,
        names: "Run Coutns",
        type: "bar",
      };

      const plts = [plt1, plt2];
      setPltData(plts);
    }
    fetchAPI();
  }, []);
  console.log(pltData);
  return <Plot data={pltData} />;
}

export default Stat;
