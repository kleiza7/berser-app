import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import ProjectList from '../Search/ProjectList';
import './SearchPage.css'

const SearchPage = (props) => {
  const [input, setInput] = useState('');
  const [projectListDefault, setProjectListDefault] = useState();
  const [projectList, setProjectList] = useState();

  const fetchData = async () => {
    return await fetch('http://localhost:5002/api/projects/')
      .then(response => response.json())
      .then(data => {
         setProjectList(data) 
         setProjectListDefault(data)
       });}

  const updateInput = async (input) => {
      
     const filtered = projectListDefault.filter(project => {
      return project.projectName.toLowerCase().includes(input.toLowerCase())
     })
     setInput(input);
     setProjectList(filtered);
  }
  useEffect( () => {
      console.log(setProjectList)
      fetchData()},[setProjectList]);
	
  return (
    <div  >
      <h7 className={"search"}>Project Name: </h7>
      <SearchBar 
       input={input} 
       onChange={updateInput}
      />
      <ProjectList projectList={projectList}  setCurrentId={props.setCurrentId}/>

      
    </div>
   );
}

export default SearchPage