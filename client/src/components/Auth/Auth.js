import React, { useState } from "react";
import { Container, Form, Input, Col, Row, Button, Label } from "reactstrap";
import FileBase from "react-file-base64";
import "./Auth.css";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { signin, signup } from "../../actions/auth";
import { FaRegEye } from "react-icons/fa";
import { GoogleLogin } from "react-google-login";
import { GoogleButton } from "react-google-button";
import Icon from "./icon";

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

const Auth = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);

  const showPasswordHandler = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const submitHandler = (e) => {
    //buraya inputları kontrol mekanizması yerleştirebilirsin
    e.preventDefault();

    if (isSignUp) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", data: { result, token } });

      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("Google Sign In was unsuccessful.Try again later.");
  };

  return (
    <Container className={"authContainer"}>
      <Container></Container> {/*simge için*/}
      <Form className={"form"} onSubmit={submitHandler}>
        {isSignUp && (
          <>
            <Container className={"inputContainer"}>
              <Row>
                <Col md="6">
                  <div>Name *</div>
                  <Input
                    name="firstName"
                    type="text"
                    placeholder=""
                    onChange={changeHandler}
                  />
                </Col>
                <Col md="6">
                  <div>Last name *</div>
                  <Input
                    name="lastName"
                    type="text"
                    placeholder=""
                    onChange={changeHandler}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <div>Date Of Birth *</div>
                  <Input
                    name="dateOfBirth"
                    type="date"
                    onChange={changeHandler}
                  />
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <div>Place *</div>
                  <Input name="place" type="text" onChange={changeHandler} />
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <div>About</div>
                  <Input name="about" type="text" onChange={changeHandler} />
                </Col>
              </Row>
              <Row>
                <Label tag="h7" for="image">
                  Image
                </Label>
                <FileBase
                  type="file"
                  multiple={false}
                  id="profileImage"
                  name="profileImage"
                  value={formData.profileImage}
                  onDone={({ base64 }) =>
                    setFormData({ ...formData, profileImage: base64 })
                  }
                />
              </Row>
              <Row>
                <Col md="12">
                  <div>Website</div>
                  <Input name="website" type="text" onChange={changeHandler} />
                </Col>
              </Row>
            </Container>
          </>
        )}

        <Container className={"inputContainer"}>
          <div>Email *</div>
          <Input
            name="email"
            type="email"
            placeholder=""
            onChange={changeHandler}
          />
          <div>
            Password * <FaRegEye onClick={showPasswordHandler}>s</FaRegEye>
          </div>
          <Input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder=""
            onChange={changeHandler}
          />
        </Container>

        {isSignUp && (
          <Container className={"inputContainer"}>
            <div>Repeat password *</div>
            <Input
              name="confirmPassword"
              placeholder=""
              onChange={changeHandler}
              type="password"
            />
          </Container>
        )}

        <Button type="submit" className={"submitButtonS"} color="primary">
          {isSignUp ? "Sign Up" : "Sign In"}
        </Button>

        <Container className={"textButton"}>
          <Button
            className={"submitButton1"}
            color="danger"
            onClick={switchMode}
          >
            {isSignUp
              ? "Already have an account? Sing In"
              : "Don't have an acount? Sign Up"}
          </Button>

          <GoogleLogin
            clientId="1016435746988-10mqv9o126tr3h6v6vg8l2mtqm6lieo2.apps.googleusercontent.com"
            render={(renderProps) => (
              <GoogleButton
                className={"googleButton"}
                color="primary"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                variant="contained"
              >
                {<Icon />} Google Sign In
              </GoogleButton>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
        </Container>
        <Link to="/forgotPassword">Forgot Password?</Link>
      </Form>
    </Container>
  );
};

export default Auth;
