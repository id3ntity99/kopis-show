//React
import { useState } from "react";
import React from "react";

//API
import { postAPI } from "./api/callAPI";

//Components
import Loading from "./Loading";
import List from "./List";
import DatePicker from "react-datepicker";
import Navbar from "./Navbar"
//CSS
import "react-datepicker/dist/react-datepicker.css";
import "./styles/Shows.css";

async function formatDate(stDate, edDate) {
  // Stringify date.
  let startYear = stDate.getFullYear().toString();
  let startMonth = (stDate.getMonth() + 1).toString();
  let startDay = stDate.getDate().toString();
  let endYear = edDate.getFullYear().toString();
  let endMonth = (edDate.getMonth() + 1).toString();
  let endDay = edDate.getDate().toString();

  // Format shifting to YYYY-MM-DD.
  startYear = startYear >= 10 ? startYear : "0" + startYear;
  startMonth = startMonth >= 10 ? startMonth : "0" + startMonth;
  startDay = startDay >= 10 ? startDay : "0" + startDay;
  endYear = endYear >= 10 ? endYear : "0" + endYear;
  endMonth = endMonth >= 10 ? endMonth : "0" + endMonth;
  endDay = endDay >= 10 ? endDay : "0" + endDay;

  // Get completely formatted date.
  const startDateResult = startYear + startMonth + startDay;
  const endDateResult = endYear + endMonth + endDay;
  return { startDateResult, endDateResult };
}

// POST Request to backend.
async function requestAPI(event, stDate, edDate, setLoading) {
  event.preventDefault();
  // Formatting Date from ISO format to YYYYMMDD.
  const { startDateResult, endDateResult } = await formatDate(stDate, edDate);

  //Set loading page while requesting.
  setLoading(true);
  const response = await postAPI(startDateResult, endDateResult, 1, 100);

  // Disable loading page when request is done.
  setLoading(false);
  console.log(response.dbs.db);
  return response.dbs.db;
}

function TestShowResult() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="shows">
	  <Navbar />
      <form
        onSubmit={async (e) => {
          const api_result = await requestAPI(
            e,
            startDate,
            endDate,
            setLoading
          );
          setSearchResult(api_result);
          //setSearchResult([]);
        }}
        className="search-form"
      >
        <div className="date-input">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd(eee)"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy-MM-dd(eee)"
          />
        </div>
        <button className="submit-btn">Search</button>
      </form>
      <List shows={searchResult} />
    </div>
  );
}

export default TestShowResult;
