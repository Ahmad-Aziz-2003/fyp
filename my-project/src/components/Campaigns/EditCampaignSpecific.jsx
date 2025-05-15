
import React, { useState, useEffect } from "react";
import axios from "axios";

const EditCampaignSpecific = () => {
  const [campaign, setCampaign] = useState(null);
  const [targetAmount, setTargetAmount] = useState("");
  const [endDate, setEndDate] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const campaignId = localStorage.getItem("campaignId"); // Retrieve campaign ID

  useEffect(() => {
    if (campaignId) {
      fetch(`http://localhost:5000/api/campaigns/campaign-post/${campaignId}`)
        .then((response) => {
          if (!response.ok) throw new Error("Failed to fetch campaign data");
          return response.json();
        })
        .then((data) => {
          setCampaign(data);
          setTargetAmount(data.targetAmount || "");
          setEndDate(data.endDate ? data.endDate.split("T")[0] : "");
        })
        .catch((error) => console.error("Error fetching campaign:", error));
    }
  }, [campaignId]);

  const handleSaveChanges = async () => {
    if (!targetAmount || !endDate) {
      setAlertMessage("Target Amount and End Date are required.");
      setShowAlert(true);
      return;
    }
    setLoading(true);

    try {
      const updatedCampaign = { targetAmount, endDate };

      const response = await axios.put(
        `http://localhost:5000/api/campaigns/update-campaign/${campaignId}`,
        updatedCampaign,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.message) {
        setAlertMessage("Campaign updated successfully!");
        setShowAlert(true);
      }
    } catch (error) {
      setAlertMessage("Error updating campaign. Please try again.");
      setShowAlert(true);
      console.error("Error updating campaign:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!campaign) return <div>Loading...</div>; // Loading state

  return (
    <div className="relative mt-20">
      <div className="p-6 bg-white shadow rounded-lg z-10">
        <h1 className="text-3xl font-bold mb-6 text-[#225738]">
          Edit Campaign
        </h1>
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Title (Disabled) */}
          <div className="mb-4">
            <label className="block mb-2 font-bold text-[#225738]">Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-3 rounded-lg bg-gray-100 cursor-not-allowed"
              value={campaign.title}
              disabled
            />
          </div>

          {/* Description (Disabled) */}
          <div className="mb-4">
            <label className="block mb-2 font-bold text-[#225738]">Description</label>
            <textarea
              className="w-full border border-gray-300 p-3 rounded-lg bg-gray-100 cursor-not-allowed"
              value={campaign.description}
              disabled
              rows="4"
            />
          </div>

          {/* Target Amount (Editable) */}
          <div className="mb-4">
            <label className="block mb-2 font-bold text-[#225738]">
              Target Amount
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-600"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              placeholder="Enter the target amount"
            />
          </div>

          {/* End Date (Editable) */}
          <div className="mb-4">
            <label className="block mb-2 font-bold text-[#225738]">
              End Date
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-600"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
              onClick={() => window.history.back()}
            >
              Back
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 transition"
              onClick={handleSaveChanges}
              disabled={loading}
            >
              {loading ? "Loading..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {/* Alert Modal */}
      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-semibold">{alertMessage}</p>
            <button
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
              onClick={() => setShowAlert(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditCampaignSpecific;
