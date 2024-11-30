import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill'; // Import ReactQuill for rich text editing
import 'react-quill/dist/quill.snow.css'; // ReactQuill styles
import axios from 'axios'; // Axios for API requests

const EditCampaignSpecific = () => {
  const [campaign, setCampaign] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [endDate, setEndDate] = useState('');
  const [images, setImages] = useState([]);
  const campaignId = localStorage.getItem('campaignId'); // Retrieve campaign ID from localStorage

  useEffect(() => {
    if (campaignId) {
      fetch(`http://localhost:5000/api/campaigns/campaign-post/${campaignId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch campaign data');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data); // Add this to inspect the data in console
          setCampaign(data); // Ensure the data is set correctly
          setTitle(data.title || ''); // Fallback to empty string
          setDescription(data.description || '');
          setTargetAmount(data.targetAmount || '');
          setEndDate(data.endDate ? data.endDate.split('T')[0] : ''); // Handle date correctly
          setImages(data.imageUrls || []); // Set images correctly from API response
        })
        .catch((error) => {
          console.error('Error fetching post data:', error);
        });
    }
  }, [campaignId]);

  const handleSaveChanges = async () => {
    try {
      const updatedCampaign = {
        title,
        description,
        targetAmount,
        endDate,
        campaignId,
      };

      const response = await axios.put(
        `http://localhost:5000/api/campaigns/update-campaign/${campaignId}`,
        updatedCampaign,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Campaign updated successfully:', response.data);
      // Optionally, display a success message or redirect
    } catch (error) {
      console.error('Error updating campaign:', error);
    }
  };

  if (!campaign) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-6">Edit Campaign</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <label className="block mb-2 text-gray-600">Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the campaign title"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-gray-600">Description</label>
          <ReactQuill
            value={description}
            onChange={setDescription}
            theme="snow"
            placeholder="Write your campaign description"
            className="editor"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-gray-600">Target Amount</label>
          <input
            type="number"
            className="w-full border border-gray-300 p-2 rounded"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            placeholder="Enter the target amount"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-gray-600">End Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 p-2 rounded"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {/* Displaying the uploaded images */}
        {images.length > 0 && (
          <div className="mb-4">
            <label className="block mb-2 text-gray-600">Uploaded Images</label>
            <div className="flex flex-wrap">
              {images.map((image, index) => (
                <div key={index} className="m-2">
                  <img
                    src={image}
                    alt={`Uploaded image ${index + 1}`}
                    className="w-24 h-24 object-cover rounded"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mb-4">
          <button
            type="button"
            onClick={handleSaveChanges}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCampaignSpecific;
