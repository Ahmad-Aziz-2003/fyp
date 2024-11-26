// import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import NgoDashboard from './Pages/NgoDashboard';
// import Signin from './components/Login.jsx';


// const App = () => {
//   return (
   
//      <div>
//       <Signin/>
//       <Navbar/>
//       <NgoDashboard />
//       </div>
   
//   );
// };

// export default App;
// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import NgoDashboard from './Pages/NgoDashboard';
// import ProfileCompletionForm from './Pages/ProfileCompletionForm.jsx';
// import Login from './components/Login.jsx';

// const App = () => {
//   return (
//     <div>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Login />} />
//         {/* Render the NgoDashboard as a nested route to keep the sidebar visible */}
//         <Route path="/ngo-dashboard/*" element={<NgoDashboard />} />
//         <Route path="/profile-completion/*" element={<ProfileCompletionForm/>}/>
//       </Routes>
//     </div>
//   );
// };

// export default App;

import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import NgoDashboard from './Pages/NgoDashboard';
import ProfileCompletionForm from './Pages/ProfileCompletionForm.jsx';
import Login from './components/Login.jsx';

const App = () => {
  const location = useLocation();

  return (
    <div>
      {/* Conditionally render the Navbar based on the current route */}
      {location.pathname !== '/' && <Navbar />}
      
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Render the NgoDashboard as a nested route to keep the sidebar visible */}
        <Route path="/ngo-dashboard/*" element={<NgoDashboard />} />
        <Route path="/profile-completion/*" element={<ProfileCompletionForm />} />
      </Routes>
    </div>
  );
};

export default App;
