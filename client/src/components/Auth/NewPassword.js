import React, { useState } from "react";
import { Container, Form, Input, Button } from "reactstrap";
import "./Auth.css";
import { Link, useHistory, useParams } from "react-router-dom";
import alertify from "alertifyjs";

const ResetPassword = () => {
  const history = useHistory();
  const [password, setPasword] = useState("");
  const { resetPasswordToken } = useParams();
  console.log(resetPasswordToken);

  const Reset = () => {
    fetch(
      `http://localhost:5002/api/user/resetPassword?resetPasswordToken=${resetPasswordToken}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
        }),
        params: JSON.stringify({
          resetPasswordToken: resetPasswordToken,
        }),
      }
    )
      .then((res) => res.json())

      .then((FormData) => {
        console.log(FormData);
        if (FormData.error) {
          console.log(FormData.error);
        } else {
          alertify.alert("OK");
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container className={"authContainer"}>
      <Container></Container> {/*simge için*/}
      <Form className={"form"}>
        <div>Enter New Password *</div>

        <Input
          name="password"
          type="password"
          value={password}
          placeholder=""
          onChange={(e) => setPasword(e.target.value)}
        />

        <Button
          type="submit"
          className={"submitButtonS"}
          color="primary"
          onClick={() => Reset()}
        >
          Submit
        </Button>

        <Link to="/auth">Sign In</Link>
      </Form>
    </Container>
  );
};

export default ResetPassword;
