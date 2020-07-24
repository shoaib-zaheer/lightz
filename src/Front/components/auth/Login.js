import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Navbar, Button } from 'react-bootstrap';




export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();
  

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await Axios.post(
        "http://localhost:8080/api/login",
        loginUser
      );
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/");
    } catch (err) {
     err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (
    <Navbar className=" col justify-content-center">
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <Form inline  onSubmit={submit}>
       
        <Form.Control
         className="mr-1"
         size="sm"
         placeholder="Email address" 
         id="login-email"
         type="email"
         onChange={(e) => setEmail(e.target.value)}
        />

       
        <Form.Control
          className="mr-1"
          size="sm"
          placeholder="Password"
          id="login-password"
          type="password"
          autoComplete='false'
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="outline-secondary" size="sm" type="submit">Login</Button>
        
      </Form>
    </Navbar>
  );
}
