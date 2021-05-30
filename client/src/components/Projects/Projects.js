import React from "react";
import { useSelector } from "react-redux";
import Project from "./Project/Project";
import { Container } from "reactstrap";


const Projects = ({ setCurrentId }) => {
  const projects = useSelector((state) => state.projects);

 
    return (
    <div>
      <Container>
        
          {projects.map((project) => (
          <Project project={project} setCurrentId={setCurrentId} key={project._id} />
        ))}
         
      </Container>
    </div>
  );
};

export default Projects;
