import Vulnerabilities from "./pages/Vulnerabilities/Vulnerabilities"
import CVEDetails from "./pages/CVEDetails/CVEDetails"

import {BrowserRouter,Routes,Route} from "react-router-dom"
const App = () => {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/cves/list" element={<Vulnerabilities/>}/>
        <Route path="/cves/:id" element={<CVEDetails/>}/>
      </Routes>
    </BrowserRouter>
   );
}
 
export default App;