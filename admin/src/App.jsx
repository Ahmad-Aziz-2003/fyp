import React from "react";
import { Routes, Route} from "react-router-dom";

import NgoDashboard from "./Pages/NgoDashboard";

import Login from "./components/Login.jsx";


const App = () => {

  return (
    <div>
     <Routes>
      
        <Route path="/" element={<Login />} />
        {/* Render the NgoDashboard as a nested route to keep the sidebar visible */}
        <Route path="/ngo-dashboard/*" element={<NgoDashboard />} />
      </Routes>
    </div>
  );
};

export default App;
