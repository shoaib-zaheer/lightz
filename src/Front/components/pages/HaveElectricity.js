import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';  
import {Table, Badge} from 'react-bootstrap'

function HaveElectricity () {  
    const [data, setData] = useState([]);
  
    useEffect(() => {  
      
        Axios  
            .get("http://localhost:8080/api/city")  
            .then(result => setData(result.data));  
            
        console.log('data');  
        
    }, []); 

    return (  
        <div>  
            <div className="row" style={{ 'margin': "10px" }}>  
                <div className="col btn btn-info">  
                    Have electricity  
                 </div>  
            </div>  
            <Table responsive >  
                <thead className="thead-dark">  
                    <tr> 
                        <th>#</th>
                        <th scope="col">State</th>  
                        <th scope="col">Cities</th> 
                    </tr>  
                </thead>  
                <tbody>  
                    {data.map(i => {  
                        return <tr key={i.Id}>
                         <td>{i.State}</td>
                         <td><Badge pill variant="secondary">{i.total}</Badge></td> 
                        </tr>  
                    })}  
                </tbody>  
            </Table>  
  
        </div>  
    )  
}  
  
export default HaveElectricity ;