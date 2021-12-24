import React, { Component } from "react";
import Loading from "../public/Loading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from "../shows/dateFormat";
import { subDays } from "date-fns";
import "../styles/Search.css";
import List from "../shows/List";
import { Shows } from "../api/callAPI";
class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      searchResult: [],
      isLoading: false,
    };
  }

  async requestApi(e) {
    throw new Error("This is an abstract method. Implementation required.");
  }
}

// DatePicker class
class DateSelector extends SearchBox {
  render() {
    return (
      <div className="search">
        <div className="date-input">
          <DatePicker
            selected={this.state.startDate}
            onChange={(date) => {
              this.setState({ startDate: date });
            }}
            dateFormat="yyyy-MM-dd(eee)"
          />
          <DatePicker
            excludeDateIntervals={[
              {
                start: subDays(this.state.startDate, 365),
                end: subDays(this.state.startDate, 1),
              },
            ]}
            selected={this.state.endDate}
            onChange={(date) => {
              this.setState({ endDate: date });
            }}
            dateFormat="yyyy-MM-dd(eee)"
          />
        </div>
        <button className="submit-btn">Search</button>
      </div>
    );
  }
}

// Search Box for Shows.jsx
class ShowSearchBox extends SearchBox {
  async requestApi(e) {
    e.preventDefault();
    const { startDateResult, endDateResult } = await formatDate(
      this.state.startDate,
      this.state.endDate
    );
    this.setState({ isLoading: true });
    const result = await new Shows(
      startDateResult,
      endDateResult,
      1,
      5
    ).request();
    this.setState({ isLoading: false });
    return result;
  }
  render() {
    // If loading is true:
    if (this.state.isLoading === true) {
      return (
        <div className="search-form">
          <Loading />
        </div>
      );
    } else {
      // if loading is not true.
      return (
        <div>
          <form
            className="search-form"
            onSubmit={async (e) => {
              const searchResult = await this.requestApi(e);
              this.setState({ searchResult });
              console.log(searchResult);
            }}
          >
            <DateSelector />
          </form>
          <List shows={this.state.searchResult} />
        </div>
      );
    }
  }
}

export default ShowSearchBox;
