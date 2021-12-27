import React, { Component } from "react";
import Loading from "../public/Loading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { subDays } from "date-fns";
import "../styles/Search.css";
import List from "../paint/List";
import BarChart from "../paint/Graph";

class SearchBox extends Component {
  constructor(props) {
    super();
    this.state = {
      startUTC: new Date(),
      endUTC: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      searchResult: [],
      isLoading: false,
    };
    this.caller = props.caller;
  }
}

export class ShowSearchBox extends SearchBox {
  async search(e) {
    e.preventDefault();
    this.setState({ isLoading: true });
    const startDate = this.#formatDate(this.state.startDate);
    const endDate = this.#formatDate(this.state.endDate);
    const searchResult = await this.caller.request(startDate, endDate, 1, 5);
    this.setState({ searchResult });
    this.setState({ isLoading: false });
  }

  #formatDate(date) {
    let year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    month = month >= 10 ? month : "0" + month;
    day = day >= 10 ? day : "0" + day;
    return year + month + day;
  }

  render() {
    if (this.state.isLoading === true) {
      return (
        <div className="search-form">
          <Loading />
        </div>
      );
    } else {
      return (
        <div>
          <form
            className="search-form"
            onSubmit={async (e) => {
              await this.search(e);
            }}
          >
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
          </form>
          <List shows={this.state.searchResult} />
        </div>
      );
    }
  }
}

export class DayStatSearchBox extends SearchBox {
  async search(e) {
    e.preventDefault();
    this.setState({ isLoading: true });
    const startDate = this.#formatDate(this.state.startDate);
    const searchResult = await this.caller.request(startDate);
    this.setState({ searchResult });
    this.setState({ isLoading: false });
  }

  #formatDate(date) {
    let year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString();
    month = month >= 10 ? month : "0" + month;
    return year + month;
  }

  render() {
    if (this.state.isLoading === true) {
      return (
        <div className="search-form">
          <Loading />
        </div>
      );
    } else {
      return (
        <div>
          <form
            className="search-form"
            onSubmit={async (e) => await this.search(e)}
          >
            <div className="search">
              <div className="date-input">
                <DatePicker
                  selected={this.state.startDate}
                  showMonthYearPicker
                  onChange={(date) => {
                    this.setState({ startDate: date });
                  }}
                  dateFormat="yyyy-MM"
                />
              </div>
              <button className="submit-btn">Search</button>
            </div>
          </form>
          <BarChart
            x={this.state.searchResult.date}
            y={this.state.searchResult.open_count}
            legend="Open Count"
          />
          {/*Plot-painting component here. */}
        </div>
      );
    }
  }
}

export class GenreSearchBox extends SearchBox {
  async search(e) {
    e.preventDefault();
    this.setState({ isLoading: true });
    const startDate = this.#formatDate(this.state.startDate);
    const endDate = this.#formatDate(this.state.endDate);
    const searchResult = await this.caller.request(startDate, endDate);
    this.setState({ searchResult });
    this.setState({ isLoading: false });
  }
  #formatDate(date) {
    let year = date.getFullYear().toString();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    month = month >= 10 ? month : "0" + month;
    day = day >= 10 ? day : "0" + day;
    return year + month + day;
  }
  render() {
    if (this.state.isLoading === true) {
      return <Loading />;
    } else {
      return (
        <div>
          <form
            className="search-form"
            onSubmit={async (e) => {
              await this.search(e);
            }}
          >
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
          </form>
          <BarChart
            x={this.state.searchResult.genre}
            y={this.state.searchResult.open_count}
            legend="Open Count"
          />
        </div>
      );
    }
  }
}
