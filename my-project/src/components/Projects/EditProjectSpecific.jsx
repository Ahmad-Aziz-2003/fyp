import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import DOMPurify from "dompurify";
import "react-quill/dist/quill.snow.css";

const EditProjectSpecific = () => {
  const [projectTitle, setProjectTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [expectedEndDate, setExpectedEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [estimatedBudget, setEstimatedBudget] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [uploading, setUploading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const projectId = localStorage.getItem("projectId");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/project/project-specific/${projectId}`);
        const data = await response.json();

        setProjectTitle(data.projectTitle);
        setDescription(data.description);
        setStartDate(data.startDate);
        setExpectedEndDate(data.expectedEndDate);
        setLocation(data.location);
        setEstimatedBudget(data.estimatedBudget);
        setCategory(data.category);
        setStatus(data.status);
        setImages(data.images || []); // This could be image URLs
      } catch (error) {
        console.error("Failed to fetch project details", error);
      }
    };

    if (projectId) fetchProject();
  }, [projectId]);

  const handleImageUpload = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length + images.length > 5) {
      setAlertMessage("You can upload a maximum of 5 images.");
      setShowAlert(true);
      return;
    }

    setImages((prev) => [...prev, ...selectedFiles]);
  };

  const handleImageRemove = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      if (
        !projectTitle ||
        !description ||
        !startDate ||
        !expectedEndDate ||
        !location ||
        !estimatedBudget ||
        !category ||
        !status
      ) {
        throw new Error("All fields are required.");
      }

      setUploading(true);
      const formData = new FormData();
      formData.append("projectTitle", projectTitle);
      formData.append("description", DOMPurify.sanitize(description));
      formData.append("startDate", startDate);
      formData.append("expectedEndDate", expectedEndDate);
      formData.append("location", location);
      formData.append("estimatedBudget", estimatedBudget);
      formData.append("category", category);
      formData.append("status", status);
      images.forEach((img) => {
        if (typeof img !== "string") {
          formData.append("imagesproject", img);
        }
      });

      const response = await fetch(`http://localhost:5000/api/project/update-project/${projectId}`, {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Update failed.");

      setAlertMessage("Project updated successfully!");
      setShowAlert(true);
    } catch (error) {
      setAlertMessage(error.message);
      setShowAlert(true);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg max-w-4xl mx-auto mt-[5.5rem] mb-6">
      <h1 className="text-3xl font-bold mb-6 text-[#225738]">Edit Project</h1>
      {showAlert && <div className="text-red-600 mb-4">{alertMessage}</div>}
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
          placeholder="Project Title"
          className="w-full mb-4 border px-4 py-2 rounded"
        />
        <ReactQuill
          value={description}
          onChange={setDescription}
          className="mb-4 bg-gray-100 rounded-lg"
        />
        <input
          type="file"
          multiple
          onChange={handleImageUpload}
          accept=".jpg,.jpeg,.png"
          className="mb-4"
        />
        <div className="flex flex-wrap gap-2 mb-4">
          {images.map((img, i) => (
            <div key={i} className="relative w-24 h-24">
              <img
                src={typeof img === 'string' ? img : URL.createObjectURL(img)}
                alt=""
                className="w-full h-full object-cover rounded"
              />
              <button onClick={() => handleImageRemove(i)} className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-1">X</button>
            </div>
          ))}
        </div>
        <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="mb-4 w-full border px-4 py-2 rounded" />
        <input type="date" value={expectedEndDate} onChange={(e) => setExpectedEndDate(e.target.value)} className="mb-4 w-full border px-4 py-2 rounded" />
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" className="mb-4 w-full border px-4 py-2 rounded" />
        <input type="number" value={estimatedBudget} onChange={(e) => setEstimatedBudget(e.target.value)} placeholder="Estimated Budget" className="mb-4 w-full border px-4 py-2 rounded" />
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" className="mb-4 w-full border px-4 py-2 rounded" />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="mb-4 w-full border px-4 py-2 rounded">
          <option value="">Select Status</option>
          <option value="Completed">Completed</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Future">Future</option>
        </select>
        <button onClick={handleSubmit} className="bg-green-600 text-white px-6 py-2 rounded-lg" disabled={uploading}>
          {uploading ? "Updating..." : "Update Project"}
        </button>
      </form>
    </div>
  );
};

export default EditProjectSpecific;
