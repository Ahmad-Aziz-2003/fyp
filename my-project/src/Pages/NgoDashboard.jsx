
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import CheckDonations from '../components/CheckDonations';
import Campaigns from '../components/Campaigns/Campaigns';
import Goodness from '../components/Goodness/Goodness';
import CreateGoodness  from '../components/Goodness/CreateGoondess';
import EditGoodness from '../components/Goodness/EditGoodness';
import EditGoodnessPost from '../components/Goodness/EditGoodnessPost'; // Import the EditGoodnessPost component
import DeleteGoodness from '../components/Goodness/DeleteGoodness';
import Volunteer from '../components/Volunteer/Volunteer';
import SignOut from '../components/SignOut';
import Home from '../components/Home';
import CreateCampaigns from '../components/Campaigns/CreateCampaigns';
import EditCampigns from '../components/Campaigns/EditCampigns';
import DeleteCampaigns from '../components/Campaigns/DeleteCampaigns';
import EditCampaignSpecific from '../components/Campaigns/EditCampaignSpecific';
import RequestVolunteer from '../components/Volunteer/RequestVolunteer';
import VolunteerInfo from '../components/Volunteer/VolunteerInfo';

const NgoDashboard = () => {
  return (
    <div className="flex">
      <Sidebar /> {/* Ensure the sidebar is always visible */}
      <div className="flex-grow p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="donations" element={<CheckDonations />} />
          <Route path="campaigns" element={<Campaigns />} >
            <Route path="create" element={<CreateCampaigns />} />
            <Route path="edit" element={<EditCampigns />} />
            <Route path="edit/campaignPost" element={<EditCampaignSpecific />} /> {/* Add dynamic route */}
            <Route path="delete" element={<DeleteCampaigns />} />
          </Route>
          <Route path="Goodness" element={<Goodness />} >
            <Route path="create" element={<CreateGoodness />} />
            <Route path="edit" element={<EditGoodness />} />
            <Route path="edit/goodnessPost" element={<EditGoodnessPost />} /> {/* Add dynamic route */}
            <Route path="delete" element={<DeleteGoodness />} />
          </Route>
          <Route path="volunteers" element={<Volunteer />} >
            <Route path="request" element={<RequestVolunteer />} />
            <Route path="info" element={<VolunteerInfo />} />
          </Route>
          <Route path="signout" element={<SignOut />} />
        </Routes>
      </div>
    </div>
  );
};

export default NgoDashboard;
