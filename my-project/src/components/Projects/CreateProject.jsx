import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import DOMPurify from "dompurify"; // Import DOMPurify for sanitizing
import "react-quill/dist/quill.snow.css"; // Import Quill's CSS

const CreateProject = () => {
  const [projectTitle, setProjectTitle] = useState("");
  const [description, setDescription] = useState(""); // Rich text (HTML format)
  const [images, setImages] = useState([]); // Images state
  const [startDate, setStartDate] = useState(""); // Start date
  const [expectedEndDate, setExpectedEndDate] = useState(""); // Expected end date
  const [location, setLocation] = useState(""); // Location
  const [estimatedBudget, setEstimatedBudget] = useState(""); // Estimated budget
  const [category, setCategory] = useState(""); // Category
  const [status, setStatus] = useState(""); // Status: "Completed", "Ongoing", "Future"
  const [uploading, setUploading] = useState(false); // For upload status
  const [alertMessage, setAlertMessage] = useState(""); // To track the alert message
  const [showAlert, setShowAlert] = useState(false); // To control alert visibility

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedTitle = localStorage.getItem("projectTitle");
    const storedDescription = localStorage.getItem("description");
    const storedImages = JSON.parse(localStorage.getItem("images"));
    const storedStartDate = localStorage.getItem("startDate");
    const storedEndDate = localStorage.getItem("expectedEndDate");
    const storedLocation = localStorage.getItem("location");
    const storedEstimatedBudget = localStorage.getItem("estimatedBudget");
    const storedCategory = localStorage.getItem("category");

    if (storedTitle) setProjectTitle(storedTitle);
    if (storedDescription) setDescription(storedDescription);
    if (storedImages) setImages(storedImages);
    if (storedStartDate) setStartDate(storedStartDate);
    if (storedEndDate) setExpectedEndDate(storedEndDate);
    if (storedLocation) setLocation(storedLocation);
    if (storedEstimatedBudget) setEstimatedBudget(storedEstimatedBudget);
    if (storedCategory) setCategory(storedCategory);
  }, []);

  // Save data to localStorage when any form field changes
  useEffect(() => {
    localStorage.setItem("projectTitle", projectTitle);
    localStorage.setItem("description", description);
    localStorage.setItem("images", JSON.stringify(images));
    localStorage.setItem("startDate", startDate);
    localStorage.setItem("expectedEndDate", expectedEndDate);
    localStorage.setItem("location", location);
    localStorage.setItem("estimatedBudget", estimatedBudget);
    localStorage.setItem("category", category);
  }, [
    projectTitle,
    description,
    images,
    startDate,
    expectedEndDate,
    location,
    estimatedBudget,
    category,
  ]);

  const handleImageUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // Check if adding selected files exceeds the limit of 5 images
    if (selectedFiles.length + images.length > 5) {
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
      if (
        !projectTitle ||
        !description ||
        images.length === 0 ||
        !startDate ||
        !expectedEndDate ||
        !location ||
        !estimatedBudget ||
        !category ||
        !status
      ) {
        throw new Error("All fields are required.");
      }

      const ngoId = localStorage.getItem("ngoId");
      if (!ngoId) throw new Error("NGO ID is missing. Please log in.");

      setUploading(true);
      const formData = new FormData();
      formData.append("projectTitle", projectTitle);
      formData.append("description", DOMPurify.sanitize(description));
      formData.append("ngoId", ngoId);
      formData.append("startDate", startDate);
      formData.append("expectedEndDate", expectedEndDate);
      formData.append("location", location);
      formData.append("estimatedBudget", estimatedBudget);
      formData.append("category", category);
      formData.append("status", status);
      images.forEach((img) => formData.append("imagesproject", img));

      const response = await fetch(
        `http://localhost:5000/api/project/create-project/${ngoId}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Submission failed.");

      setAlertMessage("Project created successfully!");
      setShowAlert(true);
      setProjectTitle("");
      setDescription("");
      setImages([]);
      setStartDate("");
      setExpectedEndDate("");
      setLocation("");
      setEstimatedBudget("");
      setCategory("");
      setStatus(""); // Reset status
    } catch (error) {
      setAlertMessage(error.message);
      setShowAlert(true);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg max-w-4xl mx-auto mt-[5.5rem] mb-6">
      <h1 className="text-3xl font-bold mb-6 text-[#225738]">Create Project</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-5">
          <label className="block text-lg font-medium text-[#225738] mb-2">
            Title
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            placeholder="Enter the project title here..."
          />
        </div>

        <div className="mb-5">
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

        <div className="mb-5">
          <label className="block text-lg font-medium text-[#225738] mb-2">
            Upload Images (max 5, 3 MB each)
          </label>
          <input
            type="file"
            accept=".png,.jpg,.jpeg"
            multiple
            onChange={handleImageUpload}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          {images.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative w-24 h-24 bg-gray-200 rounded-lg overflow-hidden"
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={image.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageRemove(index)}
                    className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-5 flex gap-4">
          <div className="flex-1">
            <label className="block text-lg font-medium text-[#225738] mb-2">
              Start Date
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <label className="block text-lg font-medium text-[#225738] mb-2">
              Expected End Date
            </label>
            <input
              type="date"
              className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              value={expectedEndDate}
              onChange={(e) => setExpectedEndDate(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-5 flex gap-4">
          <div className="flex-1">
            <label className="block text-lg font-medium text-[#225738] mb-2">
              Location
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter project location"
            />
          </div>

          <div className="flex-1">
            <label className="block text-lg font-medium text-[#225738] mb-2">
              Estimated Budget
            </label>
            <input
              type="number"
              className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              value={estimatedBudget}
              onChange={(e) => setEstimatedBudget(e.target.value)}
              placeholder="Estimated budget"
            />
          </div>
        </div>

        <div className="mb-5 flex gap-4">
          <div className="flex-1">
            <label className="block text-lg font-medium text-[#225738] mb-2">
              Category
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter category"
            />
          </div>
          <div className="flex-1">
            <label className="block text-lg font-medium text-[#225738] mb-2">
              Status
            </label>
            <select
              className="w-full border border-gray-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              value={status}
              //   placeholder="Select Status"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="Future">Future</option>
            </select>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-400"
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
            {uploading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>

      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-semibold text-[#225738]">
              {alertMessage}
            </p>
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

export default CreateProject;
