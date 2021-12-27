const axios = require("axios");
export class Genre {
  async request(stDate, edDate) {
    this.url = `http://localhost:8000/api/genre?stdate=${stDate}&eddate=${edDate}`;
    try {
      const response = await axios.get(this.url);
      return response.data;
    } catch (err) {
      console.log(err);
      return 400;
    }
  }
}

export class DayStat {
  async request(stDate) {
    this.url = `http://localhost:8000/api/day?stdate=${stDate}`;
    try {
      const response = await axios.get(this.url);
      return response.data;
    } catch (err) {
      console.log(err);
      return 400;
    }
  }
}

export class Shows {
  async request(stDate, edDate, cPage, rows) {
    this.url = `http://localhost:5000/api?stdate=${stDate}&eddate=${edDate}&cpage=${cPage}&rows=${rows}`;
    try {
      const result = await axios.get(this.url);
      return result.data.dbs.db;
    } catch (err) {
      console.log(err);
      return 400;
    }
  }
}
