import { useState } from "react";
import React from "react";
import { subDays } from "date-fns";
import { Shows } from "../api/callAPI";
import { formatDate } from "./dateFormat";
import Loading from "../public/Loading";
import List from "./List";
import DatePicker from "react-datepicker";
import Navbar from "../public/Navbar";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/Shows.css";

async function requestAPI(event, stDate, edDate, setLoading) {
  event.preventDefault();
  const { startDateResult, endDateResult } = formatDate(stDate, edDate);
  const shows = new Shows(startDateResult, endDateResult, 1, 100);
  setLoading(true);
  const response = await shows.getShows;
  setLoading(false);
  return response.dbs.db;
}

function ShowResult() {
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
          const apiResult = await requestAPI(e, startDate, endDate, setLoading);
          setSearchResult(apiResult);
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
            excludeDateIntervals={[
              {
                start: subDays(startDate, 365),
                end: subDays(startDate, 1),
              },
            ]}
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

export default ShowResult;
