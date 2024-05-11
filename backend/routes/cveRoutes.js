const express = require("express");
const {fetchCve} = require("../controllers/cveController.js");
const router = express.Router();

router.get("/",fetchCve)

module.exports = router;