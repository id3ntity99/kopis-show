//const request = require("request");
const axios = require("axios");
const convert = require("xml-js");
require("dotenv").config();

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

async function getAPI(req, res) {
  const stdate = req.query.stdate;
  const eddate = req.query.eddate;
  const cpage = req.query.cpage;
  const rows = req.query.rows;
  console.log(stdate, eddate, cpage, rows);
  const url = `${API_BASE_URL}?${API_KEY_NAME}=${API_KEY_VALUE}&stdate=${stdate}&eddate=${eddate}&cpage=${cpage}&rows=${rows}`;
  let result;
  await axios
    .get(url)
    .then((res) => {
      result = convert.xml2js(res.data, { compact: true, spaces: 4 });
    })
    .catch((err) => {
      console.log(`Request FAIL // REQUEST_URL = ${url} Errors:\n`, err);
    });

  res.status(200).json(result);
}

module.exports = { getAPI };
