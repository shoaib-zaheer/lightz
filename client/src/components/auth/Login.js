import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { Button } from 'react-bootstrap'
import UserContext from "../../context/UserContext";
import Axios from "axios";
import ErrorNotice from "../misc/ErrorNotice";




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
        "/api/login",
        loginUser
      );
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
      <h2>Log in</h2>
      {error && (<ErrorNotice message={error} clearError={() => setError(undefined)} />)}
      <form className="form" onSubmit={submit}>
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="login-password">Password</label>
        <input
          autoComplete="false"
          id="login-password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button className="log btn-1 btn-warning" type="submit" value="Log in">Log in</Button>
        <Link to="/" className="btn mr-3 btn-link">Cancel</Link>

        <Link to="/forgot-password" className="btn ml-5 btn-link">Forgot password?</Link>

      </form>
    </div>
  );
}
