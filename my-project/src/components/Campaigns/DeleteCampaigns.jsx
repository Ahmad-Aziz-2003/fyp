import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";

const DeleteCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [alertMessage, setAlertMessage] = useState(""); // To track the alert message
  const [showAlert, setShowAlert] = useState(false); // To control alert visibility
  const [alertMessage2, setAlertMessage2] = useState(""); // To track the alert message
  const [showAlert2, setShowAlert2] = useState(false); // To control alert visibility
  const [campaignIdToDelete, setCampaignIdToDelete] = useState(null); // To track which campaign is being deleted
  const [loading, setLoading] = useState(true);

  const ngoId = localStorage.getItem("ngoId"); // Retrieve NGO ID from local storage

  // useEffect(() => {
  //   // Fetching data from the API
  //   fetch(`http://localhost:5000/api/campaigns/All-Campaigns/${ngoId}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Extracting campaigns and adding the campaignId as part of the campaign data
  //       const campaignList = Object.keys(data).map((key) => ({
  //         campaignId: key, // The key is the campaignId
  //         ...data[key], // The campaign data
  //       }));
  //       setCampaigns(campaignList);
  //     })
  //     .catch((error) => console.error("Error fetching campaigns:", error));
  // }, [ngoId]);
useEffect(() => {
  setLoading(true); // Start loading before fetching

  fetch(`http://localhost:5000/api/campaigns/All-Campaigns/${ngoId}`)
    .then((response) => response.json())
    .then((data) => {
      const campaignList = Object.keys(data).map((key) => ({
        campaignId: key,
        ...data[key],
      }));
      setCampaigns(campaignList);
    })
    .catch((error) => {
      console.error("Error fetching campaigns:", error);
    })
    .finally(() => {
      setLoading(false); // Stop loading after success or failure
    });
}, [ngoId]);

  const handleDeleteClick = (postId) => {
    setCampaignIdToDelete(postId); // Store the ID of the campaign to delete
    setAlertMessage("Are you sure you want to delete this post?");
    setShowAlert(true); // Show the alert
  };

  const handleConfirmDelete = () => {
    setShowAlert(false);
    // Proceed with deletion if confirmed
    fetch(
      `http://localhost:5000/api/campaigns/campaign-delete/${campaignIdToDelete}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "campaign deleted successfully.") {
          setAlertMessage2("Campaign deleted successfully!");
          // Remove the campaign from the state
          setCampaigns((prevPosts) =>
            prevPosts.filter((p) => p.campaignId !== campaignIdToDelete)
          );
        } else {
          setAlertMessage2("Failed to delete campaign.");
        }
      })
      .catch((error) => {
        console.error("Error deleting the post:", error);
        setAlertMessage2("An error occurred while deleting the campaign.");
      });

    setShowAlert2(true); // Show the alert with the response message
  };

  const handleCancelDelete = () => {
    setShowAlert(false); // Hide the alert if cancel is clicked
  };
if (loading) {
  return (
    <div className="flex justify-center items-center mt-96">
      <CircularProgress />
    </div>
  );
}

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

              {/* Delete Button */}
              <button
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleDeleteClick(campaign.campaignId)} // Passing the specific campaignId
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>

      {/* Custom Confirmation Alert */}
      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-semibold">{alertMessage}</p>
            <div className="mt-4">
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg mr-4"
                onClick={handleConfirmDelete}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                onClick={handleCancelDelete}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
      {showAlert2 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-semibold">{alertMessage2}</p>
            <button
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
              onClick={() => setShowAlert2(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteCampaigns;
