import React from "react";
import { useHistory } from "react-router-dom";

function Logout() {
  const history = useHistory();
  const backToLogin = () => {
    history.push("/");
  };
  return (
    <>
      <h1>Logout ? </h1>
      <button onClick={backToLogin}>Back to Login</button>
    </>
  );
}

export default Logout;