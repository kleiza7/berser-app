import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Row,
  FormGroup,
  Label,
  Input,
  Container,
  Col,
} from "reactstrap";
import alertify from 'alertifyjs';
import FileBase from 'react-file-base64';
import './ProjectForm.css';
import moment from 'moment';
import { useDispatch} from 'react-redux';
import { createProject, updateProject} from '../../../actions/projects';
import { useSelector } from "react-redux";

const ProjectForm = ({currentId, setCurrentId }) => {

  const dispatch = useDispatch();
  const project = useSelector((state) => currentId ? state.projects.find((p) => p._id === currentId) : null);
  const [projectData, setProjectData] = useState({
    projectName:"",
    groupName:"",
    projectType:"Web",
    numOfDevelopers:1,
    numOfRequirements:15,
    image:"",
    title:"",
    description:""
  });
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if(project) setProjectData(project);
  }, [project]);


  const submitHandler = (e) => {
    e.preventDefault();
    if(currentId){
      dispatch(updateProject(currentId,{...projectData, name:user?.result?.name}));
    }else{
      dispatch(createProject({...projectData, name:user?.result?.name}));
    }
    clear();
  }

  const changeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setProjectData({...projectData, [name]:value});
  }

  const clear = () => {
    setCurrentId(null);
    setProjectData({
      projectName:"",
      groupName:"",
      projectType:"Web",
      numOfDevelopers:1,
      numOfRequirements:15,
      image:"",
      title:"",
      description:""
    });
  };

  if(!user?.result?.name){
    return(
      <h6 style={{color:'white'}}>Please Sign In to create your own projects and like other's projects</h6>
    )
  }


  return (
    <div>
      <Form onSubmit={submitHandler} className={'form'}>
        <h3>Bir Proje {currentId ? 'Düzenle' : 'Oluştur'} </h3>
        <FormGroup>
          <Label tag="h5" for="projectName">Project Name</Label>
          <Input type='text' id="projectName" name="projectName" value={projectData.projectName} onChange={changeHandler}/>
        </FormGroup>

        <FormGroup>
          <Label tag="h5" for="groupName">Group Name</Label>
          <Input type='text' id="groupName" name="groupName" value={projectData.groupName} onChange={changeHandler}/>
        </FormGroup>

        <FormGroup>
          <Label tag="h5" for="projectType">Project Type</Label>
          <Input type="select" id="projectType" name="projectType" value={projectData.projectType} onChange={changeHandler}>
          <option>Web</option>
          <option>Mobile</option>
          <option>Desktop</option>
          </Input>
        </FormGroup>

        <FormGroup>
        <Label tag="h5" for="numOfDevelopers">Number Of Developers</Label>
        <Input type="select" id="numOfDevelopers" name="numOfDevelopers" value={projectData.numOfDevelopers} onChange={changeHandler}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input>
      </FormGroup>

      <FormGroup>
        <Label tag="h5" for="numOfRequirements">Number Of Requirements</Label>
        <Input type="select" id="numOfRequirements" name="numOfRequirements" value={projectData.numOfRequirements} onChange={changeHandler}>
          <option>15</option>
          <option>17</option>
          <option>20</option>
          <option>22</option>
          <option>25</option>
        </Input>
      </FormGroup>

      <FormGroup>
        <Label tag="h5" for="image">Image</Label>
        <FileBase type="file" multiple={false} id="image" name="image" value={projectData.image} onDone={({base64}) => setProjectData({...projectData, image:base64})} />
      </FormGroup>

      <FormGroup>
          <Label tag="h5" for="title">Title</Label>
          <Input type='text' id="title" name="title" value={projectData.title} onChange={changeHandler}/>
      </FormGroup>

      
      <FormGroup>
          <Label tag="h5" for="description">Description</Label>
          <Input type='textarea' id="description" name="description" value={projectData.description} onChange={changeHandler}/>
      </FormGroup>

      <Button type="submit" color="primary" className={'button'}>Oluştur</Button>
      <Button color="danger" className={'button'}  onClick={clear} >Temizle</Button>
     
      </Form>
    </div>
  );
};

export default ProjectForm;
