import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress'; // Import this at the top
const NGODetail = () => {
  const navigate = useNavigate();
  const [ngoId, setNgoId] = useState(localStorage.getItem("ngoID"));
  const [ngo, setNgo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Whenever ngoId changes (due to localStorage update), fetch new data
  useEffect(() => {
    if (ngoId) {
      fetchNGODetails(ngoId);
    } else {
      setError("NGO ID not found. Redirecting...");
      setTimeout(() => navigate("/admin-dashboard/ngos"), 2000);
    }
  }, [ngoId]);

  // Poll localStorage for NGO ID changes
  useEffect(() => {
    const interval = setInterval(() => {
      const currentId = localStorage.getItem("ngoID");
      if (currentId && currentId !== ngoId) {
        setNgoId(currentId);
      }
    }, 1000); // Check every 1 second

    return () => clearInterval(interval);
  }, [ngoId]);

  const fetchNGODetails = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/ngo/detail-profile/${id}`);
      setNgo(response.data.ngoData);
    } catch (err) {
      setError("Failed to fetch NGO details.");
    } finally {
      setLoading(false);
    }
  };



if (loading) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24rem' }}>
      <CircularProgress />
    </div>
  );
}

if (error) {
  return (
    <div style={{ textAlign: 'center', marginTop: '20rem', color: 'red', fontSize: '1.25rem' }}>
      {error}
    </div>
  );
}

if (!ngo) {
  return (
    <div style={{ textAlign: 'center', marginTop: '20rem', fontSize: '1.25rem' }}>
      NGO data not found.
    </div>
  );
}

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
            return `${address.street}, ${address.city}, ${address.state}, ${address.zip}`;
          } catch {
            return "N/A";
          }
        })()}
      </p>
    </div>
  );
};

export default NGODetail;
