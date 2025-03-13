import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import CheckDonations from "../components/CheckDonations";
import Campaigns from "../components/Campaigns/Campaigns";
import Goodness from "../components/Goodness/Goodness";
import CreateGoodness from "../components/Goodness/CreateGoondess";
import EditGoodness from "../components/Goodness/EditGoodness";
import EditGoodnessPost from "../components/Goodness/EditGoodnessPost";
import DeleteGoodness from "../components/Goodness/DeleteGoodness";
import Volunteer from "../components/Volunteer/Volunteer";
import LogOut from "../components/Logout";
import Home from "../components/Home";
import CreateCampaigns from "../components/Campaigns/CreateCampaigns";
import EditCampigns from "../components/Campaigns/EditCampigns";
import DeleteCampaigns from "../components/Campaigns/DeleteCampaigns";
import EditCampaignSpecific from "../components/Campaigns/EditCampaignSpecific";
import RequestVolunteer from "../components/Volunteer/RequestVolunteer";
import VolunteerInfo from "../components/Volunteer/VolunteerInfo";
import ChangePassword from "../components/ChangePassword";
import Navbar from "../components/Navbar";
import ProfileUpdate from "../components/ProfileUpdate";
import Projects from "../components/Projects/Project";
import CreateProject from "../components/Projects/CreateProject";
import ProjectView from "../components/Projects/ProjectView";

const NgoDashboard = () => {
  return (
    <div className="flex">
      <Navbar />
      <Sidebar /> {/* Ensure the sidebar is always visible */}
      <div className="flex-grow p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/profile-update" element={<ProfileUpdate />} />
          <Route path="donations" element={<CheckDonations />} />
          <Route path="campaigns" element={<Campaigns />}></Route>
          <Route path="createCampaign" element={<CreateCampaigns />} />
          <Route path="editCampaign" element={<EditCampigns />} />
          <Route
            path="editCampaign/campaignPost"
            element={<EditCampaignSpecific />}
          />{" "}
          <Route path="deleteCampaign" element={<DeleteCampaigns />} />
          <Route path="Goodness" element={<Goodness />}></Route>
          <Route path="createGoodness" element={<CreateGoodness />} />
          <Route path="editGoodness" element={<EditGoodness />} />
          <Route
            path="editGoodness/goodnessPost"
            element={<EditGoodnessPost />}
          />{" "}
          <Route path="deleteGoodness" element={<DeleteGoodness />} />
          <Route path="volunteers" element={<Volunteer />}></Route>
          <Route path="request" element={<RequestVolunteer />} />
          <Route path="info" element={<VolunteerInfo />} />
          <Route path="projects" element={<Projects />}></Route>
          <Route path="createProject" element={<CreateProject />} />
          <Route path="viewProject" element={<ProjectView />} />
          <Route path="logout" element={<LogOut />} />
        </Routes>
      </div>
    </div>
  );
};

export default NgoDashboard;
