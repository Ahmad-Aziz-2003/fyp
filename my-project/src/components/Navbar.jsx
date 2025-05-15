// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Navbar = () => {
//   const [ngoData, setNgoData] = useState({
//     name: "",
//     profilePhoto: "",
//   });
//   const [showDropdown, setShowDropdown] = useState(false);

//   const navigate = useNavigate();
//   const dropdownRef = useRef(null); // Reference for dropdown

//   useEffect(() => {
//     const ngoId = localStorage.getItem("ngoId");

//     if (ngoId) {
//       axios
//         .get(`http://localhost:5000/api/ngos/ngoinfo/${ngoId}`)
//         .then((response) => {
//           if (response.data && response.data.ngoData) {
//             setNgoData({
//               name: response.data.ngoData.name,
//               profilePhoto: response.data.ngoData.profilePhoto,
//             });
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching NGO data:", error);
//         });
//     }

//     // Event listener to close dropdown when clicking outside
//     const handleOutsideClick = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setShowDropdown(false);
//       }
//     };

//     document.addEventListener("mousedown", handleOutsideClick);

//     return () => {
//       document.removeEventListener("mousedown", handleOutsideClick);
//     };
//   }, []);

//   const handleProfile = () => {
//     setShowDropdown(false);
//     navigate("/ngo-dashboard/profile-update");
//   };

//   const handleChangePassword = () => {
//     setShowDropdown(false);
//     navigate("/ngo-dashboard/change-password");
//   };

//   const handleLogout = () => {
//     setShowDropdown(false);
//     navigate("/ngo-dashboard/logout");
//   };
//   // bg-[#1da099]
//   return (
//     <nav className="bg-[#225738] text-white fixed w-full z-50">
//       <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
//         <div className="flex items-center">
//           <h1 className="text-3xl font-bold">DAST-E-KHAIR</h1>
//         </div>
//         <div className="relative hidden md:flex items-center space-x-6">
//           <h2 className="text-3xl font-medium">{ngoData.name}</h2>
//           <div className="relative" ref={dropdownRef}>
//             <img
//               src={ngoData.profilePhoto || "https://via.placeholder.com/40"}
//               alt="Profile"
//               className="w-12 h-12 rounded-full border-2 border-white cursor-pointer"
//               onClick={() => setShowDropdown(!showDropdown)}
//             />
//             {showDropdown && (
//               <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50">
//                 <ul>
//                   <li
//                     className="px-4 py-2 hover:bg-[#225738] cursor-pointer hover:text-white"
//                     onClick={handleProfile}
//                   >
//                     Profile
//                   </li>
//                   <li
//                     className="px-4 py-2 hover:bg-[#225738] cursor-pointer hover:text-white"
//                     onClick={handleChangePassword}
//                   >
//                     Change Password
//                   </li>
//                   <li
//                     className="px-4 py-2 hover:bg-[#225738] cursor-pointer hover:text-white"
//                     onClick={handleLogout}
//                   >
//                     Logout
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { FaBell } from "react-icons/fa";
// import { database } from "../config/firebaseConfig";
// import { ref, onChildAdded, onValue, update } from "firebase/database";
// import toast from "react-hot-toast";

// const Navbar = () => {
//   const [ngoData, setNgoData] = useState({
//     name: "",
//     profilePhoto: "",
//   });
//   const [notifications, setNotifications] = useState([]);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showNotifDropdown, setShowNotifDropdown] = useState(false);

//   const navigate = useNavigate();
//   const dropdownRef = useRef(null);
//   const notifIconRef = useRef(null);

//   useEffect(() => {
//     const ngoId = localStorage.getItem("ngoId");

//     if (ngoId) {
//       axios
//         .get(`http://localhost:5000/api/ngos/ngoinfo/${ngoId}`)
//         .then((response) => {
//           if (response.data && response.data.ngoData) {
//             setNgoData({
//               name: response.data.ngoData.name,
//               profilePhoto: response.data.ngoData.profilePhoto,
//             });
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching NGO data:", error);
//         });

