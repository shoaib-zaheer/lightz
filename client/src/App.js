import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import Axios from "axios";
import Header from "./components/layout/Header";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UserContext from "./context/UserContext";
import GitHubIcon from "@material-ui/icons/GitHub";
import "./style.css";
import MyPage from "./components/pages/MyPage";
import Contact from "./components/layout/Contact";
import About from "./components/pages/About";
import Tips from "./components/pages/Tips";
import ForgotPassword from "./components/password/ForgotPassword";
import NewPassword from "./components/password/NewPassword";
import EmailSent from "./components/messages/EmailSent";
import LightZ from "./components/landing-page/LightZ";
import Reports24h from "./components/reports24h/Repors24h";
import Reports3Days from "./components/reports3days/Reports3Days";
import PasswordReset from "./components/messages/PasswordReset";

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
        const userRes = await Axios.get("/api/", {
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
            <Route exact path="/lightz" component={LightZ} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/my-page" component={MyPage} />
            <Route path="/about" component={About} />
            <Route path="/tips" component={Tips} />
            <Route path="/sent" component={EmailSent} />
            <Route path="/reset" component={PasswordReset} />
            <Route path="/contact" component={Contact} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/reset-password/:token" component={NewPassword} />
            <Route path="/last24hours" component={Reports24h} />
            <Route path="/last3days" component={Reports3Days} />
          </Switch>
          <Navbar
            id="responsive-navbar-nav"
            className="justify-content-center text-center fixed-bottom text-white bg"
            expand="lg"
          >
            {/* <nav className="text-muted">Non profit app </nav> */}
            <Nav.Link
              className="text-white"
              href="https://github.com/NickMarinade/lightz"
            >
              <GitHubIcon /> GitHub
            </Nav.Link>
            @Copyright by LightZ
          </Navbar>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}
