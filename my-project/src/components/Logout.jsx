import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user session (e.g., localStorage or cookies)
    localStorage.clear();

    // Redirect to the sign-in screen
    navigate("/");
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-700">Logging you out...</h1>
    </div>
  );
};

export default Logout;
