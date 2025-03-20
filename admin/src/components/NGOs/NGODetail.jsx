// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const NGODetail = () => {
//   const { ngoId } = useParams();
//   const [ngo, setNgo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchNGODetails();
//   }, [ngoId]);

//   const fetchNGODetails = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/admin/ngo/detail-profile/${ngoId}`);
//       setNgo(response.data.ngoData);
//     } catch (err) {
//       setError('Failed to fetch NGO details.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <div className="text-center mt-10 text-xl">Loading...</div>;
//   if (error) return <div className="text-center mt-10 text-xl text-red-500">{error}</div>;

//   return (
//     <div className="min-h-screen py-10 px-6 mt-20">
//       <h1 className="text-2xl font-bold mb-6">{ngo.name}</h1>
//       <img src={ngo.profilePhoto} alt={ngo.name} className="w-32 h-32 rounded-full" />
//       <p className="mt-4 text-gray-700">{ngo.description}</p>
//       <p className="mt-2 text-gray-600">{ngo.publicMessage}</p>
//       <h2 className="text-lg font-semibold mt-6">Contact</h2>
//       <p>Email: {ngo.email}</p>
//       <p>Phone: {JSON.parse(ngo.contact)?.phone || 'N/A'}</p>
//       <h2 className="text-lg font-semibold mt-6">Address</h2>
//       <p>{JSON.parse(ngo.address)?.city}, {JSON.parse(ngo.address)?.state}, {JSON.parse(ngo.address)?.country}</p>
//       <h2 className="text-lg font-semibold mt-6">Categories</h2>
//       <ul>
//         {ngo.categories.map((category, index) => (
//           <li key={index} className="text-gray-600">{category}</li>
//         ))}
//       </ul>
//       <h2 className="text-lg font-semibold mt-6">Statistics</h2>
//       <p>Total Projects: {ngo.totalProjects}</p>
//       <p>Total Campaigns: {ngo.totalCampaigns}</p>
//       <p>Total Goodness Posts: {ngo.totalGoodnessPosts}</p>
//     </div>
//   );
// };

// // export default NGODetail;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const NGODetail = () => {
//   const navigate = useNavigate();
//   const [ngo, setNgo] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const ngoId = localStorage.getItem("ngoID"); // Get ngoId from localStorage
//     if (ngoId) {
//       fetchNGODetails(ngoId);
//     } else {
//       setError("NGO ID not found. Redirecting...");
//       setTimeout(() => navigate("/admin-dashboard/ngos"), 2000);
//     }
//   }, []);

//   const fetchNGODetails = async (ngoId) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/admin/ngo/detail-profile/${ngoId}`);
//       setNgo(response.data.ngoData);
//     } catch (err) {
//       setError("Failed to fetch NGO details.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <div className="text-center mt-10 text-xl">Loading...</div>;
//   if (error) return <div className="text-center mt-10 text-xl text-red-500">{error}</div>;

//   return (
//     <div className="min-h-screen py-10 px-6 mt-20">
//       <h1 className="text-2xl font-bold mb-6">{ngo.name || " "}</h1>
//       <img src={ngo.profilePhoto || " "} alt={ngo.name} className="w-32 h-32 rounded-full" />
//       <p className="mt-4 text-gray-700">{ngo.description}</p>
//       <p className="mt-2 text-gray-600">{ngo.publicMessage}</p>
      
//       <h2 className="text-lg font-semibold mt-6">Contact</h2>
//       <p>Email: {ngo.email}</p>
//       <p>Phone: {JSON.parse(ngo.contact)?.phone || "N/A"}</p>

//       <h2 className="text-lg font-semibold mt-6">Address</h2>
//       <p>{JSON.parse(ngo.address)?.city}, {JSON.parse(ngo.address)?.state}, {JSON.parse(ngo.address)?.country}</p>

//       <h2 className="text-lg font-semibold mt-6">Categories</h2>
//       <ul>
//         {ngo.categories.map((category, index) => (
//           <li key={index} className="text-gray-600">{category}</li>
//         ))}
//       </ul>

//       <h2 className="text-lg font-semibold mt-6">Statistics</h2>
//       <p>Total Projects: {ngo.totalProjects}</p>
//       <p>Total Campaigns: {ngo.totalCampaigns}</p>
//       <p>Total Goodness Posts: {ngo.totalGoodnessPosts}</p>
//     </div>
//   );
// };

// export default NGODetail;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NGODetail = () => {
  const navigate = useNavigate();
  const [ngo, setNgo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ngoId = localStorage.getItem("ngoID"); // Get ngoId from localStorage
    if (ngoId) {
      fetchNGODetails(ngoId);
    } else {
      setError("NGO ID not found. Redirecting...");
      setTimeout(() => navigate("/admin-dashboard/ngos"), 2000);
    }
  }, []);

  const fetchNGODetails = async (ngoId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/ngo/detail-profile/${ngoId}`);
      setNgo(response.data.ngoData);
    } catch (err) {
      setError("Failed to fetch NGO details.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-10 text-xl">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-xl text-red-500">{error}</div>;

  if (!ngo) return <div className="text-center mt-10 text-xl">NGO data not found.</div>;

  return (
    <div className="min-h-screen py-10 px-6 mt-20">
      <h1 className="text-2xl font-bold mb-6">{ngo.name || "Unnamed NGO"}</h1>
      <img src={ngo.profilePhoto || " "} alt={ngo.name} className="w-32 h-32 rounded-full" />
      <p className="mt-4 text-gray-700">{ngo.description || "No description available."}</p>
      <p className="mt-2 text-gray-600">{ngo.publicMessage || "No message available."}</p>
      
      <h2 className="text-lg font-semibold mt-6">Contact</h2>
      <p>Email: {ngo.email || "N/A"}</p>
      <p>
        Phone: {(() => {
          try {
            return JSON.parse(ngo.contact)?.phone || "N/A";
          } catch {
            return "N/A";
          }
        })()}
      </p>

      <h2 className="text-lg font-semibold mt-6">Address</h2>
      <p>
        {(() => {
          try {
            const address = JSON.parse(ngo.address);
            return `${address?.city || "N/A"}, ${address?.state || "N/A"}, ${address?.country || "N/A"}`;
          } catch {
            return "N/A";
          }
        })()}
      </p>

      <h2 className="text-lg font-semibold mt-6">Categories</h2>
      <ul>
        {Array.isArray(ngo.categories) && ngo.categories.length > 0 ? (
          ngo.categories.map((category, index) => (
            <li key={index} className="text-gray-600">{category}</li>
          ))
        ) : (
          <li className="text-gray-500">No categories listed.</li>
        )}
      </ul>

      <h2 className="text-lg font-semibold mt-6">Statistics</h2>
      <p>Total Projects: {ngo.totalProjects || 0}</p>
      <p>Total Campaigns: {ngo.totalCampaigns || 0}</p>
      <p>Total Goodness Posts: {ngo.totalGoodnessPosts || 0}</p>
    </div>
  );
};

export default NGODetail;
