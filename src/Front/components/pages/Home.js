import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from 'react-router-dom'
//import {Col, Row} from 'react-bootstrap';
//import NoElectricity from './NoElectricity';
//import HaveElectricity from './HaveElectricity';

export default function Home() {
  const { userData } = useContext(UserContext);

  return (
    <div className="page">
      {userData.user ? (
        <h1>Welcome {userData.user.userName}</h1>
      ) : (
        <>
        <div className="page">
      {userData.user ? (
        <h1>Welcome {userData.user.userName}</h1>
      ) : (
        <>
          <h2>You are not logged in</h2>
          <Link to="/login">Log in</Link>
        </>
      )}
    </div>
         
      </>
      )}
    </div>
  );
}
