// import React from "react";
// import { Routes, Route} from "react-router-dom";

// import AdminDashboard from "./Pages/AdminDashboard";

// import Login from "./components/Login.jsx";


// const App = () => {

//   return (
//     <div>
//      <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
//       </Routes>
//     </div>
//   );
// };

// export default App;


import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AdminDashboard from "./Pages/AdminDashboard";
import Login from "./components/Login.jsx";

const App = () => {
  return (
    <>
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
      
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
      </Routes>
    </>
  );
};

export default App;
