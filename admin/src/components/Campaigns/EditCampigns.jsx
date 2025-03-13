import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const EditCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const navigate = useNavigate(); // Create the navigate function

  const ngoId = localStorage.getItem("ngoId"); // Retrieve NGO ID from local storage

  useEffect(() => {
    // Fetching data from the API
    fetch(`http://localhost:5000/api/campaigns/All-Campaigns/${ngoId}`)
      .then((response) => response.json())
      .then((data) => {
        // Extracting campaigns and adding the campaignId as part of the campaign data
        const campaignList = Object.keys(data).map((key) => ({
          campaignId: key, // The key is the campaignId
          ...data[key], // The campaign data
        }));
        setCampaigns(campaignList);
      })
      .catch((error) => console.error("Error fetching campaigns:", error));
  }, [ngoId]);

  return (
    <div className="container mx-auto p-6">
      {/* Display total campaigns */}
      <h2 className="font-bold text-2xl mb-4">
        Total Campaigns: {campaigns.length}
      </h2>

      <div className="campaigns space-y-6">
        {campaigns.map((campaign) => {
          // Calculate progress percentage
          const progressPercentage = Math.min(
            (campaign.progressAmount / campaign.targetAmount) * 100,
            100
          ).toFixed(2);

          return (
            <div
              key={campaign.campaignId} // Using the campaignId as the unique key
              data-campaigns-id={campaign.campaignId} // Assigning the specific goodnessId to the div
              className="campaign p-4 border rounded-lg shadow-md bg-white"
            >
              {/* Campaign Title */}
              <h3 className="font-bold text-lg mb-2">{campaign.title}</h3>

              {/* Progress Bar */}
              <div className="progress-bar mb-4">
                <div className="relative h-6 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${progressPercentage}%` }}
                    className="absolute top-0 left-0 h-full bg-green-500"
                  ></div>
                  <div className="absolute top-0 left-0 h-full flex items-center justify-center w-full text-xs font-bold text-black">
                    {progressPercentage}%
                  </div>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span>Progress: {campaign.progressAmount}</span>
                  <span>Target: {campaign.targetAmount}</span>
                </div>
              </div>

              {/* Description */}
              <p
                className="text-gray-700 mb-4"
                dangerouslySetInnerHTML={{ __html: campaign.description }}
              ></p>

              {/* Images */}
              <div className="campaign-images flex gap-4 overflow-x-auto mb-4">
                {campaign.imageUrls &&
                  campaign.imageUrls.map((imageUrl, index) => (
                    <img
                      key={index}
                      src={imageUrl}
                      alt={`Campaign Image ${index + 1}`}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                  ))}
              </div>

              {/* End Date */}
              <p className="text-sm text-gray-500">
                <strong>End Date:</strong>{" "}
                {new Date(campaign.endDate).toLocaleDateString()}
              </p>

              {/* Edit Button */}
              <button
                className="mt-4 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                onClick={() => {
                  localStorage.setItem("campaignId", campaign.campaignId); // Store goodnessId in localStorage
                  navigate(`/ngo-dashboard/editCampaign/campaignPost`); // Use navigate instead of window.location.href
                }}
              >
                Edit
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EditCampaigns;
