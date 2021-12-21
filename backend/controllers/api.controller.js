const axios = require("axios");
const convert = require("xml2js");
const redis = require("./redisCache");
require("dotenv").config();
const parser = new convert.Parser();

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

// Redis Caching class
const cache = new redis();
// Open connection to Reids server
cache.connectServer();

async function getAPI(req, res) {
  // Query strings from request
  const stdate = req.query.stdate;
  const eddate = req.query.eddate;
  const cpage = req.query.cpage;
  const rows = req.query.rows;
  console.log(stdate, eddate, cpage, rows);

  // KOPIS API Request url.
  const url = `${API_BASE_URL}?${API_KEY_NAME}=${API_KEY_VALUE}&stdate=${stdate}&eddate=${eddate}&cpage=${cpage}&rows=${rows}`;

  // Redis key.
  const redis_key = `/api/?stdate=${stdate}&eddate=${eddate}&cpage=${cpage}&rows=${rows}`;
  try {
    // If data exists in redis server:
    if (await cache.does_exist(redis_key)) {
      console.log(`${redis_key} exists`);
      // Retrieve the data
      const cacheData = await cache.getCache(redis_key);
      res.status(200).json(cacheData);
    } else {
      console.log(`\n${redis_key} doesn't exist... Requesting\n`);

      // Or call api to get data.
      const apiResponse = await axios.get(url);

      // Convert xml to object
      let result = null;
      parser.parseString(apiResponse.data, (err, obj) => {
        if (err) console.log(err);
        result = obj;
      });

      // Save object in redis and send as json
      await cache.setCache(redis_key, JSON.stringify(result));
      res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = { getAPI };
