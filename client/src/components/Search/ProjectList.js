import React from 'react';
import Project from "../Projects/Project/Project";
import { Col } from "reactstrap";


const ProjectList = ({projectList=[], setCurrentId}) => {

  
  return (
    <div>
     <Col md="8"  >
    {projectList.map((data) => {
        if (data) {
          return (
            <div key={data.projectName}>
            
            
          <Project project={data} setCurrentId={setCurrentId} key={data._id} />
        
	    </div>	
    	   )	
    	 }
    	 return null
    }) }
    </Col>
    </div>
    
  );
}

export default ProjectList