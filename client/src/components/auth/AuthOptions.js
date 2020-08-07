import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import {Nav} from 'react-bootstrap';



export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };

  return (
    <nav className="auth-options">
      {userData.user ? (
        <Nav.Link onClick={logout}>Log out</Nav.Link>
      ) : (
        <Nav className="mr-auto">
          <Nav.Link onClick={register}>Register</Nav.Link>
          <Nav.Link onClick={login}>Log in</Nav.Link>
        </Nav>
      )}
    </nav>
  );
}
