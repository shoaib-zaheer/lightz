import React from 'react';
import '../../App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, NavItem, Media, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import l from './l.png';
import z from './z.png';
import GitHubIcon from '@material-ui/icons/GitHub';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Main from './Main';
import About from './About';
import Register from './Register';
import Tips from './Tips';
import Map from './Map';



function RouterNavbar() {

  return (
    <Router>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Media>
    <img src={z} alt="logo" />
    <img src={l} alt="logo" />
  </Media>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
    <Nav.Link><LinkContainer to="/home"><NavItem >Home</NavItem></LinkContainer></Nav.Link>
    <Nav.Link><LinkContainer to="/about"><NavItem >About</NavItem></LinkContainer></Nav.Link>
      
    </Nav>
    <Nav>
    <Nav.Link><LinkContainer to="/register"><NavItem>Register</NavItem></LinkContainer></Nav.Link>
    <Nav.Link><LinkContainer to="/tips"><NavItem>Tips</NavItem></LinkContainer></Nav.Link>
    <Nav.Link><LinkContainer to="/map"><NavItem>Map</NavItem></LinkContainer></Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    <Switch>
            <Route exact path="/home" component={Main}/>
            <Route exact path="/about"component={About}/>
            <Route exact path="/register"component={Register}/>
            <Route exact path="/tips"component={Tips}/>
            <Route exact path="/map"component={Map}/>
    </Switch>
  <Navbar id="responsive-navbar-nav" className="justify-content-center text-center fixed-bottom"  color="dark" expand="lg" bg="dark" variant="dark">
  <Navbar.Brand className="text-muted">Non profit app </Navbar.Brand>
  <Nav.Link className="text-white" href="https://github.com/KLisabeth/-Do-you-have-electricity-"><GitHubIcon/>  GitHub</Nav.Link>
  @Copyright by LightZ
</Navbar>
  </Router>
  );
}

export default RouterNavbar;