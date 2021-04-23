import React from 'react'

import { useSelector } from 'react-redux';

const ProjectDetails = ({currentId}) => {

    const project = useSelector((state) => currentId ? state.projects.find((p) => p._id === currentId) : null);

    return (
        <div>
              
              <h3 style={{color:'white'}}>
              {project ? project.projectName : null}
              {project ? project.groupName : null}
              {project ? project.projectType : null}
                  </h3>
              
        </div>
      
    
      
    )
}

export default ProjectDetails
