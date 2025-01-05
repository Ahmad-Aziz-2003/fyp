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
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full sm:w-96 p-6 bg-white shadow-lg rounded-md">
        <h2 className="text-2xl font-bold mb-4">Change Password</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleChangePassword}>
          <div className="mb-4">
            <label
              htmlFor="oldPassword"
              className="block text-gray-700 font-medium mb-2"
            >
              Old Password
            </label>
            <input
              type="password"
              id="oldPassword"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[#1da099]"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-gray-700 font-medium mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[#1da099]"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="repeatNewPassword"
              className="block text-gray-700 font-medium mb-2"
            >
              Repeat New Password
            </label>
            <input
              type="password"
              id="repeatNewPassword"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-[#1da099]"
              value={repeatNewPassword}
              onChange={(e) => setRepeatNewPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#1da099] text-white py-2 px-4 rounded-md hover:bg-[#168d80] focus:outline-none"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
