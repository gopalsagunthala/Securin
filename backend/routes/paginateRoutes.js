const express = require("express");
const router = express.Router();
const {getVulnerabilities} = require("../controllers/paginateController")
router.get("/:page/:limit",getVulnerabilities)

module.exports = router;