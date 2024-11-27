import React, { useState, useEffect } from 'react';

const DeleteGoodness = () => {
  const [goodnessPosts, setGoodnessPosts] = useState([]);
  const ngoId = localStorage.getItem('ngoId'); // Retrieve the NGO ID from local storage

  useEffect(() => {
    // Fetching data from the API
    fetch(`http://localhost:5000/api/goodness/Allgoodness/${ngoId}`)
      .then(response => response.json())
      .then(data => {
        // Extracting the data and adding the goodnessId as part of the post data
        const posts = Object.keys(data).map(key => ({
          goodnessId: key, // The key is the goodnessId
          ...data[key],    // The post data
        }));
        setGoodnessPosts(posts);
      })
      .catch(error => console.error('Error fetching goodness posts:', error));
  }, [ngoId]);

  const handleDeleteClick = (postId) => {
    console.log(`Deleting post with goodnessId: ${postId}`); // This will now show the correct goodnessId
    const confirmation = window.confirm('Are you sure you want to delete this post?');
    if (confirmation) {
      // Send delete request to backend
      fetch(`http://localhost:5000/api/goodness/goodness/${postId}`, {
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(data => {
          if (data.message === "Goodness post deleted successfully.") {
            alert('Post deleted successfully!');
            // Remove the post from the UI state without re-fetching all posts
            setGoodnessPosts(prevPosts => prevPosts.filter(p => p.goodnessId !== postId));
          } else {
            alert('Failed to delete post');
          }
        })
        .catch(error => console.error('Error deleting the post:', error));
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="goodness-posts space-y-6">
        {goodnessPosts.map((post) => (
          <div
            key={post.goodnessId} // Using the goodnessId as the unique key
            data-goodness-id={post.goodnessId}  // Assigning the specific goodnessId to the div
            className="view-post p-4 border rounded-lg shadow-md bg-white"
          >
            <h3 className="font-bold text-lg mb-2">{post.title}</h3>

            {/* Displaying description as HTML */}
            <p className="text-gray-700 mb-4" dangerouslySetInnerHTML={{ __html: post.description }} />

            {/* Displaying the goodnessId for debugging */}
            <p className="text-sm text-gray-500 mb-4">
              <strong>Goodness ID:</strong> {post.goodnessId}
            </p>

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
    </div>
  );
};

export default DeleteGoodness;
