import React, { Component } from "react";
import Loading from "../public/Loading";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from "../shows/dateFormat";
import { subDays } from "date-fns";
import "../styles/Search.css";
import List from "../shows/List";

class SearchBox extends Component {
  constructor(props) {
    super();
    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      searchResult: [],
      isLoading: false,
    };
    this.caller = props.caller;
  }

  async search(e) {
    throw new Error("This is abstract method. Implementation required.");
  }

  renderDatePicker() {
    if (this.props.type === "double") {
      return (
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
      );
    } else if (this.props.type === "single") {
      return (
        <DatePicker
          selected={this.state.startDate}
          onChange={(date) => {
            this.setState({ startDate: date });
          }}
          dateFormat="yyyy-MM-dd(eee)"
        />
      );
    } else {
      return <h1>Unkown prop value: {this.props.type}</h1>;
    }
  }
}

export class ShowSearchBox extends SearchBox {
  async search(e) {
    e.preventDefault();
    const { startDateResult, endDateResult } = await formatDate(
      this.state.startDate,
      this.state.endDate
    );
    console.log(startDateResult, endDateResult);
    this.setState({ isLoading: true });
    const searchResult = await this.caller.request(
      startDateResult,
      endDateResult,
      1,
      5
    );
    this.setState({ searchResult });
    this.setState({ isLoading: false });
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
              {this.renderDatePicker()}
              <button className="submit-btn">Search</button>
            </div>
          </form>
          <List shows={this.state.searchResult} />
        </div>
      );
    }
  }
}

export class PlotSearchBox extends SearchBox {
  async search(e) {
    e.preventDefault();
    // 수정 요망: formatDate()의 매개변수는 startDate 하나일 수도 있고 startDate, endDate 두개일 수도 있음.
    const { startDateResult, endDateResult } = await formatDate(
      this.state.startDate,
      this.state.endDate
    );
    this.setState({ isLoading: true });
    // 수정 요망: caller.request()의 매개변수도 하나일 수도 있고 두개일 수도 있음.
    const searchResult = await this.caller.request(
      startDateResult,
      endDateResult
    );
    this.setState({ searchResult });
    this.setState({ isLoading: false });
  }

  render() {
    if (this.state.isLoading === true) {
      return <Loading />;
    } else {
      return (
        <div>
          <form
            className="search-form"
            onSubmit={async (e) => await this.search(e)}
          >
            <div className="search">
              {this.renderDatePicker()}
              <button className="submit-btn">Search</button>
            </div>
          </form>
        </div>
      );
    }
  }
}
