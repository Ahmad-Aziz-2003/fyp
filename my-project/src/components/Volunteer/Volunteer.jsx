import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Volunteer = () => {
  return (
    <div className="p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-6">Volunteer Section</h1>
      <p className="mb-4 text-gray-600">
        Request Volunteer and Volunteer Info from here
      </p>

      {/* Navigation buttons */}
      <div className="space-x-4 mb-6">
        <Link to="/ngo-dashboard/volunteers/request">
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
           Request Volunteer
          </button>
        </Link>
        <Link to="/ngo-dashboard/volunteers/info">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Volunteer Info
          </button>
        </Link>
      </div>

      {/* Outlet for nested routes */}
      <Outlet />
    </div>
  );
};

export default Volunteer;
