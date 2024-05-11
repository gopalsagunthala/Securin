const Vulnerability = require('../models/cveModel');

const fetchCve = async (req, res) => {
  try {
    let startIndex = 0;
    while(true){
      const response = await fetch(`https://services.nvd.nist.gov/rest/json/cves/2.0/?resultsPerPage=2000&startIndex=${startIndex}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .catch((err)=>console.log(err));
      const insert = await insertCve(response.vulnerabilities);
      console.log(insert);
      startIndex += 2000;
      if(startIndex>=response.totalResults)
      {
        break;
      }
      await new Promise(resolve => setTimeout(resolve, 5000));
      console.log(startIndex);
      console.log(response.totalResults)
    }
    return res.json("hello");
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const insertCve = async (response) => {
  for (let i = 0; i < response.length; i++) {
    try {
      const data = await Vulnerability.create(response[i]);
    } catch (error) {
        return error.message; 
    }
  }
  return "Insertion Success";
};

module.exports = { fetchCve };

