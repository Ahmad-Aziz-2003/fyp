import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill'; // Import ReactQuill for rich text editor
import 'react-quill/dist/quill.snow.css'; // Include the styles for ReactQuill
import axios from 'axios'; // Import axios to send requests
const EditGoodnessPost = () => {
    const [post, setPost] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const goodnessId = localStorage.getItem('goodnessId'); // Retrieve the goodnessId from localStorage
    console.log(goodnessId);
    useEffect(() => {
        if (goodnessId) {
            // Fetch the post data based on goodnessId
            fetch(`http://localhost:5000/api/goodness/goodnessPost/${goodnessId}`)
                .then((response) => response.json())
                .then((data) => {
                    setPost(data);
                    setTitle(data.title);
                    setDescription(data.description);
                    setImages(data.imageUrls || []);
                })
                .catch((error) => console.error('Error fetching post data:', error));
        }
    }, [goodnessId]);

    
    const handleSaveChanges = async () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('goodnessId', goodnessId);

        // Add selected images to FormData
        images.forEach((image) => {
            if (image instanceof File) {
                formData.append('imagesgoodness', image);
            }
        });

        try {
            // Send a PUT request to update the post
            const response = await axios.put(
                `http://localhost:5000/api/goodness/update-goodness/${goodnessId}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Make sure to set the right header
                    },
                }
            );
            console.log('Post updated successfully:', response.data);
            // Optionally, you can redirect or show a success message here
        } catch (error) {
            console.error('Error updating post:', error);
        }
        
    };
    if (!post) {
        return <div>Loading...</div>; // Loading state while fetching post data
    }

    return (
        <div className="p-6 bg-white shadow rounded">
            <h1 className="text-2xl font-bold mb-6">Edit Goodness Post</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-4">
                    <label className="block mb-2 text-gray-600">Title</label>
                    <input
                        type="text"
                        className="w-full border border-gray-300 p-2 rounded"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter the title here..."
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-gray-600">Description</label>
                    <ReactQuill
                        value={description}
                        onChange={setDescription}
                        theme="snow"
                        placeholder="Write your description here..."
                        className="editor"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-gray-600">Upload Images (max 5, 3 MB each)</label>
                    <input
                        type="file"
                        accept=".png,.jpg,.jpeg"
                        multiple
                        onChange={(e) => setImages(Array.from(e.target.files))}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                    {images.length > 0 && (
                        <div className="mt-2 flex flex-wrap">
                            {images.map((image, index) => (
                                <div key={index} className="relative m-2 border-2 border-gray-300 rounded">
                                    <img
                                        src={image instanceof File ? URL.createObjectURL(image) : image} // Check if it's a File object
                                        alt={image.name || image} // Use 'name' if File, or the image URL as the alt
                                        className="w-24 h-24 object-cover rounded"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setImages(images.filter((_, i) => i !== index))}
                                        className="absolute top-0 right-0 text-white bg-red-600 rounded-full p-1"
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
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

export default EditGoodnessPost;
