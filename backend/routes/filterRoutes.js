const express = require("express");
const router = express.Router();
const {filterById,filterByYear} = require("../controllers/filterController")
router.get("/cveId/:id",filterById)
router.get("/cveYear/:year",filterByYear);
module.exports = router;