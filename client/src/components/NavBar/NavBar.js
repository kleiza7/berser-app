import React, { useState, useEffect } from "react";
import { Navbar, NavbarBrand, Col, Button, Row, CardImg, Nav } from "reactstrap";
import "./NavBar.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import decode from "jwt-decode";
import { useDispatch } from "react-redux";
import alertify from "alertifyjs";
import logo from "../Images/logo.png";

const NavBar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: "LOGOUT" });

    history.push("/");

    setUser(null);
    alertify.alert("Succesful", "Successfully logged out.");
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <Navbar className={"navbar"} color="dark" light expand="md">
      <img src={logo}></img>
      <NavbarBrand href="/">
        <h5 style={{ color: "white" }} className={"syp"}>
          Show Your Projects
        </h5>
      </NavbarBrand>

      
     
      <Col md="3" className={"toolBar"}>
        {user ? (
          
          <Row className={"profile"}>
             <NavbarBrand href="/searchPage">
      <h7 style={{ color: "white" }}>
          Search Box
        </h7>
      </NavbarBrand>
            <NavbarBrand href="/myProjects">
              <h7 style={{ color: "white" }}>My Projects</h7>
            </NavbarBrand>

            {user.result.profileImage ? (
              <div className={"img"}>
                <CardImg
                  top
                  height="40px"
                  src={user ? user.result.profileImage : null}
                  alt=""
                />
              </div>
            ) : (
              <div className={"avatar"}>
                <h3 style={{ color: "white" }}>{user.result.name.charAt(0)}</h3>
              </div>
            )}

            <NavbarBrand href="/profileDetails">
              <h7 style={{ color: "white" }}>{user.result.name}</h7>
            </NavbarBrand>
            <Button color="secondary" onClick={logout}>
              Logout
            </Button>
          </Row>
        ) : (
          <Link className={"link"} to={"/auth"}>
            Sign In
          </Link>
        )}
      </Col>
    </Navbar>
  );
};

export default NavBar;
