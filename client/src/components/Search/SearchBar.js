import React from 'react';

const SearchBar = ({input:keyword, onChange:setKeyword}) => {
  const BarStyling = {width:"20rem",background:"#FFFFFF", border:"none", padding:"0.5rem",margin: "25px 50px 25px 10px"};
  
  return (
    <input
     style={BarStyling}
     key="random1"
     value={keyword}
     placeholder={"search projects"}
     onChange={(e) => setKeyword(e.target.value)}
    />
  );
}

export default SearchBar