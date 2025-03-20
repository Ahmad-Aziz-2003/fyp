// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const VerificationRequestNgo = () => {
//   const [ngos, setNgos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchUnverifiedNGOs();
//   }, []);

//   const fetchUnverifiedNGOs = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/admin/unverify-ngos");
//       setNgos(response.data.ngos);
//     } catch (err) {
//       setError("Failed to fetch NGOs.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <div className="text-center mt-10 text-xl">Loading...</div>;
//   if (error) return <div className="text-center mt-10 text-xl text-red-500">{error}</div>;

//   return (
//     <div className="min-h-screen p-6">
//       <h1 className="text-2xl font-bold mb-6">NGO Verification Requests</h1>
//       <table className="w-full border-collapse border border-gray-300">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border p-3">Name</th>
//             <th className="border p-3">Email</th>
//             <th className="border p-3">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {ngos.map((ngo) => (
//             <tr key={ngo.ngoId} className="border">
//               <td className="border p-3">{ngo.name}</td>
//               <td className="border p-3">{ngo.email}</td>
//               <td className="border p-3 flex space-x-2">
//                 <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
//                   ✅ Verify
//                 </button>
//                 <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
//                   ❌ Reject
//                 </button>
//                 <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
//                   👁 View Details
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// // export default VerificationRequestNgo;
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const VerificationRequestNgo = () => {
//   const [ngos, setNgos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchUnverifiedNGOs();
//   }, []);

//   const fetchUnverifiedNGOs = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/admin/unverify-ngos");
//       setNgos(response.data.ngos);
//     } catch (err) {
//       setError("Failed to fetch NGOs.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <div className="text-center mt-10 text-xl">Loading...</div>;
//   if (error) return <div className="text-center mt-10 text-xl text-red-500">{error}</div>;

//   return (
//     <div className="min-h-screen p-6">
//       <h1 className="text-2xl font-bold mb-6">NGO Verification Requests</h1>
//       <div className="space-y-6">
//         {ngos.map((ngo) => (
//           <div key={ngo.ngoId} className="border p-5 rounded-lg shadow-md bg-white">
//             <h2 className="text-xl font-bold">{ngo.name}</h2>
//             <p className="text-gray-600"><strong>Email:</strong> {ngo.email}</p>
//             <p className="text-gray-600">
//               <strong>Founded Date:</strong> {new Date(ngo.foundedDate).toLocaleDateString()}
//             </p>
//             <p className="text-gray-600"><strong>Registration #:</strong> {ngo.registrationNumber}</p>

//             {/* NGO Image (if available) */}
//             {/* {ngo.profilePhoto && (
//               <img
//                 src={ngo.profilePhoto}
//                 alt={ngo.name}
//                 className="w-40 h-40 mt-3 object-cover rounded-lg"
//               />
//             )} */}

//             {/* Action Buttons */}
//             <div className="flex space-x-3 mt-4">
//               <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
//                 ✅ Verify
//               </button>
//               <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
//                 ❌ Reject
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default VerificationRequestNgo;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerificationRequestNgo = () => {
  const navigate = useNavigate(); 
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUnverifiedNGOs();
  }, []);

  const fetchUnverifiedNGOs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/unverify-ngos");
      setNgos(response.data.ngos);
    } catch (err) {
      setError("Failed to fetch NGOs.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-10 text-xl">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-xl text-red-500">{error}</div>;

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">NGO Verification Requests</h1>
      <div className="space-y-6">
        {ngos.map((ngo) => (
          <div key={ngo.ngoId} className="border p-5 rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-bold">{ngo.name}</h2>
            <p className="text-gray-600"><strong>Email:</strong> {ngo.email}</p>
            <p className="text-gray-600">
              <strong>Founded Date:</strong> {new Date(ngo.foundedDate).toLocaleDateString()}
            </p>
            <p className="text-gray-600"><strong>Registration #:</strong> {ngo.registrationNumber}</p>

            {/* NGO Image (if available) */}
            {ngo.profilePhoto && (
              <img
                src={ngo.profilePhoto}
                alt={ngo.name}
                className="w-40 h-40 mt-3 object-cover rounded-lg"
              />
            )}

            {/* Action Buttons */}
            <div className="flex space-x-3 mt-4">
              <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                ✅ Verify
              </button>
              <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                ❌ Reject
              </button>
              <button onClick={() => {
    localStorage.setItem("ngoID", ngo.ngoId); // Store ngoId in localStorage
    navigate(`/admin-dashboard/NgoDetail`); // Navigate to NGODetail page
  }} 
  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                 👁 View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerificationRequestNgo;
