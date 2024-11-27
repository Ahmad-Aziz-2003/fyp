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

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Navbar = () => {
  const [ngoData, setNgoData] = useState({
    name: '',
    profilePhoto: ''
  });

  useEffect(() => {
    // Retrieve NGO ID from local storage
    const ngoId = localStorage.getItem('ngoId');
    
    if (ngoId) {
      // Fetch NGO data from the API
      axios
        .get(`http://localhost:5000/api/ngos/ngoinfo/${ngoId}`)
        .then((response) => {
          if (response.data && response.data.ngoData) {
            setNgoData({
              name: response.data.ngoData.name,
              profilePhoto: response.data.ngoData.profilePhoto
            });
          }
        })
        .catch((error) => {
          console.error('Error fetching NGO data:', error);
        });
    }
  }, []);

  return (
    <nav className="bg-[#1da099] text-white fixed w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Dast-e-Kahir</h1>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          {/* Display NGO name and profile picture */}
          <h2 className="text-lg font-medium">{ngoData.name}</h2>
          <img
            src={ngoData.profilePhoto || 'https://via.placeholder.com/40'} // Fallback URL for profile photo
            alt="Profile"
            className="w-12 h-12 rounded-full border-2 border-white"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
