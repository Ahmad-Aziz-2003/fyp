// import React from 'react';
// // import { Switch, Route } from 'react-router-dom';
// import { Routes, Route } from 'react-router-dom';

// import Sidebar from '../components/Sidebar';
// import CheckDonations from '../components/CheckDonations';
// import Campaigns from '../components/Campaigns';
// import Blogs from '../components/Blogs';
// import VolunteerInfo from '../components/VolunteerInfo';
// import SignOut from '../components/SignOut';
// import Home from '../components/Home'
// const NgoDashboard = () => {
//   return (
//     <div className="flex">
//       <Sidebar />
//       <div className="flex-grow p-6">
//       <Routes>
//   <Route path="/" element={<Home />} />
//   <Route path="donations" element={<CheckDonations />} />
//   <Route path="campaigns" element={<Campaigns />} />
//   <Route path="blogs" element={<Blogs />} />
//   <Route path="volunteers" element={<VolunteerInfo />} />
//   <Route path="signout" element={<SignOut />} />
// </Routes>



//       </div>
//     </div>
//   );
// };

// export default NgoDashboard;
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import CheckDonations from '../components/CheckDonations';
import Campaigns from '../components/Campaigns';
import Goodness from '../components/Goodness/Goodness';
import CreateGoodness  from '../components/Goodness/CreateGoondess';
import EditGoodness from '../components/Goodness/EditGoodness';
import DeleteGoodness from '../components/Goodness/DeleteGoodness';
import VolunteerInfo from '../components/VolunteerInfo';
import SignOut from '../components/SignOut';
import Home from '../components/Home';

const NgoDashboard = () => {
  return (
    <div className="flex">
      <Sidebar /> {/* Ensure the sidebar is always visible */}
      <div className="flex-grow p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="donations" element={<CheckDonations />} />
          <Route path="campaigns" element={<Campaigns />} />
          <Route path="Goodness" element={<Goodness />} >
            <Route path="create" element={<CreateGoodness />} />
            <Route path="edit" element={<EditGoodness />} />
            <Route path="delete" element={<DeleteGoodness />} />
          </Route>
          <Route path="volunteers" element={<VolunteerInfo />} />
          <Route path="signout" element={<SignOut />} />
        </Routes>
      </div>
    </div>
  );
};

export default NgoDashboard;
