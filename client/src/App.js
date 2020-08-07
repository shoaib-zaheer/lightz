import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {Nav, Navbar} from 'react-bootstrap';
import Axios from "axios";
import Header from "./components/layout/Header";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UserContext from "./context/UserContext";
import GitHubIcon from '@material-ui/icons/GitHub';
import "./style.css";
import MyPage from "./components/pages/MyPage";
import About from "./components/pages/About";
import Tips from "./components/pages/Tips";

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
        "/api/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      if (tokenRes.data) {
        const userRes = await Axios.get(
          "/api",
          {
            headers: { "x-auth-token": token },
          }
        );
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
              <Route path="/my-page" component={MyPage} />
              <Route path="/about" component={About} />
              <Route path="/tips" component={Tips} />
            </Switch>
          <Navbar id="responsive-navbar-nav" className="justify-content-center text-center fixed-bottom"  color="dark" expand="lg" bg="dark" variant="dark">
        {/* <nav className="text-muted">Non profit app </nav> */}
        <Nav.Link className="text-white" href="https://github.com/KLisabeth/-Do-you-have-electricity-"><GitHubIcon/>  GitHub</Nav.Link>
          @Copyright by LightZ
          </Navbar>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
