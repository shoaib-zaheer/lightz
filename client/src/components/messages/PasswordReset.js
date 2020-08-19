import React , {useState}from 'react';
import {Alert} from 'react-bootstrap'
import { Link } from "react-router-dom";

function PasswordReset() {
     // eslint-disable-next-line
    const [show, setShow] = useState(true);

    return (
      <div className="page text-center">
        <Alert show={show} variant="success">
          <Alert.Heading className="d-flex justify-content-center">SUCCESS!</Alert.Heading>
          <h2> Your password was reset!</h2>
          <h3>
           Please login with your new password
          </h3>
         
          <hr />
          <div className="d-flex justify-content-end">
          <Link className="btn btn-outline-success"  to="/login">Close</Link>
          </div>
        </Alert>

      </div>
    );
  }


export default PasswordReset;
