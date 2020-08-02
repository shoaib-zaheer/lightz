import React from "react";
import HaveElectricity from "./HaveEl";
import NoElectricity from "./NoEl";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row, Col} from 'react-bootstrap'


export default function Home() {
 

  return (
    
    <Container>
    <Row xs={1} md={2}>
    <Col><HaveElectricity/></Col>
    <Col><NoElectricity/></Col>
   </Row>
   </Container>
   
  );
}
