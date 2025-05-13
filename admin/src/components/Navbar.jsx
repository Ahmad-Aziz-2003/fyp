

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { database } from "../config/firebaseConfig";
import { ref, onChildAdded, onValue, update } from "firebase/database";
import toast from "react-hot-toast";

const Navbar = () => {
  const [adminData, setAdminData] = useState({
    name: "",
    role: "",
    profilePhoto: "",
  });

  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const notifIconRef = useRef(null);

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

    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        notifIconRef.current &&
        !notifIconRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
        setShowNotifDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    const notifRef = ref(database, "notifications/adminNotifications");

    const now = Date.now();
    const twoDaysAgo = now - 2 * 24 * 60 * 60 * 1000;

    onValue(notifRef, (snapshot) => {
      const data = snapshot.val();
      const notifs = [];

      if (data) {
        Object.entries(data).forEach(([id, notif]) => {
          if (notif.timestamp >= twoDaysAgo) {
            notifs.push({ id, ...notif });
          }
        });

        notifs.sort((a, b) => b.timestamp - a.timestamp);
        setNotifications(notifs);
      }
    });

    onChildAdded(notifRef, (snapshot) => {
      const newNotif = snapshot.val();
      if (newNotif.timestamp >= Date.now() - 5000) {
        toast.success("New NGO Verification Request!");
      }
    });
  
  }, []);

  const handleNotificationClick = (notif, e) => {
    e.stopPropagation(); // prevent dropdown toggle
    localStorage.setItem("ngoID", notif.ngoId);

    // Update isRead to true in Firebase
    const notifRef = ref(database, `notifications/adminNotifications/${notif.id}`);
    update(notifRef, { isRead: true })
      .then(() => console.log("Marked as read"))
      .catch((err) => console.error("Error updating isRead:", err));

    setShowNotifDropdown(false);
    navigate("/admin-dashboard/NgoDetail");
  };

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

  const unreadCount = notifications.filter((notif) => !notif.isRead).length;

  return (
    <nav className="bg-[#225738] text-white fixed w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold">DAST-E-KHAIR</h1>
        </div>

        <div className="relative flex items-center space-x-6">
          <div
            className="relative cursor-pointer"
            ref={notifIconRef}
            onClick={() => setShowNotifDropdown(!showNotifDropdown)}
          >
            <FaBell className="text-2xl hover:text-gray-300 transition" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2">
                {unreadCount}
              </span>
            )}

            {showNotifDropdown && (
              <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white text-black rounded-lg shadow-lg z-50">
                <ul>
                  {notifications.length > 0 ? (
                    notifications.map((notif) => (
                      <li
                        key={notif.id}
                        onClick={(e) => handleNotificationClick(notif, e)}
                        className={`border-b px-4 py-3 hover:bg-gray-100 cursor-pointer ${
                          notif.isRead ? "bg-white" : "bg-gray-100"
                        }`}
                      >
                        <p className={`text-base ${notif.isRead ? "font-normal" : "font-bold"}`}>
                          {notif.ngoName}
                        </p>
                        <p className={`text-sm ${notif.isRead ? "font-normal" : "font-semibold"}`}>
                          {notif.message}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(notif.timestamp).toLocaleString()}
                        </p>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-3 text-sm text-center text-gray-500">
                      No notifications
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          <div className="text-center hidden md:block">
            <h2 className="text-xl font-medium">
              {adminData.name || "Admin"}
            </h2>
            <p className="text-sm opacity-80">{adminData.role}</p>
          </div>

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

