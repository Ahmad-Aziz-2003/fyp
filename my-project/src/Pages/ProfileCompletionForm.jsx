import { useEffect, useState } from "react";

function ProfileCompletionForm() {
  // Initialize state with default values
  const [formData, setFormData] = useState({
    name: "",
    registrationNumber: "",
    email: "",
    password: "",
    foundedDate: "",
    publicMessage: "",
    description: "",
    type: "monetary",
    founder:[],
    address: {
      city: "",
      state: "",
      country: "",
      zipCode: "",
      officeLocation:"",
    },
    contact: {
      phone: "",
      email: "",
    },
    categories: "",
    profilePhoto: null, // Profile photo field
  });

  // Load data from local storage on component mount
  useEffect(() => {
    const localData = JSON.parse(localStorage.getItem("ngoData"));
    if (localData) {
      setFormData((prev) => ({
        ...prev,
        name: localData.name || "",
        registrationNumber: localData.registrationNumber || "",
        email: localData.email || "",
        foundedDate: localData.foundedDate || "",
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "categories") {
      setFormData((prev) => ({
        ...prev,
        categories: JSON.stringify(value.split(",").map((cat) => cat.trim())), // Convert to JSON array
      }));
    } else    if (name === "founder") {
      setFormData((prev) => ({
        ...prev,
        founder: JSON.stringify(value.split(",").map((cat) => cat.trim())), // Convert to JSON array
      }));
    } else if (name === "profilePhoto") {
      setFormData((prev) => ({
        ...prev,
        profilePhoto: files[0],
      }));
    } else {
      const keys = name.split(".");
      if (keys.length > 1) {
        setFormData((prev) => ({
          ...prev,
          [keys[0]]: {
            ...prev[keys[0]],
            [keys[1]]: value,
          },
        }));
      } else {
        setFormData({ ...formData, [name]: value });
      }
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const formDataPayload = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "profilePhoto") {
          formDataPayload.append(key, formData.profilePhoto);
        } else if (typeof formData[key] === "object") {
          formDataPayload.append(key, JSON.stringify(formData[key])); // Stringify nested objects
        } else {
          formDataPayload.append(key, formData[key]);
        }
      });
  
      const ngoId = localStorage.getItem("ngoId");
      if (!ngoId) {
        alert("NGO ID not found. Please try again.");
        return;
      }
  
      const response = await fetch(`http://localhost:5000/api/ngos/completeProfile/${ngoId}`, {
        method: "POST",
        body: formDataPayload,
      });
  
      if (response.ok) {
        const data = await response.json();
        alert("Profile completed successfully!");
        console.log(data);
      } else {
        const errorData = await response.json();
        alert(`Failed to complete profile: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  
  
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <form
        className="w-full max-w-3xl bg-white shadow-md rounded px-8 py-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-700">NGO Profile Completion</h2>

        {/* Basic Information */}
        <h3 className="text-lg font-semibold mb-4 text-gray-600">Basic Information</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="NGO Name"
            className="border p-2 rounded w-full"
            onChange={handleChange}
          />
          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            placeholder="Registration Number"
            className="border p-2 rounded w-full"
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="NGO Email"
            className="border p-2 rounded w-full"
            onChange={handleChange}
          />
          <input
            type="date"
            name="foundedDate"
            value={formData.foundedDate}
            className="border p-2 rounded w-full"
            onChange={handleChange}
          />
        </div>
            {/* Founders */}
          <input
          type="text"
          name="founder"
          placeholder=" Founder (if more than oner seperated by commas)"
          className="border p-2 rounded w-full mb-6"
          onChange={handleChange}
           />
        {/* Profile Photo */}
        <div className="mb-6">
          <label className="block text-gray-600 font-semibold mb-2">
            Profile Photo (PNG, JPEG, JPG only)
          </label>
          <input
            type="file"
            name="profilePhoto"
            accept=".png, .jpeg, .jpg"
            className="border p-2 rounded w-full"
            onChange={handleChange}
          />
        </div>

        

        {/* Public Message */}
        <input
          type="text"
          name="publicMessage"
          placeholder="Public Message"
          className="border p-2 rounded w-full mb-6"
          onChange={handleChange}
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          className="border p-2 rounded w-full mb-6"
          rows="3"
          onChange={handleChange}
        ></textarea>

        {/* Type Selection */}
        <h3 className="text-lg font-semibold mb-4 text-gray-600">NGO Type</h3>
        <div className="mb-6">
          <label className="mr-4">
            <input
              type="radio"
              name="type"
              value="monetary"
              checked={formData.type === "monetary"}
              onChange={handleChange}
            />{" "}
            Monetary
          </label>
          <label className="mr-4">
            <input
              type="radio"
              name="type"
              value="itemBased"
              checked={formData.type === "itemBased"}
              onChange={handleChange}
            />{" "}
            Item-Based
          </label>
          <label>
            <input
              type="radio"
              name="type"
              value="both"
              checked={formData.type === "both"}
              onChange={handleChange}
            />{" "}
            Both
          </label>
        </div>

        {/* Categories */}
        <h3 className="text-lg font-semibold mb-4 text-gray-600">Categories</h3>
        <textarea
          name="categories"
          placeholder="Enter categories separated by commas"
          className="border p-2 rounded w-full mb-6"
          rows="3"
          onChange={handleChange}
        ></textarea>

        {/* Address Information */}
        <h3 className="text-lg font-semibold mb-4 text-gray-600">Address Information</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            name="address.city"
            placeholder="City"
            className="border p-2 rounded w-full"
            onChange={handleChange}
          />
          <input
            type="text"
            name="address.state"
            placeholder="State"
            className="border p-2 rounded w-full"
            onChange={handleChange}
          />
          <input
            type="text"
            name="address.country"
            placeholder="Country"
            className="border p-2 rounded w-full"
            onChange={handleChange}
          />
          <input
            type="text"
            name="address.zipCode"
            placeholder="Zip Code"
            className="border p-2 rounded w-full"
            onChange={handleChange}
          />
           <input
          type="text"
          name="officeLocation"
          placeholder="Office Location"
          className="border p-2 rounded w-full mb-6"
          onChange={handleChange}
        />
        </div>

        {/* Contact Information */}
        <h3 className="text-lg font-semibold mb-4 text-gray-600">Contact Information</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            name="contact.phone"
            placeholder="Phone Number"
            className="border p-2 rounded w-full"
            onChange={handleChange}
          />
          <input
            type="email"
            name="contact.email"
            placeholder="Contact Email"
            className="border p-2 rounded w-full"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="bg-[#1a8e88] text-white font-bold py-2 px-4 rounded hover:bg-[#157f7a] "
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default ProfileCompletionForm;





  // // Handle form field changes
  // const handleChange = (e) => {
  //   const { name, value, files } = e.target;
  //   if (name === "profilePhoto") {
  //     setFormData((prev) => ({
  //       ...prev,
  //       profilePhoto: files[0], // Handle file upload
  //     }));
  //   } else {
  //     const keys = name.split(".");
  //     if (keys.length > 1) {
  //       setFormData((prev) => ({
  //         ...prev,
  //         [keys[0]]: {
  //           ...prev[keys[0]],
  //           [keys[1]]: value,
  //         },
  //       }));
  //     } else {
  //       setFormData({ ...formData, [name]: value });
  //     }
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formDataToSend = { ...formData }; // Clone formData for processing
  //   if (formData.profilePhoto) {
  //     console.log(`Uploaded File: ${formData.profilePhoto.name}`);
  //   }

  //   try {
  //     const formDataPayload = new FormData();
  //     Object.keys(formDataToSend).forEach((key) => {
  //       if (key === "profilePhoto") {
  //         formDataPayload.append(key, formData.profilePhoto);
  //       } else {
  //         formDataPayload.append(key, JSON.stringify(formDataToSend[key]));
  //       }
  //     });

  //     // Retrieve the NGO ID dynamically from local storage
  //     const ngoId = localStorage.getItem("ngoId");
  //     if (!ngoId) {
  //       alert("NGO ID not found. Please try again.");
  //       return;
  //     }

  //     const response = await fetch(`http://localhost:5000/api/ngos/completeProfile/${ngoId}`, {
  //       method: "POST",
  //       body: formDataPayload,
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       alert("Profile completed successfully!");
  //       console.log(data);
  //     } else {
  //       alert("Failed to complete profile. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //   }
  // };
