import React from "react";
import {  useContext } from "react";
import { UserContext } from "./context/UserContext";



const Profile = () => {

  const usersId = useContext(UserContext);

  return (
    <p className="text-lg">
      Hello, {usersId?.name ?? "Guest"}
    </p>
  );
};

export default Profile;
