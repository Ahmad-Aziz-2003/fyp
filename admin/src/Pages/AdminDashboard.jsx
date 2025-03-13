import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import LogOut from "../components/Logout";
import Home from "../components/Home";
import ChangePassword from "../components/ChangePassword";
import Navbar from "../components/Navbar";
import Donations from "../components/Donations/Donations";
import DonorsList from "../components/Donors/DonorsList";
import NGOslist from "../components/NGOs/NGOslist";
import { useNavigate } from "react-router-dom";
const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const adminId = localStorage.getItem("adminId");
    const token = localStorage.getItem("token");

    if (!adminId || !token) {
      navigate("/"); // Redirect to login if no credentials
    }
  }, [navigate]);

  return (
    <div className="flex">
      <Navbar />
      <Sidebar /> {/* Ensure the sidebar is always visible */}
      <div className="flex-grow p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/change-password" element={<ChangePassword />} />
          {/* <Route path="/profile-update" element={<ProfileUpdate />} /> */}
          <Route path="donations" element={<Donations />} />
          <Route path="ngos-list" element={<NGOslist />}/>
          {/* <Route path="createCampaign" element={<CreateCampaigns />} />
          <Route path="editCampaign" element={<EditCampigns />} /> */}
          {/* <Route
            path="editCampaign/campaignPost"
            element={<EditCampaignSpecific />}
          />{" "}
          <Route path="deleteCampaign" element={<DeleteCampaigns />} /> */}
          <Route path="donors-list" element={<DonorsList />}/>
          {/* <Route path="createGoodness" element={<CreateGoodness />} />
          <Route path="editGoodness" element={<EditGoodness />} />
          <Route
            path="editGoodness/goodnessPost"
            element={<EditGoodnessPost />}
          />{" "}
          <Route path="deleteGoodness" element={<DeleteGoodness />} /> */}
          {/* <Route path="volunteers" element={<Volunteer />}></Route>
          <Route path="request" element={<RequestVolunteer />} />
          <Route path="info" element={<VolunteerInfo />} />
          <Route path="projects" element={<Projects />}></Route>
          <Route path="createProject" element={<CreateProject />} />
          <Route path="viewProject" element={<ProjectView />} /> */}
          <Route path="logout" element={<LogOut />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
