import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button} from 'react-bootstrap';
import {useForm} from "react-hook-form";


export default function Register() {
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const {reset} = useForm();


  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { email, password, passwordCheck, userName };
      await Axios.post("http://localhost:8080/api/register", newUser);
      const loginRes = await Axios.post("http://localhost:8080/api/login", {
        email,
        password,
      });
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
   
    <Form className=" col justify-content-center">
      <h2>Register</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <Form.Group  onSubmit={submit}>
        <Form.Label htmlFor="register-user-name">User name</Form.Label>
        <Form.Control
          id="register-user-name"
          type="text"
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
        <Form.Label htmlFor="register-email">Email</Form.Label>
        <Form.Control
          id="register-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <Form.Label htmlFor="register-password">Password</Form.Label>
        <Form.Control
          id="register-password"
          type="password"
          autoComplete='false'
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <Form.Control
          type="password"
          placeholder="Verify password"
          autoComplete='false'
          onChange={(e) => setPasswordCheck(e.target.value)}
        />
       <br />
      <Button variant="secondary" size="md"  active type="submit" onClick={() => reset("setUserData")}>Cancel</Button>
      <Button className="button" variant="primary" size="md" active type="submit">Register</Button>
      </Form.Group>
    </Form>
  );
}
