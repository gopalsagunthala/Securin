import {useNavigate} from "react-router-dom";
const Pagination = ({item}) => {
  const navigate  = useNavigate();
  const publishedDate = item.cve.published.split("T")[0];
  const modifiedDate = item.cve.lastModified.split("T")[0];


function formatDate(dateString) {
  const parts = dateString.split("-");
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const day = parts[2];
  const month = months[parseInt(parts[1]) - 1];
  const year = parts[0];

  return `${day} ${month} ${year}`;
}

const formattedPublishedDate = formatDate(publishedDate);
const formattedModifiedDate = formatDate(modifiedDate);
const getDetails = (id)=>{
  navigate(`/cves/${id}`)
}
  return ( 
    <tr onClick={()=>getDetails(item.cve.id)}>
    <td>{item.cve.id}</td>
    <td>{item.cve.sourceIdentifier}</td>
    <td>{formattedPublishedDate}</td>
    <td>{formattedModifiedDate}</td>
    <td>{item.cve.vulnStatus}</td>
  </tr>
   );
}
 
export default Pagination;