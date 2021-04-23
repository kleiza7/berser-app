import React,{ useState, useEffect } from "react";
import { Navbar, NavbarBrand, Col, Button, Row } from "reactstrap";
import "./NavBar.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import alertify from "alertifyjs";
import decode from 'jwt-decode';
import {useDispatch} from 'react-redux';

const NavBar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const logout = () => {
    dispatch({type:'LOGOUT'});

    history.push('/');

    setUser(null);
  };

  useEffect(()=>{
    const token = user?.token;

   if(token){
     const decodedToken = decode(token);

     if(decodedToken.exp * 1000 < new Date().getTime()) logout();
   }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    
    <Navbar className={"navbar"} color="warning" light expand="md">
      <NavbarBrand href="/">
        <h3>Show Your Projects</h3>
      </NavbarBrand>
      <Col md="3" className={"toolBar"}>
        {user ? (
          <Row className={"profile"}>
            <div className={"avatar"}>
              <h3 style={{ color: "white" }}>{user.result.name.charAt(0)}</h3>
            </div>
            <h6 className={"userName"}>{user.result.name}</h6>
            <Button className={"logout"} color="secondary" onClick={logout}>
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
