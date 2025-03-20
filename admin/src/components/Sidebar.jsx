import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaHandsHelping,
  FaDonate,
  FaUsers,
  FaChartBar,
  FaUserShield,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen">
      {/* Hamburger Menu for Small Screens */}
      {/* <div className="md:hidden flex items-center p-4 bg-teal-700 text-white ">
        <button onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>
      </div> */}

      {/* Sidebar */}
      <div
        // className={`bg-[#1a8e88] text-white w-64 min-h-screen flex flex-col justify-between p-4 shadow-lg
        //   ${isOpen ? 'block' : 'hidden'} md:block transition-all duration-300`}
        className='bg-[#225738] text-white w-64 mt-[5rem] fixed h-full min-h-screen flex flex-col justify-between p-4 shadow-lg' 
      >
        {/* Sidebar Content */}
        <div className="space-y-12 mt-4">
          {/* <h2 className="text-2xl font-semibold text-white mb-6 hidden md:block">
            Dast-e-Khair
          </h2> */}

          <Link to={"/admin-dashboard"} className="sidebar-item no-underline">
            <div className="flex items-center space-x-3 p-2 mt-2 hover:bg-green-700 rounded-lg transition-colors duration-300">
              <FaHome size={24} />
              <p className="text-2xl">Home</p>
            </div>
          </Link>

          <Link
            to={"/admin-dashboard/donors-list"}
            className="sidebar-item no-underline"
          >
            <div className="flex items-center space-x-3 p-2 mt-2 hover:bg-green-700 rounded-lg transition-colors duration-300">
              <FaDonate size={24} />
              <p className="text-2xl">Donors</p>
            </div>
          </Link>

          <Link
            to={"/admin-dashboard/ngos-verifications"}
            className="sidebar-item no-underline"
          >
            <div className="flex items-center space-x-3 p-2 mt-2 hover:bg-green-700 rounded-lg transition-colors duration-300">
              <FaHandsHelping size={24} />
              <p className="text-2xl">ngo-verify</p>
            </div>
          </Link>

          <Link
            to={"/admin-dashboard/ngos-list"}
            className="sidebar-item no-underline"
          >
            <div className="flex items-center space-x-3 p-2 mt-2 hover:bg-green-700 rounded-lg transition-colors duration-300">
              <FaHandsHelping size={24} />
              <p className="text-2xl">NGO's</p>
            </div>
          </Link>

          <Link
            to={"/admin-dashboard/donations"}
            className="sidebar-item no-underline"
          >
            <div className="flex items-center space-x-3 p-2 mt-2 hover:bg-green-700 rounded-lg transition-colors duration-300">
              <FaUserShield size={24} />
              <p className="text-2xl">Donations</p>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex-1 ml-64 overflow-y-auto "></div>
    </div>
  );
};

export default Sidebar;
