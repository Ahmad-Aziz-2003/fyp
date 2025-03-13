import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfileCompletionForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    registrationNumber: "",
    email: "",
    password: "",
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
  const [alertMessage, setAlertMessage] = useState(""); // To track the alert message
  const [showAlert, setShowAlert] = useState(false); // To control alert visibility
  const [loading, setLoading] = useState(false);

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

  const validateForm = () => {
    const newErrors = {};
    const numberRegex = /^[0-9]+$/;
    const alphabetRegex = /^[a-zA-Z ]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9]{7,15}$/;

    if (!formData.name) newErrors.name = "Name is required.";
    if (!numberRegex.test(formData.registrationNumber))
      newErrors.registrationNumber =
        "Registration number must contain only numbers.";
    if (!emailRegex.test(formData.email))
      newErrors.email = "Please enter a valid email address.";
    if (!formData.foundedDate)
      newErrors.foundedDate = "Founded date is required.";
    if (!alphabetRegex.test(formData.address.city))
      newErrors.city = "City must contain only letters.";
    if (!alphabetRegex.test(formData.address.state))
      newErrors.state = "State must contain only letters.";
    if (!alphabetRegex.test(formData.address.country))
      newErrors.country = "Country must contain only letters.";
    if (!numberRegex.test(formData.address.zipCode))
      newErrors.zipCode = "Zip Code must contain only numbers.";
    if (!phoneRegex.test(formData.contact.phone))
      newErrors.phone = "Please enter a valid phone number.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
        setFormData({ ...formData, [name]: value });
      }
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    if (!validateForm()) {
      setAlertMessage("Please Fix the Errors before Submitting.");
      setLoading(false);
      setShowAlert(true);
      return;
    }
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
      if (!ngoId) {
        setAlertMessage("NGO ID not found. Please try again.");
        setLoading(false);
        setShowAlert(true);
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/ngos/completeProfile/${ngoId}`,
        {
          method: "POST",
          body: formDataPayload,
        }
      );
      if (response.ok) {
        setAlertMessage("Profile Completed Successfully!");
        setShowAlert(true);
      } else {
        const errorData = await response.json();
        setAlertMessage(`All Fields are Required. ${errorData.error}`);
        setLoading(false);
        setShowAlert(true);
      }
    } catch (error) {
      setAlertMessage(
        "An error occurred while submitting the form. Please try again."
      );
      setLoading(false);
      setShowAlert(true);
    }
  };

  useEffect(() => {
    if (!showAlert && alertMessage === "Profile Completed Successfully!") {
      setLoading(false);
      console.log("Navigating to /ngo-dashboard");
      navigate("/ngo-dashboard");
    }
  }, [showAlert, alertMessage, navigate]);

  return (
    <div className="min-h-screen bg-green-50 flex justify-center items-center">
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
        className="w-full max-w-3xl bg-white shadow-md rounded px-8 py-6 mt-14 mb-10"
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl text-center font-bold mb-6 text-[#225738]">
          NGO Profile Completion
        </h2>

        {/* Basic Information */}
        <h3 className="text-lg font-bold mb-4 text-[#225738]">
          Basic Information
        </h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="NGO Name"
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-600"
            //onChange={handleChange}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            placeholder="Registration Number"
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-600"
            //onChange={handleChange}
          />
          {errors.registrationNumber && (
            <p className="text-red-500 text-sm">{errors.registrationNumber}</p>
          )}

          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="NGO Email"
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-600"
            //onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}

          <input
            type="date"
            name="foundedDate"
            value={formData.foundedDate}
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-600"
            //onChange={handleChange}
          />
          {errors.foundedDate && (
            <p className="text-red-500 text-sm">{errors.foundedDate}</p>
          )}
        </div>
        {/* Founders */}
        <label className="block mb-2 font-bold text-[#225738]">Founders</label>
        <input
          type="text"
          name="founder"
          placeholder=" Founder (if more than oner seperated by commas)"
          className="border p-2 rounded w-full mb-6 focus:outline-none focus:ring-2 focus:ring-green-600"
          onChange={handleChange}
        />
        {/* Profile Photo */}
        <div className="mb-6">
          <label className="block text-[#225738] font-bold mb-2">
            Profile Photo (PNG, JPEG, JPG only)
          </label>
          <input
            type="file"
            name="profilePhoto"
            accept=".png, .jpeg, .jpg"
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-600"
            onChange={handleChange}
          />
        </div>

        {/* Public Message */}
        <div className="mb-2">
          <label className="block mb-2 font-bold text-[#225738]">
            Public Message
          </label>
          <input
            type="text"
            name="publicMessage"
            placeholder="Public Message"
            className="border p-2 rounded w-full mb-6 focus:outline-none focus:ring-2 focus:ring-green-600"
            onChange={handleChange}
          />
        </div>

        {/* Description */}
        <div className="mb-2">
          <label className="block mb-2 font-bold text-[#225738]">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Description"
            className="border p-2 rounded w-full mb-6 focus:outline-none focus:ring-2 focus:ring-green-600"
            rows="3"
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Type Selection */}
        <h3 className="text-lg font-bold mb-4 text-[#225738]">NGO Type</h3>
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
        <h3 className="text-lg font-bold mb-4 text-[#225738]">Categories</h3>
        <textarea
          name="categories"
          placeholder="Enter categories separated by commas"
          className="border p-2 rounded w-full mb-6 focus:outline-none focus:ring-2 focus:ring-green-600"
          rows="3"
          onChange={handleChange}
        ></textarea>

        {/* Address Information */}
        <h3 className="text-lg font-bold mb-4 text-[#225738]">
          Address Information
        </h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            name="address.city"
            placeholder="City"
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-600"
            onChange={handleChange}
          />
          {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          <input
            type="text"
            name="address.state"
            placeholder="State"
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-600"
            onChange={handleChange}
          />
          {errors.state && (
            <p className="text-red-500 text-sm">{errors.state}</p>
          )}
          <input
            type="text"
            name="address.country"
            placeholder="Country"
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-600"
            onChange={handleChange}
          />
          {errors.country && (
            <p className="text-red-500 text-sm">{errors.country}</p>
          )}
          <input
            type="text"
            name="address.zipCode"
            placeholder="Zip Code"
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-600"
            onChange={handleChange}
          />
          {errors.zipCode && (
            <p className="text-red-500 text-sm">{errors.zipCode}</p>
          )}
          <input
            type="text"
            name="officeLocation"
            placeholder="Office Location"
            className="border p-2 rounded w-full mb-6 focus:outline-none focus:ring-2 focus:ring-green-600"
            onChange={handleChange}
          />
        </div>

        {/* Contact Information */}
        <h3 className="text-lg font-bold mb-4 text-[#225738]">
          Contact Information
        </h3>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <input
            type="text"
            name="contact.phone"
            placeholder="Phone Number"
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-600"
            onChange={handleChange}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
          <input
            type="email"
            name="contact.email"
            placeholder="Contact Email"
            className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-600"
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-[#225738] text-white font-bold py-2 px-4 rounded hover:bg-green-700 "
          disabled={loading}
        >
          {loading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  );
}

export default ProfileCompletionForm;