//       // Firebase notifications for this NGO
//       const notifRef = ref(database, "notifications/ngoNotifications");

//       onValue(notifRef, (snapshot) => {
//         const data = snapshot.val();
//         const allNotifs = [];

//         if (data) {
//           Object.entries(data).forEach(([id, notif]) => {
//             if (notif.ngoId === ngoId) {
//               allNotifs.push({ id, ...notif });
//             }
//           });

//           allNotifs.sort((a, b) => b.timestamp - a.timestamp);
//           setNotifications(allNotifs);
//         }
//       });

//       // Show toast on new notification
//       onChildAdded(notifRef, (snapshot) => {
//         const newNotif = snapshot.val();
//         if (newNotif.ngoId === ngoId && newNotif.timestamp >= Date.now() - 5000) {
//           toast.success(`New notification: ${newNotif.message}`);
//         }
//       });
//     }

//     const handleOutsideClick = (event) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target) &&
//         notifIconRef.current &&
//         !notifIconRef.current.contains(event.target)
//       ) {
//         setShowDropdown(false);
//         setShowNotifDropdown(false);
//       }
//     };

//     document.addEventListener("mousedown", handleOutsideClick);
//     return () => document.removeEventListener("mousedown", handleOutsideClick);
//   }, []);

//   const handleNotificationClick = (notif, e) => {
//     e.stopPropagation();
//     const notifRef = ref(database, `notifications/ngoNotifications/${notif.id}`);
//     update(notifRef, { isRead: true })
//       .then(() => console.log("Marked as read"))
//       .catch((err) => console.error("Error updating isRead:", err));

//     setShowNotifDropdown(false);
//     // Optional: You can navigate to a detail page
//   };

//   const handleProfile = () => {
//     setShowDropdown(false);
//     navigate("/ngo-dashboard/profile-update");
//   };

//   const handleChangePassword = () => {
//     setShowDropdown(false);
//     navigate("/ngo-dashboard/change-password");
//   };

//   const handleLogout = () => {
//     setShowDropdown(false);
//     navigate("/ngo-dashboard/logout");
//   };

//   const unreadCount = notifications.filter((notif) => !notif.isRead).length;

//   return (
//     <nav className="bg-[#225738] text-white fixed w-full z-50">
//       <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
//         <div className="flex items-center">
//           <h1 className="text-3xl font-bold">DAST-E-KHAIR</h1>
//         </div>

//         <div className="relative flex items-center space-x-6">
//           {/* Notification Bell */}
//           <div
//             className="relative cursor-pointer"
//             ref={notifIconRef}
//             onClick={() => setShowNotifDropdown(!showNotifDropdown)}
//           >
//             <FaBell className="text-2xl hover:text-gray-300 transition" />
//             {unreadCount > 0 && (
//               <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2">
//                 {unreadCount}
//               </span>
//             )}

//             {showNotifDropdown && (
//               <div className="absolute right-0 mt-2 w-80 max-h-96 overflow-y-auto bg-white text-black rounded-lg shadow-lg z-50">
//                 <ul>
//                   {notifications.length > 0 ? (
//                     notifications.map((notif) => (
//                       <li
//                         key={notif.id}
//                         onClick={(e) => handleNotificationClick(notif, e)}
//                         className={`border-b px-4 py-3 hover:bg-gray-100 cursor-pointer ${
//                           notif.isRead ? "bg-white" : "bg-gray-100"
//                         }`}
//                       >
//                         <p className={`text-sm ${notif.isRead ? "font-normal" : "font-semibold"}`}>
//                           {notif.message}
//                         </p>
//                         <p className="text-xs text-gray-500">{notif.formattedDateTime}</p>
//                       </li>
//                     ))
//                   ) : (
//                     <li className="px-4 py-3 text-gray-500">No notifications</li>
//                   )}
//                 </ul>
//               </div>
//             )}
//           </div>

