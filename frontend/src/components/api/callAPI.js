const axios = require("axios");

// Create axios instance.
//const API = axios.create({
 // BASE_URL: "",
 // headers: {
   // "Content-Type": "application/json",
 // },
//});


async function api_get_request(stdate, edDate, cpage, rows) {
  try {
    const res = await axios.get("http://localhost:5000/api", {
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
		console.log(err)
  }
}

module.exports = { api_get_request };
