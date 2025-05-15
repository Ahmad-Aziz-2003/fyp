import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import CircularProgress from "@mui/material/CircularProgress";

const EditGoodness = () => {
  const [goodnessPosts, setGoodnessPosts] = useState([]);
  const navigate = useNavigate(); // Create the navigate function
const [loading, setLoading] = useState(true);

  const ngoId = localStorage.getItem("ngoId"); // Retrieve the NGO ID from local storage

  // useEffect(() => {
  //   // Fetching data from the API
  //   fetch(`http://localhost:5000/api/goodness/Allgoodness/${ngoId}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       // Extracting the data and adding the goodnessId as part of the post data
  //       const posts = Object.keys(data).map((key) => ({
  //         goodnessId: key, // The key is the goodnessId
  //         ...data[key], // The post data
  //       }));
  //       setGoodnessPosts(posts);
  //     })
  //     .catch((error) => console.error("Error fetching goodness posts:", error));
  // }, [ngoId]);
  useEffect(() => {
  if (!ngoId) return;  // Optional: skip fetch if ngoId is falsy

  setLoading(true); // Start loading

  fetch(`http://localhost:5000/api/goodness/Allgoodness/${ngoId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch goodness posts");
      }
      return response.json();
    })
    .then((data) => {
      const posts = Object.keys(data).map((key) => ({
        goodnessId: key,
        ...data[key],
      }));
      setGoodnessPosts(posts);
      setLoading(false); // Done loading
    })
    .catch((error) => {
      console.error("Error fetching goodness posts:", error);
      setLoading(false); // Done loading, even on error
    });
}, [ngoId]);
if (loading) {
  return (
    <div className="flex justify-center items-center mt-96">
      <CircularProgress />
    </div>
  );
}

  return (
    <div className="container mx-auto p-6">
      {/* Display total goodness posts */}
      <h2 className="font-bold text-2xl mb-4">
        Total Goodness Posts: {goodnessPosts.length}
      </h2>

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

            <p className="text-sm text-gray-500">
              <strong>Created At:</strong>{" "}
              {new Date(post.createdAt).toLocaleString()}
            </p>

            {/* Edit Button */}
            <button
              className="mt-4 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              onClick={() => {
                localStorage.setItem("goodnessId", post.goodnessId); // Store goodnessId in localStorage
                navigate(`/ngo-dashboard/editGoodness/goodnessPost`); // Use navigate instead of window.location.href
              }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditGoodness;
