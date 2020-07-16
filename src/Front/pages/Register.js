import React, { useRef, useState } from "react";
import {useForm} from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button} from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';


function Register () {
  const [show, setShow] = useState(true);

  const { register, errors, handleSubmit, reset, watch} = useForm("message");

  const password = useRef({});

  password.current = watch("password", "");
 
  const onSubmit = data =>{
    console.log(data);
  }

  return (
  <div className="Register row justify-content-center">
    <Form onSubmit={e => e.preventDefault()}>
    <Form.Label>Your name</Form.Label>
    <Form.Control name="name" type="text" ref={register({ required:"Please enter you name"})} />
    {errors.name && show && <Alert onClose={() => setShow(false)} dismissible variant="danger"><Alert.Link>{errors.name.message}</Alert.Link></Alert>}
    <br />
    <Form.Label>Email address</Form.Label>
    <Form.Control size="lg" type="text" name="email" ref={register({required:"Please enter you email"})} />
    {errors.email && show && <Alert onClose={() => setShow(false)} dismissible variant="danger"><Alert.Link>{errors.email.message}</Alert.Link></Alert>}
    <br />
    <Form.Label>Password</Form.Label>
    <Form.Control
      size="lg"
      name="password"
      type="password"
      autoComplete='false'
      ref={register({
        required: "You must specify a password",
        minLength: {
        value: 6,
        message: "Password must have at least 6 characters"
        }
      })}
    />
    {errors.password && show && <Alert onClose={() => setShow(false)} dismissible variant="danger"><Alert.Link>{errors.password.message}</Alert.Link></Alert>}
    <br />
    {errors.password_repeat && <Alert onClose={() => setShow(false)} dismissible variant="danger"><Alert.Link> {errors.password_repeat.message}</Alert.Link></Alert>}
    <Form.Label>Repeat password</Form.Label>
    <Form.Control
      size="lg"
      name="password_repeat"
      type="password"
      autoComplete='false'
      ref={register({
        validate: value =>
          value === password.current || "The passwords do not match"
      })}
    />
    <Button variant="secondary" size="md"  active type="submit" onClick={() => reset('data')}>Cancel</Button>
    <Button className="button" variant="primary" size="md" active type="submit" onClick={handleSubmit(onSubmit)} >Register</Button>
  </Form>
</div>
  );
};

export default Register;
