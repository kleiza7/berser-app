import React from "react";

import { useSelector } from "react-redux";
import { Card, CardImg, Button, CardHeader } from "reactstrap";

const ProjectDetails = ({ currentId }) => {
  const project = useSelector((state) =>
    currentId ? state.projects.find((p) => p._id === currentId) : null
  );

  return (
    <div>
      <CardImg
        top
        height="300px"
        src={project ? project.image : null}
        alt="Proje Resmi"
      />
      <Card className={"cardContainer"} >
        <Button tag="h5">
          Github Link:{" "}
          <a
            href={project ? project.gitHub : null}
            target="_blank"
            rel="noreferrer"
          >
            {project ? project.gitHub : null}
          </a>{" "}
        </Button>
        <CardHeader tag="h5">
          Creator: {project ? project.name : null}
        </CardHeader>
        <CardHeader tag="h6">
          Project Name: {project ? project.projectName : null}{" "}
        </CardHeader>
        <CardHeader tag="h6">
          Group Name: {project ? project.groupName : null}{" "}
        </CardHeader>
        <CardHeader tag="h6">
          Project Title: {project ? project.title : null}
        </CardHeader>

        <CardHeader>
          Project Type: {project ? project.projectType : null}
        </CardHeader>
        <CardHeader>
          Number Of Developers: {project ? project.numOfDevelopers : null}
        </CardHeader>
        <CardHeader>
          Number Of Requirements: {project ? project.numOfRequirements : null}
        </CardHeader>
        <CardHeader>
          Description: {project ? project.description : null}
        </CardHeader>
      </Card>
    </div>
  );
};

export default ProjectDetails;
