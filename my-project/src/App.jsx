import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import NgoDashboard from "./Pages/NgoDashboard";
import ProfileCompletionForm from "./Pages/ProfileCompletionForm.jsx";
import Login from "./components/Login.jsx";
import LandingHome from "./Pages/LandingHome.jsx";
import RequestPending from "./Pages/RequestPending.jsx";
import IsDeactive from "./Pages/isDeactive.jsx";
import { Toaster } from "react-hot-toast";
const App = () => {
  const location = useLocation();

  return (
    <div>
      {/* Conditionally render the Navbar based on the current route */}
      {/* {location.pathname !== "/" && <Navbar />} */}
 {/* Global Toaster Setup */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
      <Routes>
        {/* Render the Home component first at the root route */}
        <Route path="/" element={<LandingHome />} />
        <Route path="/login" element={<Login />} />
        {/* Render the NgoDashboard as a nested route to keep the sidebar visible */}
        <Route path="/ngo-dashboard/*" element={<NgoDashboard />} />
        <Route
          path="/profile-completion/*"
          element={<ProfileCompletionForm />}
        />
         <Route
          path="/request-verification/*"
          element={<RequestPending />}
        />
           <Route
          path="/deactivate/*"
          element={<IsDeactive />}
        />
      </Routes>
    </div>
  );
};

export default App;
