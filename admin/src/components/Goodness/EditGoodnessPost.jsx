import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill"; // Import ReactQuill for rich text editor
import "react-quill/dist/quill.snow.css"; // Include the styles for ReactQuill
import axios from "axios"; // Import axios to send requests
import DOMPurify from "dompurify"; // For sanitizing HTML

const EditGoodnessPost = () => {
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const goodnessId = localStorage.getItem("goodnessId"); // Retrieve the goodnessId from localStorage

  useEffect(() => {
    if (goodnessId) {
      fetch(`http://localhost:5000/api/goodness/goodnessPost/${goodnessId}`)
        .then((response) => response.json())
        .then((data) => {
          setPost(data);
          setTitle(data.title);
          setDescription(data.description);
          setImages(data.imageUrls || []);
        })
        .catch((error) => console.error("Error fetching post data:", error));
    }
  }, [goodnessId]);

  const handleSaveChanges = async () => {
    if (!title || !description) {
      setAlertMessage("All fields are required.");
      setShowAlert(true);
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", DOMPurify.sanitize(description));
    formData.append("goodnessId", goodnessId);

    images.forEach((image) => {
      if (image instanceof File) {
        formData.append("imagesgoodness", image);
      }
    });

    try {
      const response = await axios.put(
        `http://localhost:5000/api/goodness/update-goodness/${goodnessId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setAlertMessage("Post updated successfully!");
      setShowAlert(true);
    } catch (error) {
      setAlertMessage("Error updating post. Please try again.");
      setShowAlert(true);
      console.error("Error updating post:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!post) {
    return <div>Loading...</div>; // Loading state while fetching post data
  }

  return (
    <div className="relative mt-20">
      {/* Main Form */}
      <div className="p-6 bg-white shadow rounded-lg z-10">
        <h1 className="text-3xl font-bold mb-6 text-[#225738]">
          Edit Goodness
        </h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block mb-2 font-bold text-[#225738]">Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the title here..."
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-bold text-[#225738]">
              Description
            </label>
            <ReactQuill
              value={description}
              onChange={setDescription}
              theme="snow"
              placeholder="Write your description here..."
              className="editor"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 font-bold text-[#225738]">
              Upload Images (max 5, 3 MB each)
            </label>
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
                  <div
                    key={index}
                    className="relative m-2 border-2 border-gray-300 rounded"
                  >
                    <img
                      src={
                        image instanceof File
                          ? URL.createObjectURL(image)
                          : image
                      }
                      alt={image.name || image}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setImages(images.filter((_, i) => i !== index))
                      }
                      className="absolute top-0 right-0 text-white bg-red-600 rounded-full p-1"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

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
              className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              onClick={handleSaveChanges}
              disabled={loading}
            >
              {loading ? "Loading..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      {/* Modal Alert */}
      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-semibold">{alertMessage}</p>
            <button
              className="mt-4 px-4 py-2 bg-green-700 text-white rounded-lg"
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

export default EditGoodnessPost;
