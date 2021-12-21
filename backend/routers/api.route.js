const express = require("express");
const { getAPI } = require("../controllers/api.controller");
const router = express.Router();

router.get("/", getAPI);

module.exports = router;
