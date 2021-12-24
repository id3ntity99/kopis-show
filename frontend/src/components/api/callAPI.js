const axios = require("axios");

// Abstract Class -- This class can't be isntantiated.
class Request {
  constructor() {
    // Initiate attributes
    this.startDate = null;
    this.endDate = null;
    this.cPage = null;
    this.rows = null;
  }

  // Abstract Method
  request() {
    // Throw error if user attempt to instantiate.
    throw new Error("This is an abstract method. Implementaion required.");
  }
}

export class Genre extends Request {
  // Contructor is here because Request class can't be instantiated.
  constructor(stDate, edDate) {
    super();
    this.startDate = stDate;
    this.endDate = edDate;
  }
  async request() {
    this.url = `http://localhost:8000/api/genre?stdate=${this.startDate}&eddate=${this.endDate}`;
    try {
      const response = await axios.get(this.url);
      return response.data;
    } catch (err) {
      console.log(err);
      return 400;
    }
  }
}

export class DayStat extends Request {
  // Contructor is here because Request class can't be instantiated.
  constructor(stDate) {
    super();
    this.startDate = stDate;
  }
  async request() {
    this.url = `http://localhost:8000/api/day?stdate=${this.startDate}`;
    try {
      const response = await axios.get(this.url);
      return response.data;
    } catch (err) {
      console.log(err);
      return 400;
    }
  }
}

export class Shows extends Request {
  // Contructor is here because Request class can't be instantiated.
  constructor(stDate, edDate, cPage, rows) {
    super();
    this.startDate = stDate;
    this.endDate = edDate;
    this.cPage = cPage;
    this.rows = rows;
  }
  async request() {
    this.url = `http://localhost:5000/api?stdate=${this.startDate}&eddate=${this.endDate}&cpage=${this.cPage}&rows=${this.rows}`;
    try {
      const result = await axios.get(this.url);
      return result.data.dbs.db;
    } catch (err) {
      console.log(err);
      return 400;
    }
  }
}

//export default Shows;
