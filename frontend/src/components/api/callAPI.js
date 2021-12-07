const axios = require("axios");

// Create axios instance.
const API = axios.create({
  BASE_URL: "",
  headers: {
    "Content-Type": "application/json",
  },
});

async function postAPI(stdate, edDate, cpage, rows) {
  try {
    const res = await API.post("http://localhost:5000/api", null, {
      params: {
        stdate: stdate,
        eddate: edDate,
        cpage: cpage,
        rows: rows,
      },
    });
    const data = res.data;
    return data;
  } catch (err) {
    const error = err;
    return error;
  }
}

module.exports = { postAPI };
