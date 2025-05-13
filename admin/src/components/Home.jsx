import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers, FaCheckCircle, FaTimesCircle, FaHandsHelping, FaUserShield, FaUser } from "react-icons/fa";

const Home = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/platform-stats/jU6gVo5eZkdwXPHYxaBIJsRBE8i2")
      .then((response) => {
        setStats(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching stats:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen py-10 px-6 mt-20 ">
      <h1 className="text-3xl font-bold text-center text-[#225738] mb-8">Admin Dashboard</h1>

      {loading ? (
        <p className="text-center text-lg">Loading statistics...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Total Users */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <FaUsers className="text-4xl text-[#225738] mr-4" />
            <div>
              <h2 className="text-xl font-semibold">Total Users</h2>
              <p className="text-2xl font-bold">{stats.totalUsers}</p>
            </div>
          </div>
          {/* Active Users */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <FaUserShield className="text-4xl text-green-600 mr-4" />
            <div>
              <h2 className="text-xl font-semibold">Active Users</h2>
              <p className="text-2xl font-bold">{stats.activeUsers}</p>
            </div>
          </div>

          {/* Inactive Users */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <FaUser className="text-4xl text-red-600 mr-4" />
            <div>
              <h2 className="text-xl font-semibold">Inactive Users</h2>
              <p className="text-2xl font-bold">{stats.inactiveUsers}</p>
            </div>
          </div>

          {/* Total NGOs */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <FaHandsHelping className="text-4xl text-blue-600 mr-4" />
            <div>
              <h2 className="text-xl font-semibold">Total NGOs</h2>
              <p className="text-2xl font-bold">{stats.totalNGOs}</p>
            </div>
          </div>

          {/* Verified NGOs */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <FaCheckCircle className="text-4xl text-green-600 mr-4" />
            <div>
              <h2 className="text-xl font-semibold">Verified NGOs</h2>
              <p className="text-2xl font-bold">{stats.verifiedNGOs}</p>
            </div>
          </div>

          {/* Unverified NGOs */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <FaTimesCircle className="text-4xl text-red-600 mr-4" />
            <div>
              <h2 className="text-xl font-semibold">Unverified NGOs</h2>
              <p className="text-2xl font-bold">{stats.unverifiedNGOs}</p>
            </div>
          </div>

          {/* Total Volunteers */}
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <FaUsers className="text-4xl text-purple-600 mr-4" />
            <div>
              <h2 className="text-xl font-semibold">Total Volunteers</h2>
              <p className="text-2xl font-bold">{stats.totalVolunteers}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
