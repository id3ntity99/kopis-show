const express = require("express");
const apicache = require("apicache");
const { getAPI } = require("../controllers/api.controller");
const router = express.Router();

let cache = apicache.middleware;

router.post("/", cache("2 minute"), getAPI);

module.exports = router;
