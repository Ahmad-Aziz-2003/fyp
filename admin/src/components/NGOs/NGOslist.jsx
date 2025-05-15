import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEye, FaBan, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress'; // Import this at the top
const NGOslist = () => {
  const navigate = useNavigate(); 
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [profileFilter, setProfileFilter] = useState("all");
  const [verificationFilter, setVerificationFilter] = useState("all");

  useEffect(() => {
    fetchNGOs();
  }, []);

  const fetchNGOs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/ngos');
      setNgos(response.data.ngos || []);
    } catch (error) {
      console.error('Error fetching NGOs:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleNGOStatus = async (ngoId, currentStatus) => {
    const confirmAction = window.confirm(`Are you sure you want to ${currentStatus ? 'activate' : 'deactivate'} this NGO?`);
    if (!confirmAction) return;

    try {
      const response = await axios.put(`http://localhost:5000/api/admin/ngos/toggle-status/${ngoId}`);
      if (response.status === 200) {
        setNgos(ngos.map(ngo => (ngo.ngoId === ngoId ? { ...ngo, isDeactivated: !currentStatus } : ngo)));
      }
    } catch (error) {
      console.error('Error toggling NGO status:', error);
    }
  };

  const filteredNgos = ngos.filter(ngo => (
    (statusFilter === "all" || (statusFilter === "active" && !ngo.isDeactivated) || (statusFilter === "inactive" && ngo.isDeactivated)) &&
    (profileFilter === "all" || (profileFilter === "completed" && ngo.isProfileCompletion) || (profileFilter === "incomplete" && !ngo.isProfileCompletion)) &&
    (verificationFilter === "all" || (verificationFilter === "verified" && ngo.isVerified) || (verificationFilter === "unverified" && !ngo.isVerified))
  ));



if (loading) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24rem' }}>
      <CircularProgress />
    </div>
  );
}

  return (
    <div className="min-h-screen py-10 px-6 mt-20">
      <h1 className="text-2xl font-bold mb-6">NGOs List</h1>
      
      {/* Filters */}
      <div className="flex space-x-4 mb-6">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border p-2 rounded">
          <option value="all">All NGOs</option>
          <option value="active">Active NGOs</option>
          <option value="inactive">Inactive NGOs</option>
        </select>
        <select value={profileFilter} onChange={(e) => setProfileFilter(e.target.value)} className="border p-2 rounded">
          <option value="all">All Profiles</option>
          <option value="completed">Completed Profiles</option>
          <option value="incomplete">Incomplete Profiles</option>
        </select>
        <select value={verificationFilter} onChange={(e) => setVerificationFilter(e.target.value)} className="border p-2 rounded">
          <option value="all">All NGOs</option>
          <option value="verified">Verified NGOs</option>
          <option value="unverified">Unverified NGOs</option>
        </select>
      </div>

      {/* Table */}
      <table className="w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-gray-700 uppercase text-sm">
            <th className="border p-3">IMAGE</th>
            <th className="border p-3">NAME</th>
            <th className="border p-3">FOUNDER</th>
            <th className="border p-3">EMAIL</th>
            <th className="border p-3">PHONE</th>
            <th className="border p-3">STATUS</th>
            <th className="border p-3">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {filteredNgos.length > 0 ? (
            filteredNgos.map((ngo) => {
              let contact = {};
              try {
                contact = ngo.contact ? JSON.parse(ngo.contact) : {};
              } catch (error) {
                console.error('Error parsing contact:', error);
              }

              return (
                <tr key={ngo.ngoId} className="border hover:bg-gray-100 transition">
                  <td className="border p-3 text-center">
                    <img
                      src={ngo.profilePhoto || "https://via.placeholder.com/50"}
                      alt="NGO"
                      className="w-10 h-10 rounded-full mx-auto"
                    />
                  </td>
                  <td className="border p-3">{ngo.name || "N/A"}</td>
                  <td className="border p-3">
                    {Array.isArray(ngo.founder) ? ngo.founder.join(", ") : "N/A"}
                  </td>
                  <td className="border p-3">{ngo.email || "N/A"}</td>
                  <td className="border p-3">{contact.phone || "N/A"}</td>
                  <td className="border p-3">
                    <span className={`px-3 py-1 rounded-full text-white text-sm 
                      ${ngo.isDeactivated ? "bg-red-500" : "bg-green-500"}`}>
                      {ngo.isDeactivated ? "Inactive" : "Active"}
                    </span>
                  </td>
                  <td className=" p-3 flex items-center justify-center space-x-3">
                  <button
  onClick={() => {
    localStorage.setItem("ngoID", ngo.ngoId); // Store ngoId in localStorage
    navigate(`/admin-dashboard/NgoDetail`); // Navigate to NGODetail page
  }}
  className="text-blue-500 hover:text-blue-700"
>
  <FaEye size={18} />
</button>
                
                    <button
                      onClick={() => toggleNGOStatus(ngo.ngoId, ngo.isDeactivated)}
                      className={`text-white px-2 py-1  ${ngo.isDeactivated ? "bg-green-500" : "bg-red-500"}`}
                    >
                      {ngo.isDeactivated ? <FaCheckCircle size={18} /> : <FaBan size={18} />}
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7" className="text-center p-4">No NGOs Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default NGOslist;
