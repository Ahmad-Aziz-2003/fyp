import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [ngoData, setNgoData] = useState({
    name: "",
    profilePhoto: "",
  });
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef(null); // Reference for dropdown

  useEffect(() => {
    const ngoId = localStorage.getItem("ngoId");

    if (ngoId) {
      axios
        .get(`http://localhost:5000/api/ngos/ngoinfo/${ngoId}`)
        .then((response) => {
          if (response.data && response.data.ngoData) {
            setNgoData({
              name: response.data.ngoData.name,
              profilePhoto: response.data.ngoData.profilePhoto,
            });
          }
        })
        .catch((error) => {
          console.error("Error fetching NGO data:", error);
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
    navigate("/ngo-dashboard/profile-update");
  };

  const handleChangePassword = () => {
    setShowDropdown(false);
    navigate("/ngo-dashboard/change-password");
  };

  const handleLogout = () => {
    setShowDropdown(false);
    navigate("/ngo-dashboard/logout");
  };
  // bg-[#1da099]
  return (
    <nav className="bg-[#225738] text-white fixed w-full z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold">DAST-E-KHAIR</h1>
        </div>
        <div className="relative hidden md:flex items-center space-x-6">
          <h2 className="text-3xl font-medium">{ngoData.name}</h2>
          <div className="relative" ref={dropdownRef}>
            <img
              src={ngoData.profilePhoto || "https://via.placeholder.com/40"}
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-white cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            />
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
