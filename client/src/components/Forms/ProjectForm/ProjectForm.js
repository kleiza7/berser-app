import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

import FileBase from "react-file-base64";
import "./ProjectForm.css";
import { useDispatch } from "react-redux";
import { createProject, updateProject } from "../../../actions/projects";
import { useSelector } from "react-redux";

const ProjectForm = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const project = useSelector((state) =>
    currentId ? state.projects.find((p) => p._id === currentId) : null
  );
  const [projectData, setProjectData] = useState({
    projectName: "",
    groupName: "",
    projectType: "Web",
    numOfDevelopers: 1,
    numOfRequirements: 15,
    image: "",
    title: "",
    description: "",
    gitHub: "",
  });
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (project) setProjectData(project);
  }, [project]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updateProject(currentId, { ...projectData, name: user?.result?.name })
      );
    } else {
      dispatch(createProject({ ...projectData, name: user?.result?.name }));
    }
    clear();
  };

  const changeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setProjectData({ ...projectData, [name]: value });
  };

  const clear = () => {
    setCurrentId(null);
    setProjectData({
      projectName: "",
      groupName: "",
      projectFile: "",
      projectType: "Web",
      numOfDevelopers: 1,
      numOfRequirements: 15,
      image: "",
      title: "",
      description: "",
      gitHub: "",
    });
  };

  if (!user?.result?.name) {
    return (
      <Button className={"contactButton"} href="/contact">
        Contact Us
      </Button>
    );
  }

  return (
    <div>
      <Form onSubmit={submitHandler} className={"form"}>
        <h4>{currentId ? "Edit" : "Create"} Project</h4>
        <h3>--------------</h3>
        <FormGroup>
          <Label tag="h7" for="projectName">
            Project Name
          </Label>
          <Input
            type="text"
            bsSize="sm"
            id="projectName"
            name="projectName"
            value={projectData.projectName}
            onChange={changeHandler}
          />
        </FormGroup>

        <FormGroup>
          <Label tag="h7" for="groupName">
            Group Name
          </Label>
          <Input
            type="text"
            bsSize="sm"
            id="groupName"
            name="groupName"
            value={projectData.groupName}
            onChange={changeHandler}
          />
        </FormGroup>

        <FormGroup>
          <Label tag="h7" for="projectType">
            Project Type
          </Label>
          <Input
            type="select"
            bsSize="sm"
            id="projectType"
            name="projectType"
            value={projectData.projectType}
            onChange={changeHandler}
          >
            <option>Web</option>
            <option>Mobile</option>
            <option>Desktop</option>
          </Input>
        </FormGroup>

        <FormGroup>
          <Label tag="h7" for="numOfDevelopers">
            Number Of Developers
          </Label>
          <Input
            type="select"
            bsSize="sm"
            id="numOfDevelopers"
            name="numOfDevelopers"
            value={projectData.numOfDevelopers}
            onChange={changeHandler}
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
        </FormGroup>

        <FormGroup>
          <Label tag="h7" for="numOfRequirements">
            Number Of Requirements
          </Label>
          <Input
            type="select"
            bsSize="sm"
            id="numOfRequirements"
            name="numOfRequirements"
            value={projectData.numOfRequirements}
            onChange={changeHandler}
          >
            <option>15</option>
            <option>17</option>
            <option>20</option>
            <option>22</option>
            <option>25</option>
          </Input>
        </FormGroup>

        <FormGroup>
          <Label tag="h7" for="image">
            Image
          </Label>
          <FileBase
            type="file"
            multiple={false}
            id="image"
            name="image"
            value={projectData.image}
            onDone={({ base64 }) =>
              setProjectData({ ...projectData, image: base64 })
            }
          />
        </FormGroup>

        <FormGroup>
          <Label tag="h7" for="projectFile">
            File
          </Label>
          <FileBase
            type="file"
            multiple={false}
            id="projectFile"
            name="projectFile"
            value={projectData.projectFile}
            onDone={({ base64 }) =>
              setProjectData({ ...projectData, projectFile: base64 })
            }
          />
        </FormGroup>

        <FormGroup>
          <Label tag="h7" for="title">
            Title
          </Label>
          <Input
            type="text"
            bsSize="sm"
            id="title"
            name="title"
            value={projectData.title}
            onChange={changeHandler}
          />
        </FormGroup>

        <FormGroup>
          <Label tag="h7" for="description">
            Description
          </Label>
          <Input
            type="textarea"
            bsSize="sm"
            id="description"
            name="description"
            value={projectData.description}
            onChange={changeHandler}
          />
        </FormGroup>

        <FormGroup>
          <Label tag="h7" for="title">
            Github Link
          </Label>
          <Input
            type="text"
            bsSize="sm"
            id="gitHub"
            name="gitHub"
            value={projectData.gitHub}
            onChange={changeHandler}
          />
        </FormGroup>

        <Button type="submit" color="primary" className={"button"}>
          Create
        </Button>
        <Button color="danger" className={"button"} onClick={clear}>
          Clear
        </Button>
      </Form>
    </div>
  );
};

export default ProjectForm;
