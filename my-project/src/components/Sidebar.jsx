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

          <Link to={"/ngo-dashboard"} className="sidebar-item no-underline">
            <div className="flex items-center space-x-3 p-2 mt-2 hover:bg-green-700 rounded-lg transition-colors duration-300">
              <FaHome size={24} />
              <p className="text-2xl">Home</p>
            </div>
          </Link>

          <Link
            to={"/ngo-dashboard/donations"}
            className="sidebar-item no-underline"
          >
            <div className="flex items-center space-x-3 p-2 mt-2 hover:bg-green-700 rounded-lg transition-colors duration-300">
              <FaDonate size={24} />
              <p className="text-2xl">Donations</p>
            </div>
          </Link>

          <Link
            to={"/ngo-dashboard/volunteers"}
            className="sidebar-item no-underline"
          >
            <div className="flex items-center space-x-3 p-2 mt-2 hover:bg-green-700 rounded-lg transition-colors duration-300">
              <FaHandsHelping size={24} />
              <p className="text-2xl">Volunteers</p>
            </div>
          </Link>

          <Link
            to={"/ngo-dashboard/campaigns"}
            className="sidebar-item no-underline"
          >
            <div className="flex items-center space-x-3 p-2 mt-2 hover:bg-green-700 rounded-lg transition-colors duration-300">
              <FaUserShield size={24} />
              <p className="text-2xl">Campaigns</p>
            </div>
          </Link>

          <Link
            to={"/ngo-dashboard/Goodness"}
            className="sidebar-item no-underline"
          >
            <div className="flex items-center space-x-3 p-2 mt-2 hover:bg-green-700 rounded-lg transition-colors duration-300">
              <FaChartBar size={24} />
              <p className="text-2xl">Goodness</p>
            </div>
          </Link>

          <Link
            to={"/ngo-dashboard/projects"}
            className="sidebar-item no-underline"
          >
            <div className="flex items-center space-x-3 p-2 mt-2 hover:bg-green-700 rounded-lg transition-colors duration-300">
              <FaHandsHelping size={24} />
              <p className="text-2xl">Projects</p>
            </div>
          </Link>

           <Link
            to={"/ngo-dashboard/stats"}
            className="sidebar-item no-underline"
          >
            <div className="flex items-center space-x-3 p-2 mt-2 hover:bg-green-700 rounded-lg transition-colors duration-300">
              <FaHandsHelping size={24} />
              <p className="text-2xl">Stats</p>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex-1 ml-64 overflow-y-auto "></div>
    </div>
  );
};

export default Sidebar;
