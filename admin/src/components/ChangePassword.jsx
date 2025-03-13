
import React, { useState } from "react";
import axios from "axios";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Retrieve NGO ID from localhost storage or fallback
  const ngoId = localStorage.getItem("ngoId"); // Replace 'defaultNgoId' with a fallback ID if needed

  const handleChangePassword = (e) => {
    e.preventDefault();

    // Clear previous messages
    setError("");
    setSuccess("");

    // Validation checks
    if (!oldPassword || !newPassword || !repeatNewPassword) {
      setError("All fields are required.");
      return;
    }

    if (newPassword !== repeatNewPassword) {
      setError("New password and repeat password do not match.");
      return;
    }

    // Password strength check (example: at least 8 characters, one number, one uppercase letter)
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      setError(
        "Password must be at least 8 characters long, include an uppercase letter and a number."
      );
      return;
    }

    // Make API request to update password
    axios
      .post(`http://localhost:5000/api/ngos/password/${ngoId}`, {
        currentPassword: oldPassword,
        newPassword,
      })
      .then((response) => {
        setSuccess("Password updated successfully.");
        setOldPassword("");
        setNewPassword("");
        setRepeatNewPassword("");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message);
        } else {
          setError("An error occurred while changing the password.");
        }
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full sm:w-96 p-6 bg-white shadow-lg rounded-md">
        <h2 className="text-3xl font-bold mb-6 mt-4 text-[#225738]">
          Change Password
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleChangePassword}>
          <div className="mb-4">
            <label
              htmlFor="oldPassword"
              className="block mb-2 font-bold text-[#225738]"
            >
              Old Password
            </label>
            <input
              type="password"
              id="oldPassword"
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block mb-2 font-bold text-[#225738]"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="repeatNewPassword"
              className="block mb-2 font-bold text-[#225738]"
            >
              Repeat New Password
            </label>
            <input
              type="password"
              id="repeatNewPassword"
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              value={repeatNewPassword}
              onChange={(e) => setRepeatNewPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
