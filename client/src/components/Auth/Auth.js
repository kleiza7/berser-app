import React, { useState } from "react";
import {
  Container,
  Form,
  Input,
  Col,
  Row,
  Button,
} from "reactstrap";
import "./Auth.css";
import {useDispatch} from 'react-redux';
import alertify from "alertifyjs";
import {useHistory} from 'react-router-dom';
import { signin, signup } from '../../actions/auth';

const initialState = {firstName:"", lastName:"", email:"", password:"", confirmPassword:""};

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
    if(isSignUp){
      dispatch(signup(formData, history));
    }else{
      dispatch(signin(formData, history));
    }
   
  };

  const changeHandler = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value});
  };

  const switchMode = () => {
      setIsSignUp((prevIsSignUp) => !prevIsSignUp);
  };
  return (
    <Container className={"authContainer"}>
      <Container></Container> {/*simge için*/}
      <h3>{isSignUp ? "Sign Up" : "Sign In"}</h3>
      <Form className={"form"} onSubmit={submitHandler}>
        {isSignUp && (
          <>
            <Container className={"inputContainer"}>
              <Row>
                <Col md="6">
                  <Input
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    onChange={changeHandler}
                  />
                </Col>
                <Col md="6">
                  <Input
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    onChange={changeHandler}
                  />
                </Col>
              </Row>
            </Container>
          </>
        )}

        <Container className={"inputContainer"}>
          <Input
            name="email"
            type="email"
            placeholder="email"
            onChange={changeHandler}
          />
        </Container>
        <Container className={"inputContainer"}>
          <Input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={changeHandler}
          />
         
        </Container>

        {isSignUp && (
          <Container className={"inputContainer"}>
            <Input
              name="confirmPassword"
              placeholder="Repeat Password"
              onChange={changeHandler}
              type="password"
            />
          </Container>
        )}

        <Button type="submit" className={"submitButton"} color="primary">
          {isSignUp ? "Sign Up" : "Sign In"}
        </Button>
     
        <Container className={'textButton'}>
            <Button color="danger" onClick={switchMode}>
                {isSignUp ? "Already have an account? Sing In" : "Don't have an acount? Sign Up"}
            </Button>
            </Container>
      </Form>
    </Container>
  );
};

export default Auth;
