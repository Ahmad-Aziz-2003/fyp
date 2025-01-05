// import React from 'react';

// const Navbar = () => {
//   return (
//     <nav className="bg-[#1da099] text-white">
//       <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
//         <div className="flex items-center">
          
//           <h1 className="text-2xl font-bold">Dast-e-Kahir</h1>
//         </div>
//         <div className="hidden md:flex items-center space-x-6">
//           <h2 className="text-lg font-medium">NGO Dashboard</h2>
//           <img
//             src="https://via.placeholder.com/40" // Replace this with the actual profile picture URL
//             alt="Profile"
//             className="w-12 h-12 rounded-full border-2 border-white"
//           />
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Navbar = () => {
//   const [ngoData, setNgoData] = useState({
//     name: '',
//     profilePhoto: ''
//   });

//   useEffect(() => {
//     // Retrieve NGO ID from local storage
//     const ngoId = localStorage.getItem('ngoId');
    
//     if (ngoId) {
//       // Fetch NGO data from the API
//       axios
//         .get(`http://localhost:5000/api/ngos/ngoinfo/${ngoId}`)
//         .then((response) => {
//           if (response.data && response.data.ngoData) {
//             setNgoData({
//               name: response.data.ngoData.name,
//               profilePhoto: response.data.ngoData.profilePhoto
//             });
//           }
//         })
//         .catch((error) => {
//           console.error('Error fetching NGO data:', error);
//         });
//     }
//   }, []);

//   return (
//     <nav className="bg-[#1da099] text-white fixed w-full">
//       <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
//         <div className="flex items-center">
//           <h1 className="text-2xl font-bold">Dast-e-Kahir</h1>
//         </div>
//         <div className="hidden md:flex items-center space-x-6">
//           {/* Display NGO name and profile picture */}
//           <h2 className="text-lg font-medium">{ngoData.name}</h2>
//           <img
//             src={ngoData.profilePhoto || 'https://via.placeholder.com/40'} // Fallback URL for profile photo
//             alt="Profile"
//             className="w-12 h-12 rounded-full border-2 border-white"
//           />
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importing useNavigate from react-router-dom

const Navbar = () => {
  const [ngoData, setNgoData] = useState({
    name: "",
    profilePhoto: "",
  });
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    // Retrieve NGO ID from local storage
    const ngoId = localStorage.getItem("ngoId");

    if (ngoId) {
      // Fetch NGO data from the API
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
  }, []);

  const handleProfile = () => {
    navigate("/ngo-dashboard/profile-update");
  };

  const handleChangePassword = () => {
    navigate("/ngo-dashboard/change-password"); // This will navigate to the ChangePassword page
  };

  const handleLogout = () => {
    navigate("/ngo-dashboard/logout");
  };

  return (
    <nav className="bg-[#1da099] text-white fixed w-full z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Dast-e-Khair</h1>
        </div>
        <div className="relative hidden md:flex items-center space-x-6">
          {/* Display NGO name and profile picture */}
          <h2 className="text-lg font-medium">{ngoData.name}</h2>
          <div className="relative">
            <img
              src={ngoData.profilePhoto || "https://via.placeholder.com/40"} // Fallback URL for profile photo
              alt="Profile"
              className="w-12 h-12 rounded-full border-2 border-white cursor-pointer"
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {/* Dropdown menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50">
                {" "}
                {/* Added z-50 */}
                <ul>
                  <li
                    className="px-4 py-2 hover:bg-[#1a8e88] hover:text-white cursor-pointer"
                    onClick={handleProfile}
                  >
                    Profile
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-[#1a8e88] hover:text-white cursor-pointer"
                    onClick={handleChangePassword} // Navigate to change password page
                  >
                    Change Password
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-[#1a8e88] hover:text-white cursor-pointer"
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
