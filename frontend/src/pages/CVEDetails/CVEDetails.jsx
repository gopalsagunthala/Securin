import {useParams} from "react-router-dom";
import {useEffect,useState} from "react";
import "./CVEDetails.css";
const CVEDetails = ({match}) => {
  const [details,setDetails] = useState(null); 
  const {id} = useParams();
  useEffect(()=>{
    const fetchData = async ()=>{
      const response = await fetch(`/api/filter/cveId/${id}`);
      if(!response.ok)
      {
        throw Error("Record is not fetched");
      }
      const data = await response.json();
      const item = data[0];
      setDetails(item);
      console.log(item);
    }
    fetchData();
  },[])
  return ( 
    <div>
      {details && (
        <>
        <h1>{details.cve.id}</h1>
        {details.cve.descriptions.map((item)=>{
          return <li style={{listStyleType:"square"}}>{item.value}</li>})}
        <h2>CVSS V2 METRICS:</h2>
        <div className="metrics">
        {details.cve.metrics.cvssMetricV2.map((item)=>{
          return( <><li style={{listStyleType:"square"}}>{`Severity: ${item.baseSeverity}`}</li>
          <li style={{listStyleType:"square"}}>{`Score: ${item.cvssData.baseScore}`}</li>
          </>)})}
        </div>
        <table>
          <tr>
            <th>Access Vector</th>
            <th>Access  Complexity</th>
            <th>Authentication</th>
            <th>Confidentiality Impact</th>
            <th>Integrity Impact</th>
            <th>Availability Impact</th>
          </tr>
          {details.cve.metrics.cvssMetricV2.map((item)=>{
          return( <>
            <tr>
              <td>{`${item.cvssData.accessVector}`}</td>
              <td>{`${item.cvssData.accessComplexity}`}</td>
              <td>{`${item.cvssData.authentication}`}</td>
              <td>{`${item.cvssData.confidentialityImpact}`}</td>
              <td>{`${item.cvssData.integrityImpact}`}</td>
              <td>{`${item.cvssData.availabilityImpact}`}</td>
            </tr>
          </>)})}
        </table>
        <h2>Scores: </h2>
        {details.cve.metrics.cvssMetricV2.map((item)=>{
          return( <>
              <p>{`Exploitability Score: ${item.exploitabilityScore}`}</p>
              <p>{`Impact Score: ${item.impactScore}`}</p>
          </>)})}
        </>
      )}
    </div>
   );
}
 
export default CVEDetails;