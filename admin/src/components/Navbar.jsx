import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa"; // Importing Notification Icon

const Navbar = () => {
  const [adminData, setAdminData] = useState({
    name: "",
    role: "",
    profilePhoto: "",
  });
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Reference for dropdown

  useEffect(() => {
    const adminId = localStorage.getItem("adminId");

    if (adminId) {
      axios
        .get(`http://localhost:5000/api/admin/info/${adminId}`)
        .then((response) => {
          if (response.data && response.data.adminData) {
            setAdminData({
              name: response.data.adminData.name,
              role: response.data.adminData.role || "Admin",
              profilePhoto: response.data.adminData.profilePhoto || "",
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching admin data:", error);
        });
    }

    // Event listener to close dropdown when clicking outside
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleProfile = () => {
    setShowDropdown(false);
    navigate("/admin-dashboard/profile-update");
  };

  const handleChangePassword = () => {
    setShowDropdown(false);
    navigate("/admin-dashboard/change-password");
  };

  const handleLogout = () => {
    setShowDropdown(false);
    navigate("/admin-dashboard/logout");
  };

  return (
    <nav className="bg-[#225738] text-white fixed w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className="text-3xl font-bold">DAST-E-KHAIR</h1>
        </div>

        {/* Right Section */}
        <div className="relative flex items-center space-x-6">
          {/* Notification Icon */}
          <div className="relative cursor-pointer">
            <FaBell className="text-2xl hover:text-gray-300 transition" />
            <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2">
              3
            </span>
          </div>

          {/* Admin Details */}
          <div className="text-center hidden md:block">
            <h2 className="text-xl font-medium">{adminData.name || "Admin"}</h2>
            <p className="text-sm opacity-80">{adminData.role}</p>
          </div>

          {/* Profile Section with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            {adminData.profilePhoto ? (
              <img
                src={adminData.profilePhoto}
                alt="Profile"
                className="w-12 h-12 rounded-full border-2 border-white cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              />
            ) : (
              <div
                className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-300 text-black font-bold text-xl cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                {adminData.name ? adminData.name[0].toUpperCase() : "A"}
              </div>
            )}

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50">
                <ul>
                  <li
                    className="px-4 py-2 hover:bg-[#225738] cursor-pointer hover:text-white"
                    onClick={handleProfile}
                  >
                    Profile
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-[#225738] cursor-pointer hover:text-white"
                    onClick={handleChangePassword}
                  >
                    Change Password
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-[#225738] cursor-pointer hover:text-white"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
