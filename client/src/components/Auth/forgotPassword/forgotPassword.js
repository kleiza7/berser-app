import React, { useState } from "react";
import { Container, Form, Input, Button } from "reactstrap";
import "../Auth.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { forgotPassword } from "../../../actions/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  about: "",
  place: "",
  website: "",
  dateOfBirth: "",
  password: "",
  confirmPassword: "",
  profileImage: "",
};

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(initialState);

  const submitHandler = (e) => {
    //buraya inputları kontrol mekanizması yerleştirebilirsin
    e.preventDefault();

    dispatch(forgotPassword(formData));
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container className={"authContainer"}>
      <Container></Container> {/*simge için*/}
      <Form className={"form"} onSubmit={submitHandler}>
        <Container className={"inputContainer"}>
          <div>Email *</div>
          <Input
            name="email"
            type="email"
            placeholder=""
            onChange={changeHandler}
          />
        </Container>

        <Button type="submit" className={"submitButtonS"} color="primary">
          send mail
        </Button>

        <Container className={"textButton"}></Container>
        <Link to="/forgotpassword">Forgot Password</Link>
      </Form>
    </Container>
  );
};

export default ForgotPassword;
