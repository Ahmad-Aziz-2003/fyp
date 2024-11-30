import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Campaigns = () => {
  return (
    <div className="p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-6">Campaigns Section</h1>
      <p className="mb-4 text-gray-600">
        Manage Campaigns here. You can create, edit, or delete goodness Campaigns.
      </p>

      {/* Navigation buttons */}
      <div className="space-x-4 mb-6">
        <Link to="/ngo-dashboard/Campaigns/create">
          <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
            Create Campaigns
          </button>
        </Link>
        <Link to="/ngo-dashboard/Campaigns/edit">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            Edit Campaigns
          </button>
        </Link>
        <Link to="/ngo-dashboard/Campaigns/delete">
          <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
            Delete Campaigns
          </button>
        </Link>
        {/* <Link to="/ngo-dashboard/Goodness/edit/goodnessPost">
        
        </Link> */}
      </div>

      {/* Outlet for nested routes */}
      <Outlet />
    </div>
  );
};

export default Campaigns;


