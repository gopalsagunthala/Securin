const Vulnerability = require("../models/cveModel");

const getVulnerabilities = async (req, res) => {
  let { page, limit } = req.params;
  let totalRecords = 246817;
  const { id, year, score, ndays } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);
  const skip = (page - 1) * limit;

  try {
    let query = Vulnerability.find();
    let countQuery = Vulnerability.find();

    if (id) {
      query = query.where('cve.id').equals(id);
      countQuery = countQuery.where('cve.id').equals(id);
    }
    if (year) {
      const startDate = new Date(`${Number(year)}-01-01T00:00:00.000Z`);
      const endDate = new Date(`${Number(year) + 1}-01-01T00:00:00.000Z`);
      query = query.where('cve.published').gte(startDate).lt(endDate);
      countQuery = countQuery.where('cve.published').gte(startDate).lt(endDate); 
    }
    if (score) {
      query = query.where('cve.metrics.cvssMetricV2.0.cvssData.baseScore').equals(Number(score));
      countQuery = countQuery.where('cve.metrics.cvssMetricV2.0.cvssData.baseScore').equals(Number(score));
    }

    if (ndays) {
      const dateNdaysAgo = new Date();
      dateNdaysAgo.setDate(dateNdaysAgo.getDate() - ndays);
      query = query.where('cve.lastModified').gte(dateNdaysAgo);
      countQuery = countQuery.where('cve.lastModified').gte(dateNdaysAgo);
    }

    const totalRecordsQuery = await countQuery.countDocuments();

    const result = await query.skip(skip).limit(limit);

    return res.status(200).json({ result: result, records: totalRecordsQuery });
  } catch (error) {
    return res.json({ error: error.message });
  }
};

module.exports = { getVulnerabilities };

