const Vulnerability = require("../models/cveModel");

const filterById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const filteredData = await Vulnerability.find({ 'cve.id': id });
  if (filteredData.length > 0) {
    res.status(200).json(filteredData);
  } else {
    res.status(404).json({ error: 'CVE ID not found' });
  }
};

const filterByYear = async (req, res) => {
  const { year } = req.params;
  console.log(year);
  console.log(`${year}-01-01T00:00:00.000Z`);
  try {
    const filteredData = await Vulnerability.find({
      'cve.published': {
        $gte: new Date(`${Number(year)}-01-01T00:00:00.000Z`),
        $lt: new Date(`${Number(year) + 1}-01-01T00:00:00.000Z`),
      },
    });
    if (filteredData.length > 0) {
      res.status(200).json(filteredData);
    } else {
      res.status(404).json({ error: 'CVE Year not found' });
    }
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = { filterById, filterByYear };
