import React from "react";
import '../../../App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, NavItem, Media, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
//import Login from '../auth/Login'
import l from './l.png';
import z from './z.png';
import AuthOptions from '../auth/AuthOptions';

export default function Header() {
  return (
    <>
  <Navbar id="header"collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Media>
    <img src={z} alt="logo" />
    <img src={l} alt="logo" />
  </Media>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
    <Nav.Link><LinkContainer to="/"><NavItem>Home</NavItem></LinkContainer></Nav.Link>
    <Nav.Link><LinkContainer to="/about"><NavItem >About</NavItem></LinkContainer></Nav.Link>
    <Nav.Link><LinkContainer to="/tips"><NavItem>Tips</NavItem></LinkContainer></Nav.Link>
    <Nav.Link><LinkContainer to="/map"><NavItem>Map</NavItem></LinkContainer></Nav.Link>
   <Navbar expanded className="mr-4">
 
  
  </Navbar>
   </Nav>
    <Nav>
    <AuthOptions/>
     </Nav>
  </Navbar.Collapse>
</Navbar>
    </>
  );
}
