import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  CardGroup,
} from "reactstrap";
import "./MyProject.css";
import { useDispatch } from "react-redux";
import { deleteProject } from "../../../actions/projects";
import { useHistory, useLocation } from "react-router-dom";
import moment from "moment";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useState, useEffect } from "react";

import decode from "jwt-decode";

import alertify from "alertifyjs";

const MyProject = ({ project, setCurrentId }) => {
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

  const Likes = () => {
    if (project.likes.length > 0) {
      return project.likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id)
      ) ? (
        <>
          &nbsp;
          {project.likes.length > 2
            ? `You and ${project.likes.length - 1} others`
            : `${project.likes.length} Like${
                project.likes.length > 1 ? "s" : ""
              }`}
        </>
      ) : (
        <>
          &nbsp;{project.likes.length}
          {project.likes.length === 1 ? " Like" : " Likes"}
        </>
      );
    }

    return <>&nbsp;Like</>;
  };
  const submit = () => {
    confirmAlert({
      title: "Deleting Project",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => dispatch(deleteProject(project._id)),
        },
        {
          label: "No",
          onClick: () => () => alert("Click No"),
        },
      ],
    });
  };

  return (
    <div>
      <CardGroup className={"cardGroup"}>
        <Card>
          <CardImg top height="300px" src={project.image} alt="Proje Resmi" />
          <Button>
            <Likes />
          </Button>
          <CardBody>
            <CardTitle tag="h5">{project.projectName}</CardTitle>

            <CardTitle className={"name"} tag="h8">
              {project.name}
            </CardTitle>

            <CardSubtitle tag="h6" className="mb-2 text-muted">
              {project.groupName}
            
            </CardSubtitle>
            <CardText>{project.title}</CardText>
            <CardText>{moment(project.createdAt).fromNow()}</CardText>
            
            {(user?.result?.googleId === project?.creator ||
              user?.result?._id === project?.creator) && (
              <FaRegTrashAlt
                className={"different"}
                onClick={() => dispatch(submit)}
              >
                Sil
              </FaRegTrashAlt>
            )}

          
          </CardBody>
        </Card>
      </CardGroup>
    </div>
  );
};

export default MyProject;
