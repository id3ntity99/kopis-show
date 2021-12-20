const axios = require("axios");

require("dotenv").config();

class Request {
	constructor(url) {
		this.url = url;
	}
	request(url) {
		try {
			const res = axios.get(this.url).then((result) => {
				return result.data;
			});
			return res;
		} catch (err) {
			console.log(err);
		}
	}
}

class Genres {
	#startDate;
	#endDate;
	#url;
	#requester;
	constructor(stDate, edDate) {
		this.#startDate = stDate;
		this.#endDate = edDate;
		this.#url = `http://localhost:8000/api/genre?stdate=${this.startDate}&eddate=${this.endDate}`;
		this.#requester = new Request(this.#url);
	}
	get getGenres() {
		return this.#requester.request();
	}
}

class DateRes {
	#startDate;
	#url;
	#requester;
	constructor(stDate) {
		this.#startDate = stDate;
		this.#url = "http://localhost:8000/api/day?stdate=202106";
		this.#requester = new Request();
	}
	get getDateStat() {
		return this.#requester.request(this.url);
	}
}

class Shows {
	#url;
	#requester;
	constructor(stDate, edDate, cPage, rows) {
		this.#url = `http://localhost:5000/api?stdate=${stDate}&eddate=${edDate}&cpage=${cPage}&rows=${rows}`;
		this.#requester = new Request(this.#url);
	}
	get getShows() {
		return this.#requester.request();
	}
}

export { Shows, DateRes, Genres };
