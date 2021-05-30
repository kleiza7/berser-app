import React from "react";
import { Container, Col, Row } from "reactstrap";
import Projects from "../Projects/Projects";
import ProjectForm from "../Forms/ProjectForm/ProjectForm";
import "./Home.css";

const Home = ({currentId, setCurrentId}) => {
  return (
    <div>
      <Container>
        <Row>
          <Col md="8">
            <Projects setCurrentId={setCurrentId} />
          </Col>
          <Col md="4">
            <ProjectForm currentId={currentId} setCurrentId={setCurrentId} />
          </Col>
        </Row>
        
      </Container>
    </div>
  );
};

export default Home;
