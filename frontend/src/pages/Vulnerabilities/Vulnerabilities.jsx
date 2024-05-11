import { useState, useEffect } from 'react';
import SingleCve from "../../components/SingleCve";
import "./Vulnerabilities.css";
const VulnerabilityList = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(Math.ceil(248617 / limit));
  const [id,setId] = useState('');
  const [year,setYear] = useState('');
  const [score,setScore] = useState('');
  const [ndays,setNdays] = useState(''); 
  const [records,setRecords] = useState(248617);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = `/api/paginate/${page}/${limit}`;
        if (id!=="") {
          apiUrl += `?id=${id}`;
        }
        if(year!=="")
        {
          apiUrl+=`?year=${year}`;
        }
        if(score!=="")
        {
            apiUrl+=`?score=${score}`;
        }

        if(ndays!=="")
        {
            apiUrl+=`?ndays=${ndays}`
        }
        console.log(apiUrl);
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setData(data.result);
        setRecords(data.records);
        setTotalPages(Math.ceil(records/limit));
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [page,limit,id,year,score,ndays]);

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setPage((nextPage) => Math.min(nextPage + 1, totalPages));
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value);
    setLimit(newLimit);
    setPage(1); 
    setTotalPages(Math.ceil(248617 / newLimit)); // Recalculate totalPages with the new limit
  };
  

  const renderPageNumbers = () => {
    const pagesToShow = 5;
    const pageNumbers = [];
    let startPage = Math.max(1, page - Math.floor(pagesToShow / 2));
    for (let i = 0; i < pagesToShow && startPage <= totalPages; i++) {
      pageNumbers.push(startPage);
      startPage++;
    }

    return (
      <>
        <button onClick={() => setPage(1)} disabled={page === 1} className="first">
          First
        </button>
        <button onClick={handlePrevPage} disabled={page === 1} className="prev">
          Prev
        </button>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            className={pageNumber === page ? 'active' : ''}
          >
            {pageNumber}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={page === totalPages} className="next">
          Next
        </button>
        <button onClick={() => setPage(totalPages)} disabled={page === totalPages} className="first">
          Last
        </button>
      </>
    );
  };

  return (
    <>
      <div className="vulnerabilities">
      <h1>CVE LIST</h1>
      <label className="label">FILTERS:</label>
      <input type="text" value={id} placeholder="Cve Id" onChange={(e)=>{setId(e.target.value)}}/>
      <input type="text" value={year} onChange={(e)=>{setYear(e.target.value)}} placeholder="Published Year"/>
      <input type="text" value={score} onChange={(e)=>{setScore(e.target.value)}} placeholder="Score"/>
      <input type="text" value={ndays} onChange={(e)=>{setNdays(e.target.value)}} placeholder="Last Modified in N days"/>
    <div className="container">
      <table>
        <tr>
          <th>CVE ID</th>
          <th>IDENTIFIER</th>
          <th>PUBLISHED DATE</th>
          <th>LAST MODIFIED DATE</th>
          <th>STATUS</th>
        </tr>
        {data && data.map((item)=>(
          <SingleCve item={item}/>
        ))}
      </table>
      <div className="SingleCve">
        {renderPageNumbers()}
        <div>
          <label htmlFor="">Results Per Page:</label>
        <select name="" id="" onChange={handleLimitChange} value={limit}>
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        </div>
      </div>
        <p>{`${page*limit-limit+1}-${page*limit} of ${records} records`}</p>
    </div>
      </div>
    </>
  );
};

export default VulnerabilityList;
