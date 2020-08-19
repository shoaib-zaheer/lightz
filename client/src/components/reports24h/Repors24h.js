import React, { useContext } from "react";
import Have24h from "./Have24h";
import No24h from "./No24h";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap'
import UserContext from "../../context/UserContext";
import Report from '../../modal/Report'
import { useHistory, Link } from "react-router-dom";



export default function Reports24h() {

  const { userData } = useContext(UserContext);
 
  const history = useHistory();

  function handleChange(value) {
    history.push(`/${value}`);
  }


  

  return (
    <div className="page">
    {userData.user ? (
    <div className="justify-content-center">
    <h2>Reports for last 24 hours</h2>
    <select className="custom-select mod" name="state" onChange={event => handleChange(event.target.value)}>
        <option >Reports for last 24 hours</option>
        <option value="">All reports</option>
        <option value="last3days">Reports for last 3 days</option>
   </select>
    <h2>Welcome {userData.user.userName}</h2>
      <Report/>
      <Container>
  <Row xs={1} md={2}>
  <Col><Have24h/></Col>
  <Col><No24h/></Col>
 </Row>
 </Container>
 </div>
      
      ) : (
  <div>
  <h2>Reports for last 24 hours</h2>
  <select className=" custom-select mod" name="state" onChange={event => handleChange(event.target.value)}>
        <option>Reports for last 24 hours</option>
        <option value="">All reports</option>
        <option value="last3days">Reports for last 3 days</option>
   </select>
  
  <h6 className="justify-content-center">Please <span><Link to="/login">Log in</Link></span>  or <span><Link to="/register">Register</Link></span> to make a report</h6>
      <Container>
  <Row xs={1} md={2}>
  <Col><Have24h/></Col>
  <Col><No24h/></Col>
 </Row>
 </Container>
 </div>  
    )
}
<p className="m-4 p-2"></p>
</div>
      );
}
