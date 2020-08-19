import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { Button } from 'react-bootstrap'
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";


export default function Register() {
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [error, setError] = useState();

  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { userName, email, password, passwordCheck };
      await Axios.post("/api/register", newUser);
      const loginRes = await Axios.post("/api/login", {
        email,
        password,
      });
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem("auth-token", loginRes.data.token);
      history.push("/my-page");
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="page">
      <h2>Register</h2>
      {error && (<ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form className="form" onSubmit={submit}>
        <label htmlFor="register-user-name">User name</label>
        <input
          id="register-user-name"
          type="text"
          onChange={(e) => setUserName(e.target.value)}
        />

        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          type="password"
          autoComplete="false"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Verify password"
          autoComplete="false"
          onChange={(e) => setPasswordCheck(e.target.value)}
        />

        <Button className="log btn btn-1 btn-warning" type="submit" value="Register">Register</Button>
        <Link to="/" className="btn btn-link">Cancel</Link>
      </form>
    </div>
  );
}
