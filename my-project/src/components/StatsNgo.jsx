import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaDonate,
  FaHandHoldingHeart,
  FaUsers,
  FaBullhorn,
  FaClipboardList,
  FaClock,
  FaCheck,
  FaHourglassHalf,
  FaFeatherAlt,
} from "react-icons/fa";
import CircularProgress from '@mui/material/CircularProgress'; // <-- Add this import


const StatsNgo = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ngoId = localStorage.getItem("ngoId");

    if (!ngoId) {
      console.error("NGO ID not found in localStorage.");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:5000/api/ngos/stats/${ngoId}`)
      .then((response) => {
        setStats(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching NGO stats:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen py-10 px-6 mt-20">
      <h1 className="text-3xl font-bold text-center text-[#225738] mb-8">
        NGO Dashboard
      </h1>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
  <CircularProgress />
</div>

      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Total Donations */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <FaDonate className="text-4xl text-green-700 mr-4" />
            <div>
              <h2 className="text-xl font-semibold">Total Donations</h2>
              <p className="text-2xl font-bold">{stats.totalDonations}</p>
            </div>
          </div>

          {/* Total Donation Amount */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <FaHandHoldingHeart className="text-4xl text-pink-600 mr-4" />
            <div>
              <h2 className="text-xl font-semibold">Donation Amount (PKR)</h2>
              <p className="text-2xl font-bold">{stats.totalDonationAmount}</p>
            </div>
          </div>

          {/* Volunteer Applications */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <FaUsers className="text-4xl text-purple-600 mr-4" />
            <div>
              <h2 className="text-xl font-semibold">Volunteer Applications</h2>
              <p className="text-2xl font-bold">{stats.totalVolunteerApplications}</p>
            </div>
          </div>

          {/* Goodness Posts */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <FaFeatherAlt className="text-4xl text-blue-500 mr-4" />
            <div>
              <h2 className="text-xl font-semibold">Goodness Posts</h2>
              <p className="text-2xl font-bold">{stats.totalGoodnessPosts}</p>
            </div>
          </div>

          {/* Campaigns */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <FaBullhorn className="text-4xl text-orange-500 mr-4" />
            <div>
              <h2 className="text-xl font-semibold">Campaigns</h2>
              <p className="text-2xl font-bold">{stats.totalCampaigns}</p>
            </div>
          </div>

          {/* Total Projects */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <FaClipboardList className="text-4xl text-indigo-600 mr-4" />
            <div>
              <h2 className="text-xl font-semibold">Total Projects</h2>
              <p className="text-2xl font-bold">{stats.totalProjects}</p>
            </div>
          </div>

          {/* Ongoing Projects */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <FaHourglassHalf className="text-4xl text-yellow-500 mr-4" />
            <div>
              <h2 className="text-xl font-semibold">Ongoing Projects</h2>
              <p className="text-2xl font-bold">{stats.ongoingProjects}</p>
            </div>
          </div>

          {/* Completed Projects */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <FaCheck className="text-4xl text-green-600 mr-4" />
            <div>
              <h2 className="text-xl font-semibold">Completed Projects</h2>
              <p className="text-2xl font-bold">{stats.completedProjects}</p>
            </div>
          </div>

          {/* Future Projects */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <FaClock className="text-4xl text-gray-600 mr-4" />
            <div>
              <h2 className="text-xl font-semibold">Future Projects</h2>
              <p className="text-2xl font-bold">{stats.futureProjects}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsNgo;
