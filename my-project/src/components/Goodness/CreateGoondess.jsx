import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import DOMPurify from "dompurify"; // Import DOMPurify for sanitizing
import "react-quill/dist/quill.snow.css"; // Import Quill's CSS

const CreateGoodness = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); // Rich text (HTML format)
  const [images, setImages] = useState([]); // Images state
  const [uploading, setUploading] = useState(false); // For upload status
  const [alertMessage, setAlertMessage] = useState(""); // To track the alert message
  const [showAlert, setShowAlert] = useState(false); // To control alert visibility

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedTitle = localStorage.getItem("title");
    const storedDescription = localStorage.getItem("description");
    const storedImages = JSON.parse(localStorage.getItem("images"));

    if (storedTitle) setTitle(storedTitle);
    if (storedDescription) setDescription(storedDescription);
    if (storedImages) setImages(storedImages);
  }, []);

  // Save data to localStorage when any form field changes
  useEffect(() => {
    localStorage.setItem("title", title);
    localStorage.setItem("description", description);
    localStorage.setItem("images", JSON.stringify(images));
  }, [title, description, images]);

  const handleImageUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // Check if adding selected files exceeds the limit of 5 images
    if (selectedFiles.length + images.length > 5) {
      alert("You can upload a maximum of 5 images.");
      setAlertMessage("You can upload a maximum of 5 images.");
      setShowAlert(true);
      return;
    }

    const validFiles = selectedFiles.filter((file) => {
      if (file.size > 3 * 1024 * 1024) {
        setAlertMessage(`${file.name} exceeds the 3 MB limit.`);
        setShowAlert(true);
        return false;
      }
      if (!["image/png", "image/jpg", "image/jpeg"].includes(file.type)) {
        setAlertMessage(
          `${file.name} is not a valid file type. Only PNG, JPG, and JPEG are allowed.`
        );
        setShowAlert(true);
        return false;
      }
      return true;
    });

    setImages((prevImages) => [...prevImages, ...validFiles]);
  };

  const handleImageRemove = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      if (!title || !description || images.length === 0) {
        throw new Error("All fields are required.");
      }

      const ngoId = localStorage.getItem("ngoId");
      if (!ngoId) throw new Error("NGO ID is missing. Please log in.");

      setUploading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", DOMPurify.sanitize(description));
      formData.append("ngoId", ngoId);
      images.forEach((img) => formData.append("imagesgoodness", img));

      const response = await fetch(
        "http://localhost:5000/api/goodness/create-goodness",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Submission failed.");

      setAlertMessage("Goodness post created successfully!");
      setShowAlert(true);
      setTitle("");
      setDescription("");
      setImages([]);
    } catch (error) {
      setAlertMessage(error.message);
      setShowAlert(true);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-[5.5rem] max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-[#225738] mb-6">
        Create Goodness
      </h1>
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-[#225738] mb-2">
            Title
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-600 focus:outline-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the goodness title here..."
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-[#225738] mb-2">
            Description
          </label>
          <ReactQuill
            value={description}
            onChange={setDescription}
            theme="snow"
            placeholder="Write your description here..."
            className="bg-gray-100 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-[#225738] mb-2">
            Upload Images (max 5, 3 MB each)
          </label>
          <input
            type="file"
            accept=".png,.jpg,.jpeg"
            multiple
            onChange={handleImageUpload}
            className="block w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-600 focus:outline-none"
          />
          {images.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageRemove(index)}
                    className="absolute top-2 right-2 bg-red-600 text-white text-sm p-1 rounded-full"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            onClick={() => window.history.back()}
          >
            Back
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600"
            onClick={handleSubmit}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Submit"}
          </button>
        </div>
      </form>

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

export default CreateGoodness;
