import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {Nav, Navbar} from 'react-bootstrap';
import GitHubIcon from '@material-ui/icons/GitHub';
import Axios from "axios";
import Header from "./Front/components/layout/Header";
import Home from "./Front/components/pages/Home";
import Login from "./Front/components/auth/Login";
import Register from "./Front/components/auth/Register";
import About from "./Front/components/pages/About";
import Tips from "./Front/components/pages/Tips";
import Map from "./Front/components/pages/Map";
import UserContext from "./Front/context/UserContext";
import MyPage from "./Front/components/pages/MyPage";

//import "./style.css";

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(
        "http://localhost:8080/api/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get("http://localhost:8080/api/", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/about"component={About}/>
              <Route path="/tips"component={Tips}/>
              <Route path="/map"component={Map}/>
              <Route path="/my-page"component={MyPage}/>
            </Switch>
        <Navbar id="responsive-navbar-nav" className="justify-content-center text-center fixed-bottom"  color="dark" expand="lg" bg="dark" variant="dark">
        <Navbar.Brand className="text-muted">Non profit app </Navbar.Brand>
        <Nav.Link className="text-white" href="https://github.com/KLisabeth/-Do-you-have-electricity-"><GitHubIcon/>  GitHub</Nav.Link>
          @Copyright by LightZ
       </Navbar>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
