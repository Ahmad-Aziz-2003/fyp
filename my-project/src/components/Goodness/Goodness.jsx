import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Goodness = () => {
  return (
    <div className="p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-6">Goodness Section</h1>
      <p className="mb-4 text-gray-600">
        Manage goodness blogs here. You can create, edit, or delete goodness posts.
      </p>

      {/* Navigation buttons */}
      <div className="space-x-4 mb-6">
        <Link to="/ngo-dashboard/Goodness/create">
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
            Create Goodness
          </button>
        </Link>
        <Link to="/ngo-dashboard/Goodness/edit">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Edit Goodness
          </button>
        </Link>
        <Link to="/ngo-dashboard/Goodness/delete">
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
            Delete Goodness
          </button>
        </Link>
        <Link to="/ngo-dashboard/Goodness/edit/goodnessPost">
        
        </Link>
      </div>

      {/* Outlet for nested routes */}
      <Outlet />
    </div>
  );
};

export default Goodness;
