import React, { useState } from "react";
import { DayStat, Genre } from "../api/callAPI";

function Display(obj) {
  return;
}

function Selection() {
  const [jsonObject, setJsonObject] = useState({});
  return (
    <div className="selections">
      <button
        name="genre"
        onClick={async () => {
          const req = new Genre("20211101", "20211130");
          const requestResult = await req.request();
          console.log(requestResult);
          setJsonObject(requestResult);
        }}
      >
        Genre
      </button>
      <button
        name="days"
        onClick={async () => {
          const req = new DayStat("202107");
          const requestResult = await req.request();
          console.log(requestResult);
          setJsonObject(requestResult);
        }}
      >
        Days
      </button>
    </div>
  );
}

function Stat() {
  return (
    <div className="stat-frame">
      <div className="stats"></div>
      <Selection />
    </div>
  );
}

export default Stat;
