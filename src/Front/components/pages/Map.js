import React, { useContext } from "react";
import UserContext from "../../context/UserContext";

export default function Map() {
  const { userData } = useContext(UserContext);

  return (
    <div className="page">
      {userData.user ? (
        <h1>Welcome {userData.user.userName}</h1>
      ) : (
        <>
         
         
        </>
      )}
    </div>
  );
}