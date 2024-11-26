// // import React from 'react';
// // import { Link } from 'react-router-dom';

// // const Sidebar = () => {
// //   return (
// //     <div className="bg-teal-800 text-white w-64 min-h-screen flex flex-col justify-between p-4 space-y-4 md:w-56 lg:w-64 shadow-lg">
// //       {/* Upper Section */}
// //       <div className="space-y-4">
// //         <h2 className="text-2xl font-semibold text-white mb-4">Dast-e-Kahir</h2>
// //         <Link to={'/donations'} className="sidebar-item no-underline">
// //           <div className="flex items-center space-x-4 p-3 hover:bg-teal-600 rounded-lg transition-colors duration-300">
// //             <p className="text-lg">Check Donations</p>
// //           </div>
// //         </Link>

// //         <Link to={'/campaigns'} className="sidebar-item no-underline">
// //           <div className="flex items-center space-x-4 p-3 hover:bg-teal-600 rounded-lg transition-colors duration-300">
// //             <p className="text-lg">Campaigns</p>
// //           </div>
// //         </Link>

// //         <Link to={'/blogs'} className="sidebar-item no-underline">
// //           <div className="flex items-center space-x-4 p-3 hover:bg-teal-600 rounded-lg transition-colors duration-300">
// //             <p className="text-lg">Blogs</p>
// //           </div>
// //         </Link>

// //         <Link to={'/volunteers'} className="sidebar-item no-underline">
// //           <div className="flex items-center space-x-4 p-3 hover:bg-teal-600 rounded-lg transition-colors duration-300">
// //             <p className="text-lg">Volunteer Info</p>
// //           </div>
// //         </Link>
// //       </div>

// //       {/* Bottom Section: Sign Out */}
// //       <div className="mt-auto">
// //         <Link to={'/signout'} className="sidebar-item no-underline">
// //           <div className="flex items-center space-x-4 p-3 hover:bg-red-600 rounded-lg transition-colors duration-300">
// //             <p className="text-lg">Sign Out</p>
// //           </div>
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Sidebar;
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaHome, FaBook, FaCheckSquare, FaClipboard, FaFileAlt, FaUniversity, FaMoneyBillWave } from 'react-icons/fa';

// const Sidebar = () => {
//   return (
//     <div className="bg-gray-800 text-white w-64 min-h-screen flex flex-col justify-between p-4 space-y-4 shadow-lg">
//       {/* Upper Section */}
//       <div className="space-y-6">
//         <h2 className="text-2xl font-semibold text-white mb-6">Dashboard</h2>

//         <Link to={'/home'} className="sidebar-item no-underline">
//           <div className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-lg transition-colors duration-300">
//             <FaHome size={20} />
//             <p className="text-lg">Home</p>
//           </div>
//         </Link>

//         <Link to={'/course-registration'} className="sidebar-item no-underline">
//           <div className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-lg transition-colors duration-300">
//             <FaBook size={20} />
//             <p className="text-lg">Course Registration</p>
//           </div>
//         </Link>

//         <Link to={'/attendance'} className="sidebar-item no-underline">
//           <div className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-lg transition-colors duration-300">
//             <FaCheckSquare size={20} />
//             <p className="text-lg">Attendance</p>
//           </div>
//         </Link>

//         <Link to={'/marks'} className="sidebar-item no-underline">
//           <div className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-lg transition-colors duration-300">
//             <FaClipboard size={20} />
//             <p className="text-lg">Marks</p>
//           </div>
//         </Link>

//         <Link to={'/plo-report'} className="sidebar-item no-underline">
//           <div className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-lg transition-colors duration-300">
//             <FaFileAlt size={20} />
//             <p className="text-lg">Marks PLO Report</p>
//           </div>
//         </Link>

//         <Link to={'/transcript'} className="sidebar-item no-underline">
//           <div className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-lg transition-colors duration-300">
//             <FaUniversity size={20} />
//             <p className="text-lg">Transcript</p>
//           </div>
//         </Link>

//         <Link to={'/fee-challan'} className="sidebar-item no-underline">
//           <div className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-lg transition-colors duration-300">
//             <FaMoneyBillWave size={20} />
//             <p className="text-lg">Fee Challan</p>
//           </div>
//         </Link>
//       </div>

//       {/* Bottom Section: Footer */}
//       <div className="mt-auto text-center text-sm text-gray-400">
//         2024 © All rights reserved
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaHome, FaHandsHelping, FaDonate, FaUsers, FaChartBar, FaUserShield, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Hamburger Menu for Small Screens */}
      <div className="md:hidden flex items-center p-4 bg-teal-700 text-white">
        <button onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>
        <h2 className="ml-6 text-xl font-semibold ">Dast-e-Khair</h2>
      </div>

      {/* Sidebar */}
      <div
        // className={`bg-[#1a8e88] text-white w-64 min-h-screen flex flex-col justify-between p-4 shadow-lg 
        //   ${isOpen ? 'block' : 'hidden'} md:block transition-all duration-300`}
        className={`bg-[#1a8e88] text-white w-64 min-h-screen flex flex-col justify-between p-4 shadow-lg 
          ${isOpen ? 'block' : 'hidden'} md:block`}

      >
        {/* Sidebar Content */}
        <div className="space-y-12">
          <h2 className="text-2xl font-semibold text-white mb-6 hidden md:block">Dast-e-Khair</h2>

          <Link to={'/ngo-dashboard'} className="sidebar-item no-underline">
            <div className="flex items-center space-x-3 p-2 hover:bg-[#157f7a] rounded-lg transition-colors duration-300">
              <FaHome size={20} />
              <p className="text-lg">Home</p>
            </div>
          </Link>

          <Link to={'/ngo-dashboard/donations'} className="sidebar-item no-underline">
            <div className="flex items-center space-x-3 p-2 hover:bg-[#157f7a] rounded-lg transition-colors duration-300">
              <FaDonate size={20} />
              <p className="text-lg">Donations</p>
            </div>
          </Link>

          <Link to={'/ngo-dashboard/volunteers'} className="sidebar-item no-underline">
            <div className="flex items-center space-x-3 p-2 hover:bg-[#157f7a] rounded-lg transition-colors duration-300">
              <FaHandsHelping size={20} />
              <p className="text-lg">Volunteers</p>
            </div>
          </Link>

          <Link to={'/ngo-dashboard/campaigns'} className="sidebar-item no-underline">
            <div className="flex items-center space-x-3 p-2 hover:bg-[#157f7a] rounded-lg transition-colors duration-300">
              <FaUserShield size={20} />
              <p className="text-lg">Campaigns</p>
            </div>
          </Link>

          <Link to={'/ngo-dashboard/Goodness'} className="sidebar-item no-underline">
            <div className="flex items-center space-x-3 p-2 hover:bg-[#157f7a] rounded-lg transition-colors duration-300">
              <FaChartBar size={20} />
              <p className="text-lg">Goodness</p>
            </div>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Sidebar;
