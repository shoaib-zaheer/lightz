import React, { useContext } from "react";
import Have3days from "./Have3days";
import No3days from "./No3Days";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap'
import UserContext from "../../context/UserContext";
import Report from '../../modal/Report'
import { useHistory, Link } from "react-router-dom";



export default function Reports3Days() {

  const { userData } = useContext(UserContext);
 
  const history = useHistory();

  function handleChange(value) {
    history.push(`/${value}`);
  }


  

  return (
    <div className="page">
    {userData.user ? (
    <div className="justify-content-center">
    <h2>All reports for last 3 days</h2>
    <select className="custom-select mod" name="state" onChange={event => handleChange(event.target.value)}>
        <option >All reports for last 3 days</option>
        <option value="">All reports for all the time</option>
        <option value="last24hours">All reports for last 24 hours</option>
   </select>
    <h2>Welcom {userData.user.userName}</h2>
      <Report/>
      <Container>
  <Row xs={1} md={2}>
  <Col><Have3days/></Col>
  <Col><No3days/></Col>
 </Row>
 </Container>
 </div>
      
      ) : (
  <div>
  <h2>All reports for last 3 days</h2>
  <select className="custom-select mod" name="state" onChange={event => handleChange(event.target.value)}>
        <option>All reports for last 3 days</option>
        <option value="">All reports for all the time</option>
        <option value="last24hours">All reports for last 24 hours</option>
   </select>
  <h6 className="justify-content-center">Please <span><Link to="/login">Log in</Link></span>  or <span><Link to="/register">Register</Link></span> to make a report</h6>
      <Container>
  <Row xs={1} md={2}>
  <Col><Have3days/></Col>
  <Col><No3days/></Col>
 </Row>
 </Container>
 </div>  
    )
}
<p className="m-4 p-2"></p>
</div>
      );
}
