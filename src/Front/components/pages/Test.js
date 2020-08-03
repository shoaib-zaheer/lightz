import React, { useState, useEffect } from 'react';
import Axios from "axios";



 
export default function Test() {
    
    const [reports, setReports] = useState([]);
    const [url, setState] = useState(`http://localhost:8080/api/reports`);
     
    useEffect(() => {
        const loadData = async () => {
          try {
            const response = await Axios.get(url, );
            // console.log(response);
            setReports(response.data)
                

          } catch (error) {
            console.log(error)
          }
        };
      
        loadData();
      
      }, [url]);

     
      
    
    //   const date_time = new Date();
    //   const formatedDate = `${date_time.toDateString()} ${date_time.toLocaleDateString()}`
      
    //     const map = new Map();
    //     response.forEach(v => map.set(v.stateName, v)) // having `abc_buildingid` is always unique
    //     return [...map.values()];
    //   }
      
      if (!reports) {
        return <div className="App">Loading...</div>;
      }
    //   var unique = [...new Set(reports.map(p => p.reports.))];
     //if (reports.includes(reports.answer) === false)reports.push(reports);
       return (
        <div className="App">
          {reports.map((item, idx) => (
              <ul key={idx}>
              <li>{}</li>
            <li>{item.date}</li>
            <li>{item.stateName}</li>
            </ul>
          ))}
        </div>
      );
      
}
   
