
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaEye, FaBan } from "react-icons/fa";

// const DonorsList = () => {
//   const [users, setUsers] = useState([]);
//   const [filteredUsers, setFilteredUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("all"); // Default: Show all users

//   useEffect(() => {
//     axios
//       .get("http://localhost:5000/api/admin/users")
//       .then((response) => {
//         setUsers(response.data.users);
//         setFilteredUsers(response.data.users);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching users:", error);
//         setLoading(false);
//       });
//   }, []);

//   // Function to handle filter change
//   const handleFilterChange = (event) => {
//     const selectedFilter = event.target.value;
//     setFilter(selectedFilter);

//     if (selectedFilter === "all") {
//       setFilteredUsers(users);
//     } else {
//       const isActive = selectedFilter === "active";
//       setFilteredUsers(users.filter((user) => user.isActive === isActive));
//     }
//   };

//   if (loading) {
//     return <div className="text-center mt-10 text-lg font-semibold">Loading users...</div>;
//   }

//   return (
//     <div className="min-h-screen py-10 px-6 mt-20">
//       <h2 className="text-2xl font-bold mb-4">Donors List</h2>

//       {/* Filter Dropdown */}
//       <div className="mb-4">
//         <label className="mr-2 font-semibold">Filter:</label>
//         <select
//           className="px-3 py-2 border rounded-md"
//           value={filter}
//           onChange={handleFilterChange}
//         >
//           <option value="all">All Users</option>
//           <option value="active">Active Users</option>
//           <option value="inactive">Inactive Users</option>
//         </select>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//           <thead>
//             <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
//               <th className="py-3 px-6 text-left">Image</th>
//               <th className="py-3 px-6 text-left">Name</th>
//               <th className="py-3 px-6 text-left">Email</th>
//               <th className="py-3 px-6 text-left">Phone</th>
//               <th className="py-3 px-6 text-left">Status</th>
//               <th className="py-3 px-6 text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-600 text-sm font-light">
//             {filteredUsers.map((user) => (
//               <tr key={user.userId} className="border-b border-gray-200 hover:bg-gray-100">
//                 <td className="py-3 px-6">
//                   <img
//                     src={user.photoUrl || "/default-user.png"}
//                     alt="Profile"
//                     className="w-10 h-10 rounded-full object-cover border"
//                   />
//                 </td>
//                 <td className="py-3 px-6">{user.name}</td>
//                 <td className="py-3 px-6">{user.email}</td>
//                 <td className="py-3 px-6">{user.phone}</td>
//                 <td className="py-3 px-6">
//                   <span
//                     className={`px-2 py-1 text-xs rounded-full ${
//                       user.isActive ? "bg-green-200 text-green-600" : "bg-red-200 text-red-600"
//                     }`}
//                   >
//                     {user.isActive ? "Active" : "Inactive"}
//                   </span>
//                 </td>
//                 <td className="py-3 px-6 text-center flex gap-3 justify-center">
//                   <FaEye className="text-blue-600 cursor-pointer" title="View Profile" />
//                   <FaBan className="text-red-600 cursor-pointer" title="Block User" />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default DonorsList;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEye, FaBan, FaCheckCircle } from "react-icons/fa";

const DonorsList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all"); // Default: Show all users

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch users from API
  const fetchUsers = () => {
    setLoading(true);
    axios
      .get("http://localhost:5000/api/admin/users")
      .then((response) => {
        setUsers(response.data.users);
        setFilteredUsers(response.data.users);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  };

  // Function to handle filter change
  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);

    if (selectedFilter === "all") {
      setFilteredUsers(users);
    } else {
      const isActive = selectedFilter === "active";
      setFilteredUsers(users.filter((user) => user.isActive === isActive));
    }
  };

  // Function to toggle user block/unblock status
  const handleToggleStatus = (userId, isActive) => {
    const action = isActive ? "block" : "unblock";
    
    if (window.confirm(`Are you sure you want to ${action} this user?`)) {
      axios
        .post("http://localhost:5000/api/admin/change-Status", { userId })
        .then((response) => {
          // Update local user state
          setUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.userId === userId ? { ...user, isActive: !isActive } : user
            )
          );

          setFilteredUsers((prevUsers) =>
            prevUsers.map((user) =>
              user.userId === userId ? { ...user, isActive: !isActive } : user
            )
          );
        })
        .catch((error) => {
          console.error("Error updating user status:", error);
          alert("Failed to update user status.");
        });
    }
  };

  if (loading) {
    return <div className="text-center mt-10 text-lg font-semibold">Loading users...</div>;
  }

  return (
    <div className="min-h-screen py-10 px-6 mt-20">
      <h2 className="text-2xl font-bold mb-4">Donors List</h2>

      {/* Filter Dropdown */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Filter:</label>
        <select
          className="px-3 py-2 border rounded-md"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="all">All Users</option>
          <option value="active">Active Users</option>
          <option value="inactive">Inactive Users</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Image</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Phone</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredUsers.map((user) => (
              <tr key={user.userId} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6">
                  <img
                    src={user.photoUrl || "/default-user.png"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                </td>
                <td className="py-3 px-6">{user.name}</td>
                <td className="py-3 px-6">{user.email}</td>
                <td className="py-3 px-6">{user.phone}</td>
                <td className="py-3 px-6">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      user.isActive ? "bg-green-200 text-green-600" : "bg-red-200 text-red-600"
                    }`}
                  >
                    {user.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="py-3 px-6 text-center flex gap-3 justify-center">
                  <FaEye className="text-blue-600 cursor-pointer" title="View Profile" />
                  
                  {/* Block/Unblock Button */}
                  {user.isActive ? (
                    <FaBan
                      className="text-red-600 cursor-pointer"
                      title="Block User"
                      onClick={() => handleToggleStatus(user.userId, user.isActive)}
                    />
                  ) : (
                    <FaCheckCircle
                      className="text-green-600 cursor-pointer"
                      title="Unblock User"
                      onClick={() => handleToggleStatus(user.userId, user.isActive)}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonorsList;
