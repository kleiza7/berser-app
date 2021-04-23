import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import './Project.css';
import { useDispatch } from 'react-redux';
import { deleteProject, likeProject } from '../../../actions/projects';
import {Link} from 'react-router-dom';
import moment from 'moment';

const Project = ({ project, setCurrentId }) => {
 
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  const Likes = () => {
    if(project.likes.length > 0){
      return project.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
      ?(
      <>&nbsp;{project.likes.length > 2 ? `You and ${project.likes.length -1} others` : `${project.likes.length} Like${project.likes.length > 1 ? 's' : '' }`}</>
      )
      :
      (
        <>
        &nbsp;{project.likes.length}{project.likes.length === 1 ? ' Like' : ' Likes'}
        </>
      );
    }

    return <>&nbsp;Like</>
  }
  return (
    <div>
    <Card className={"cardContainer"} >
        <CardImg top height="200px" src={project.image} alt="Proje Resmi" />
        <CardBody>
         
          <CardTitle tag="h5">{project.projectName}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {project.groupName}
          </CardSubtitle>
          <CardText>{project.title}</CardText>
          <CardText>{moment(project.createdAt).fromNow()}</CardText>  
          <Button disabled={!user?.result} onClick={() => dispatch(likeProject(project._id))}>
          <Likes />
          </Button>
          {(user?.result?.googleId === project?.creator || user?.result?._id === project?.creator) && (
            <Button onClick={() => dispatch(deleteProject(project._id))}>Sil</Button>
          )}

          {(user?.result?.googleId === project?.creator || user?.result?._id === project?.creator) && (
          <Button onClick={() => setCurrentId(project._id)}>Düzenle</Button>
          )}
          <Link to="/projectDetails" onClick={() => setCurrentId(project._id)}>Detaylara Git</Link>
        </CardBody>
      </Card>
      
    </div>
  );
};

export default Project;
