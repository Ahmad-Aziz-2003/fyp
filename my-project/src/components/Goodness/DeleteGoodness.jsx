import React, { useState, useEffect } from "react";

const DeleteGoodness = () => {
  const [goodnessPosts, setGoodnessPosts] = useState([]);
  const [alertMessage, setAlertMessage] = useState(""); // To track the alert message
  const [showAlert, setShowAlert] = useState(false); // To control alert visibility
  const [alertMessage2, setAlertMessage2] = useState(""); // To track the alert message
  const [showAlert2, setShowAlert2] = useState(false); // To control alert visibility
  const [goodnessIdToDelete, setGoodnessIdToDelete] = useState(null); // To track which goodness post is being deleted
  const ngoId = localStorage.getItem("ngoId"); // Retrieve NGO ID from local storage

  useEffect(() => {
    // Fetching data from the API
    fetch(`http://localhost:5000/api/goodness/Allgoodness/${ngoId}`)
      .then((response) => response.json())
      .then((data) => {
        // Extracting the data and adding the goodnessId as part of the post data
        const posts = Object.keys(data).map((key) => ({
          goodnessId: key, // The key is the goodnessId
          ...data[key], // The post data
        }));
        setGoodnessPosts(posts);
      })
      .catch((error) => console.error("Error fetching goodness posts:", error));
  }, [ngoId]);

  const handleDeleteClick = (postId) => {
    setGoodnessIdToDelete(postId); // Store the ID of the goodness post to delete
    setAlertMessage("Are you sure you want to delete this post?");
    setShowAlert(true); // Show the alert
  };

  const handleConfirmDelete = () => {
    setShowAlert(false);
    // Proceed with deletion if confirmed
    fetch(`http://localhost:5000/api/goodness/goodness/${goodnessIdToDelete}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Goodness post deleted successfully.") {
          setAlertMessage2("Goodness post deleted successfully!");
          // Remove the post from the UI state without re-fetching all posts
          setGoodnessPosts((prevPosts) =>
            prevPosts.filter((p) => p.goodnessId !== goodnessIdToDelete)
          );
        } else {
          setAlertMessage2("Failed to delete post");
        }
      })
      .catch((error) => {
        console.error("Error deleting the post:", error);
        setAlertMessage2("An error occurred while deleting the post.");
      });

    setShowAlert2(true); // Show the alert with the response message
  };

  const handleCancelDelete = () => {
    setShowAlert(false); // Hide the alert if cancel is clicked
  };

  return (
    <div className="container mx-auto p-6 pt-20">
      <div className="goodness-posts space-y-6">
        {goodnessPosts.map((post) => (
          <div
            key={post.goodnessId} // Using the goodnessId as the unique key
            data-goodness-id={post.goodnessId} // Assigning the specific goodnessId to the div
            className="view-post p-4 border rounded-lg shadow-md bg-white"
          >
            <h3 className="font-bold text-lg mb-2">{post.title}</h3>

            {/* Displaying description as HTML */}
            <p
              className="text-gray-700 mb-4"
              dangerouslySetInnerHTML={{ __html: post.description }}
            />

            {/* Displaying the goodnessId for debugging */}
            <p className="text-sm text-gray-500 mb-4">
              <strong>Goodness ID:</strong> {post.goodnessId}
            </p>

            {/* Images in a flex row */}
            <div className="goodness-images flex gap-4 overflow-x-auto mb-4">
              {post.imageUrls &&
                post.imageUrls.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Goodness Image ${index + 1}`}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                ))}
            </div>

            {/* Delete Button */}
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => handleDeleteClick(post.goodnessId)} // Passing the specific post.goodnessId here
            >
              Delete
            </button>
          </div>
        ))}
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

      {/* Success/Failure Alert */}
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

export default DeleteGoodness;
