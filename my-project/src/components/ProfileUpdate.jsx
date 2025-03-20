import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    registrationNumber: "",
    email: "",
    foundedDate: "",
    publicMessage: "",
    description: "",
    type: "monetary",
    founder: [],
    address: {
      city: "",
      state: "",
      country: "",
      zipCode: "",
      officeLocation: "",
    },
    contact: {
      phone: "",
      email: "",
    },
    categories: "",
    profilePhoto: null,
  });
  const [errors, setErrors] = useState({});
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      const ngoId = localStorage.getItem("ngoId");
      if (!ngoId) {
        setAlertMessage("NGO ID not found. Please try again.");
        setShowAlert(true);
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:5000/api/ngos/ngoinfo/${ngoId}`
        );
        if (response.ok) {
          const data = await response.json();
          const parsedAddress = JSON.parse(data.ngoData.address || "{}");
          const parsedContact = JSON.parse(data.ngoData.contact || "{}");
          setFormData({
            ...data.ngoData,
            address: parsedAddress,
            contact: parsedContact,
          });
        } else {
          setAlertMessage(
            "Failed to fetch profile data. Please try again later."
          );
          setShowAlert(true);
        }
      } catch (error) {
        setAlertMessage("An error occurred while fetching profile data.");
        setShowAlert(true);
      }
    };
    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "categories" || name === "founder") {
      setFormData((prev) => ({
        ...prev,
        [name]: JSON.stringify(value.split(",").map((cat) => cat.trim())),
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
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataPayload = new FormData();
      Object.keys(formData).forEach((key) => {
        if (key === "profilePhoto") {
          formDataPayload.append(key, formData.profilePhoto);
        } else if (typeof formData[key] === "object") {
          formDataPayload.append(key, JSON.stringify(formData[key]));
        } else {
          formDataPayload.append(key, formData[key]);
        }
      });

      const ngoId = localStorage.getItem("ngoId");
      const response = await fetch(
        `http://localhost:5000/api/ngos/updateProfi/${ngoId}`,
        {
          method: "PUT",
          body: formDataPayload,
        }
      );

      if (response.ok) {
        setAlertMessage("Profile Updated Successfully!");
        setShowAlert(true);
        navigate("/ngo-dashboard");
      } else {
        const errorData = await response.json();
        setAlertMessage(errorData.error || "Failed to update profile.");
      }
    } catch (error) {
      setAlertMessage("An error occurred while updating the profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex justify-center items-center mt-20 mb-6">
      {/* Alert Modal */}
      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-lg font-semibold">{alertMessage}</p>
            <button
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
              onClick={() => setShowAlert(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}

      <form
        className="w-full max-w-3xl bg-white shadow-md rounded px-8 py-6"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl text-center font-bold mb-12 text-[#225738]">
          Update Profile
        </h2>

        {/* Basic Information */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* <label className="block mb-2 font-bold text-[#225738]">Name</label> */}
          <input
            type="text"
            name="name"
            disabled
            value={formData.name}
            placeholder="NGO Name"
            onChange={handleChange}
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <input
            type="text"
            name="registrationNumber"
            disabled
            value={formData.registrationNumber}
            placeholder="Registration Number"
            onChange={handleChange}
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <input
            type="email"
            name="email"
            disabled
            value={formData.email}
            placeholder="NGO Email"
            onChange={handleChange}
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <input
            type="date"
            name="foundedDate"
            disabled
            value={formData.foundedDate}
            onChange={handleChange}
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        {/* Address */}
        <h3 className="text-lg font-bold mb-4 text-[#225738]">Address</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            name="address.city"
            value={formData.address.city}
            placeholder="City"
            onChange={handleChange}
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <input
            type="text"
            name="address.state"
            value={formData.address.state}
            placeholder="State"
            onChange={handleChange}
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <input
            type="text"
            name="address.country"
            value={formData.address.country}
            placeholder="Country"
            onChange={handleChange}
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <input
            type="text"
            name="address.zipCode"
            value={formData.address.zipCode}
            placeholder="Zip Code"
            onChange={handleChange}
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <input
            type="text"
            name="address.officeLocation"
            value={formData.address.officeLocation}
            placeholder="Office Location"
            onChange={handleChange}
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        {/* Contact */}
        <h3 className="text-lg font-bold mb-4 text-[#225738]">Contact</h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            name="contact.phone"
            value={formData.contact.phone}
            placeholder="Phone"
            onChange={handleChange}
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-600"
          />
          <input
            type="email"
            name="contact.email"
            value={formData.contact.email}
            placeholder="Contact Email"
            onChange={handleChange}
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        {/* Categories */}
        <h3 className="text-lg font-bold mb-4 text-[#225738]">Categories</h3>
        <textarea
          name="categories"
          value={formData.categories}
          placeholder="Enter categories separated by commas"
          onChange={handleChange}
          className="border p-2 rounded w-full mb-6 focus:outline-none focus:ring-2 focus:ring-green-600"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-[#225738] text-white font-bold py-2 px-4 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdate;
