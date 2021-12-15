import { useState } from "react";
import React from "react";
import { subDays, addDays } from "date-fns";
import { api_get_request } from "../api/callAPI";
import { formatDate } from "./dateFormat";
import Loading from "../public/Loading";
import List from "./List";
import DatePicker from "react-datepicker";
import Navbar from "../public/Navbar";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/Shows.css";

async function requestAPI(event, stDate, edDate, setLoading) {
  event.preventDefault();
  const { startDateResult, endDateResult } = await formatDate(stDate, edDate);

  setLoading(true);
  const response = await api_get_request(
    startDateResult,
    endDateResult,
    1,
    100
  );

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
          const api_result = await requestAPI(
            e,
            startDate,
            endDate,
            setLoading
          );
          setSearchResult(api_result);
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
