import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress'; // Add this import at the top
const VerificationRequestNgo = () => {
  const navigate = useNavigate();
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUnverifiedNGOs();
  }, []);

  // const fetchUnverifiedNGOs = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5000/api/admin/unverify-ngos");
  //     setNgos(response.data.ngos);
  //   } catch (err) {
  //     setError("Failed to fetch NGOs.");
  //   } finally {
  //     setLoading(false);
  //   }
  //  };

const fetchUnverifiedNGOs = async () => {
  try {
    const response = await axios.get("http://localhost:5000/api/admin/unverify-ngos");

    if (response.data.error) {
      setMessage(response.data.error); // show "No unverified NGOs found."
      setNgos([]); // ensure NGOs list is empty
    } else {
      setNgos(response.data.ngos);
    }

  } catch (err) {
    console.log(err);
    setError("Failed to fetch NGOs.");
  } finally {
    setLoading(false);
  }
};

  const handleVerifyNGO = async (ngoId) => {
    if (!window.confirm("Are you sure you want to verify this NGO?")) return;

    try {
      const response = await axios.post(`http://localhost:5000/api/admin/verify-ngo/${ngoId}`);

      // Update state without reloading
      setNgos((prevNgos) => prevNgos.filter((ngo) => ngo.ngoId !== ngoId));

      setMessage(response.data.message);
      setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
    } catch (error) {
      console.error("Error verifying NGO:", error);
      setMessage("Failed to verify NGO.");
    }
  };

  const handleRejectNGO = async (ngoId) => {
    if (!window.confirm("Are you sure you want to reject this NGO?")) return;

    try {
      const response = await axios.delete(`http://localhost:5000/api/admin/reject/${ngoId}`);

      // Remove rejected NGO from state
      setNgos((prevNgos) => prevNgos.filter((ngo) => ngo.ngoId !== ngoId));

      setMessage(response.data.message);
      setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
    } catch (error) {
      console.error("Error rejecting NGO:", error);
      setMessage("Failed to reject NGO.");
    }
  };



if (loading) {
  return (
    <div className="flex justify-center mt-96">
      <CircularProgress />
    </div>
  );
}

if (error) {
  return (
    <div className="text-center mt-96 text-xl text-red-500">
      {error}
    </div>
  );
}


  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">NGO Verification Requests</h1>

      {/* Success/Error Message */}
      {message && (
        <div className="mb-4 p-3 bg-green-200 text-green-800 rounded transition-opacity duration-500">
          {message}
        </div>
      )}

      <div className="space-y-6">
        {ngos.length === 0 ? (
          <p className="text-center text-gray-600">No pending NGO verification requests.</p>
        ) : (
          ngos.map((ngo) => (
            <div key={ngo.ngoId} className="border p-5 rounded-lg shadow-md bg-white">
              <p>{ngo.ngoId}</p>
              <h2 className="text-xl font-bold">{ngo.name}</h2>
              <p className="text-gray-600"><strong>Email:</strong> {ngo.email}</p>
              <p className="text-gray-600">
                <strong>Founded Date:</strong> {new Date(ngo.foundedDate).toLocaleDateString()}
              </p>
              <p className="text-gray-600"><strong>Registration #:</strong> {ngo.registrationNumber}</p>

              {/* NGO Image (if available) */}
              {ngo.profilePhoto && (
                <img
                  src={ngo.profilePhoto}
                  alt={ngo.name}
                  className="w-40 h-40 mt-3 object-cover rounded-lg"
                />
              )}

              {/* Action Buttons */}
              <div className="flex space-x-3 mt-4">
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  onClick={() => handleVerifyNGO(ngo.ngoId)}
                >
                  ✅ Verify
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  onClick={() => handleRejectNGO(ngo.ngoId)} // Call reject function
                >
                  ❌ Reject
                </button>
                <button
                  onClick={() => {
                    localStorage.setItem("ngoID", ngo.ngoId);
                    navigate(`/admin-dashboard/NgoDetail`);
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  👁 View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default VerificationRequestNgo;
