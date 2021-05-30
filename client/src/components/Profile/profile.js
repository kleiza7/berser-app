import React, { useState, useEffect } from "react";
import { CardImg, CardHeader } from "reactstrap";
import axios from 'axios';
const ProfileDetails = () => {
  
  const [user] = useState(JSON.parse(localStorage.getItem("profile")));
  
  
  useEffect(() => {
    axios
    .get(`http://localhost:5002/api/user/${user.result._id}`)
    .then(response => response)
  }, [])

  return (
    <div>
      <div className={"img"}>
        <CardImg
          top
          height="40px"
          src={user ? user.result.profileImage : null}
          alt="Profil Resmi"
        />
      </div>

      <CardHeader>Name: {user.result.name}</CardHeader>
      <CardHeader>Email: {user.result.email}</CardHeader>
      <CardHeader>Date Of Birth: {user.result.dateOfBirth}</CardHeader>
      <CardHeader>About: {user.result.about}</CardHeader>
      <CardHeader>Place: {user.result.place}</CardHeader>
      <CardHeader>Website: {user.result.website}</CardHeader>
    </div>
  );
};

export default ProfileDetails;
