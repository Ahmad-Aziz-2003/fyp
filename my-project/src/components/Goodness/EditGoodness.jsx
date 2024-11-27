import React, { useState, useEffect } from 'react';
import EditGoodnessPost from './EditGoodnessPost'; // Import the EditGoodnessPost component

const EditGoodness = () => {
  const [goodnessPosts, setGoodnessPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null); // State to store selected post
  const ngoId = localStorage.getItem('ngoId'); // Retrieve the NGO ID from local storage

  useEffect(() => {
    // Fetching data from the API
    fetch(`http://localhost:5000/api/goodness/Allgoodness/${ngoId}`)
      .then(response => response.json())
      .then(data => {
        // Extracting the data from the response and converting it to an array
        const posts = Object.values(data);
        setGoodnessPosts(posts);
      })
      .catch(error => console.error('Error fetching goodness posts:', error));
  }, [ngoId]);

  // Handle edit button click
  const handleEditClick = (post) => {
    setSelectedPost(post); // Set the selected post for editing
  };

  return (
    <div className="container mx-auto p-6">
      {/* Display total goodness posts */}
      <h2 className="font-bold text-2xl mb-4">Total Goodness Posts: {goodnessPosts.length}</h2>

      <div className="goodness-posts space-y-6">
        {goodnessPosts.map((post) => (
          <div
            key={post._id}
            data-goodness-id={post._id}  // Assigning the specific goodnessId to the div
            className="view-post p-4 border rounded-lg shadow-md bg-white"
          >
            <h3 className="font-bold text-lg mb-2">{post.title}</h3>

            {/* Displaying description as HTML */}
            <p className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: post.description }} />

            {/* Images in a flex row */}
            <div className="goodness-images flex gap-4 overflow-x-auto mb-4">
              {post.imageUrls && post.imageUrls.map((imageUrl, index) => (
                <img
                  key={index}
                  src={imageUrl}
                  alt={`Goodness Image ${index + 1}`}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              ))}
            </div>

            <p className="text-sm text-gray-500">
              <strong>Created At:</strong> {new Date(post.createdAt).toLocaleString()}
            </p>

            {/* Edit Button */}
            <button 
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" 
              onClick={() => handleEditClick(post)}
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {/* Render the EditGoodnessPost component when a post is selected */}
      {selectedPost && (
        <EditGoodnessPost post={selectedPost} setSelectedPost={setSelectedPost} />
      )}
    </div>
  );
};

export default EditGoodness;