//           {/* NGO Name + Profile Photo */}
//           <h2 className="text-3xl font-medium">{ngoData.name}</h2>
//           <div className="relative" ref={dropdownRef}>
//             <img
//               src={ngoData.profilePhoto || "https://via.placeholder.com/40"}
//               alt="Profile"
//               className="w-12 h-12 rounded-full border-2 border-white cursor-pointer"
//               onClick={() => setShowDropdown(!showDropdown)}
//             />
//             {showDropdown && (
//               <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50">
//                 <ul>
//                   <li
//                     className="px-4 py-2 hover:bg-[#225738] cursor-pointer hover:text-white"
//                     onClick={handleProfile}
//                   >
//                     Profile
//                   </li>
//                   <li
//                     className="px-4 py-2 hover:bg-[#225738] cursor-pointer hover:text-white"
//                     onClick={handleChangePassword}
//                   >
//                     Change Password
//                   </li>
//                   <li
//                     className="px-4 py-2 hover:bg-[#225738] cursor-pointer hover:text-white"
//                     onClick={handleLogout}
//                   >
//                     Logout
//                   </li>
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import { database } from "../config/firebaseConfig";
import { ref, onChildAdded, onValue, update } from "firebase/database";
import toast from "react-hot-toast";

const Navbar = () => {
  const [ngoData, setNgoData] = useState({
    name: "",
    profilePhoto: "",
  });
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const notifIconRef = useRef(null);

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

      const notifRef = ref(database, "notifications/ngoNotifications");

      onValue(notifRef, (snapshot) => {
        const data = snapshot.val();
        const allNotifs = [];

        if (data) {
          Object.entries(data).forEach(([id, notif]) => {
            if (notif.ngoId === ngoId) {
              allNotifs.push({ id, ...notif });
            }
          });

          allNotifs.sort((a, b) => b.timestamp - a.timestamp);
          setNotifications(allNotifs);
        }
      });

      onChildAdded(notifRef, (snapshot) => {
        const newNotif = snapshot.val();
        if (newNotif.ngoId === ngoId && newNotif.timestamp >= Date.now() - 5000) {
          toast.success(`New notification: ${newNotif.message}`);
        }
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

  const handleNotificationClick = (notif, e) => {
    e.stopPropagation();
    const notifRef = ref(database, `notifications/ngoNotifications/${notif.id}`);
    update(notifRef, { isRead: true })
      .then(() => console.log("Marked as read"))
      .catch((err) => console.error("Error updating isRead:", err));

    setShowNotifDropdown(false);
  };

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

  const unreadCount = notifications.filter((notif) => !notif.isRead).length;

  return (
    <nav className="bg-[#225738] text-white fixed w-full z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between py-4 px-4 lg:px-8">
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl sm:text-3xl font-bold">DAST-E-KHAIR</h1>
        </div>

        <div className="relative flex items-center space-x-4 sm:space-x-6">
          {/* Notification Bell */}
          <div
            className="relative cursor-pointer"
            ref={notifIconRef}
            onClick={() => setShowNotifDropdown(!showNotifDropdown)}
          >
            <FaBell className="text-xl sm:text-2xl hover:text-gray-300 transition" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-1.5">
                {unreadCount}
              </span>
            )}

            {showNotifDropdown && (
              <div className="absolute right-0 mt-2 w-72 sm:w-80 max-h-96 overflow-y-auto bg-white text-black rounded-lg shadow-lg z-50">
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
                        <p className={`text-sm ${notif.isRead ? "font-normal" : "font-semibold"}`}>
                          {notif.message}
                        </p>
                        <p className="text-xs text-gray-500">{notif.formattedDateTime}</p>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-3 text-gray-500">No notifications</li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* NGO Name (hidden on small screens) */}
          <h2 className="text-lg sm:text-2xl font-medium hidden sm:block">{ngoData.name}</h2>

          {/* Profile Photo + Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <img
              src={ngoData.profilePhoto || "https://via.placeholder.com/40"}
              alt="Profile"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-44 sm:w-48 bg-white text-black rounded-lg shadow-lg z-50">
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
