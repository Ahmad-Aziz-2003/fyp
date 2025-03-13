// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const RequestVolunteer = () => {
//   const [isRequestingVolunteers, setIsRequestingVolunteers] = useState(false);
//   const [volunteerDetails, setVolunteerDetails] = useState({
//     purpose: "",
//     location: "",
//     noOfvolunteer: "",
//     timeofstarting: "",
//     endoftime: "",
//     desc: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(true);
//   const [responseMessage, setResponseMessage] = useState("");
//   const [ngoId, setNgoId] = useState(null);

//   // Retrieve NGO ID from localStorage
//   useEffect(() => {
//     const id = localStorage.getItem("ngoId");
//     if (!id) {
//       console.error("NGO ID is missing. Please log in.");
//       setInitialLoading(false);
//     } else {
//       setNgoId(id);
//       fetchVolunteerStatus(id);
//     }
//   }, []);

//   const apiUrl = `http://localhost:5000/api/volunteer/request-volunteer/${ngoId}`;
//   const statusApiUrl = `http://localhost:5000/api/volunteer/volunteerStatus`;

//   const fetchVolunteerStatus = async (id) => {
//     try {
//       const response = await axios.get(`${statusApiUrl}/${id}`);
//       const { isRequestingVolunteers, volunteerDetails } = response.data;

//       setIsRequestingVolunteers(isRequestingVolunteers);
//       if (isRequestingVolunteers && volunteerDetails) {
//         setVolunteerDetails(volunteerDetails);
//       }
//     } catch (error) {
//       console.error("Error fetching volunteer request status:", error);
//       setResponseMessage(
//         "Failed to fetch the current status. Please try again."
//       );
//     } finally {
//       setInitialLoading(false);
//     }
//   };

//   const updateVolunteerRequest = async () => {
//     if (!ngoId) {
//       setResponseMessage("NGO ID is missing. Please log in.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setResponseMessage("");

//       const data = {
//         isRequestingVolunteers,
//         volunteerDetails: isRequestingVolunteers ? volunteerDetails : {},
//       };

//       const response = await axios.post(apiUrl, data);
//       setResponseMessage(response.data.message);
//     } catch (error) {
//       console.error("Error while updating volunteer request:", error);
//       setResponseMessage("An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleToggleRequest = () => {
//     const newStatus = !isRequestingVolunteers;
//     setIsRequestingVolunteers(newStatus);

//     // Clear details when switching off
//     if (!newStatus) {
//       setVolunteerDetails({
//         purpose: "",
//         location: "",
//         noOfvolunteer: "",
//         timeofstarting: "",
//         endoftime: "",
//         desc: "",
//       });
//     }
//   };

//   const handleSaveChanges = async () => {
//     if (
//       isRequestingVolunteers &&
//       (!volunteerDetails.purpose ||
//         !volunteerDetails.location ||
//         !volunteerDetails.noOfvolunteer ||
//         !volunteerDetails.timeofstarting ||
//         !volunteerDetails.endoftime)
//     ) {
//       setResponseMessage("Please fill in all mandatory fields.");
//       return;
//     }
//     await updateVolunteerRequest();
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setVolunteerDetails({ ...volunteerDetails, [name]: value });
//   };

//   if (initialLoading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="p-4">
//       <h2 className="text-lg font-bold mb-4">Request Volunteers</h2>

//       {/* Status Message */}
//       <div className="mb-4">
//         <p
//           className={`font-bold ${
//             isRequestingVolunteers ? "text-green-500" : "text-red-500"
//           }`}
//         >
//           {isRequestingVolunteers
//             ? "Volunteer request ON"
//             : "Volunteer request OFF"}
//         </p>
//       </div>

//       {/* Toggle ON/OFF */}
//       <div>
//         <button
//           className={`p-2 px-4 rounded ${
//             isRequestingVolunteers ? "bg-green-500" : "bg-gray-500"
//           } text-white`}
//           onClick={handleToggleRequest}
//           disabled={loading}
//         >
//           {isRequestingVolunteers ? "ON" : "OFF"}
//         </button>
//       </div>

//       {/* Volunteer Form */}
//       {isRequestingVolunteers && (
//         <div className="mt-4">
//           <div className="mb-4">
//             <label className="block font-medium">Purpose:</label>
//             <input
//               type="text"
//               name="purpose"
//               className="w-full p-2 border rounded"
//               placeholder="Purpose of volunteering"
//               value={volunteerDetails.purpose}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block font-medium">Location:</label>
//             <input
//               type="text"
//               name="location"
//               className="w-full p-2 border rounded"
//               placeholder="Location"
//               value={volunteerDetails.location}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block font-medium">Number of Volunteers:</label>
//             <input
//               type="number"
//               name="noOfvolunteer"
//               className="w-full p-2 border rounded"
//               placeholder="Number of volunteers needed"
//               value={volunteerDetails.noOfvolunteer}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block font-medium">Start Time:</label>
//             <input
//               type="datetime-local"
//               name="timeofstarting"
//               className="w-full p-2 border rounded"
//               value={volunteerDetails.timeofstarting}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block font-medium">End Time:</label>
//             <input
//               type="datetime-local"
//               name="endoftime"
//               className="w-full p-2 border rounded"
//               value={volunteerDetails.endoftime}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block font-medium">Description (Optional):</label>
//             <textarea
//               name="desc"
//               className="w-full p-2 border rounded"
//               rows="4"
//               placeholder="Additional details (optional)"
//               value={volunteerDetails.desc}
//               onChange={handleInputChange}
//             ></textarea>
//           </div>
//         </div>
//       )}

//       {/* Save Changes */}
//       <div className="mt-4">
//         <button
//           className="p-2 px-4 bg-blue-500 rounded text-white"
//           onClick={handleSaveChanges}
//           disabled={loading}
//         >
//           {loading ? "Saving..." : "Save Changes"}
//         </button>
//       </div>

//       {/* Response Message */}
//       {responseMessage && (
//         <div className="mt-4 p-2 border rounded text-center">
//           {responseMessage}
//         </div>
//       )}
//     </div>
//   );
// };

// export default RequestVolunteer;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const RequestVolunteer = () => {
//   const [isRequestingVolunteers, setIsRequestingVolunteers] = useState(false);
//   const [volunteerDetails, setVolunteerDetails] = useState({
//     purpose: "",
//     location: "",
//     noOfvolunteer: "",
//     timeofstarting: "",
//     endoftime: "",
//     desc: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [initialLoading, setInitialLoading] = useState(true);
//   const [responseMessage, setResponseMessage] = useState("");
//   const [ngoId, setNgoId] = useState(null);

//   // Retrieve NGO ID from localStorage
//   useEffect(() => {
//     const id = localStorage.getItem("ngoId");
//     if (!id) {
//       console.error("NGO ID is missing. Please log in.");
//       setInitialLoading(false);
//     } else {
//       setNgoId(id);
//       fetchVolunteerStatus(id);
//     }
//   }, []);

//   const apiUrl = `http://localhost:5000/api/volunteer/request-volunteer/${ngoId}`;
//   const statusApiUrl = `http://localhost:5000/api/volunteer/volunteerStatus`;

//   const fetchVolunteerStatus = async (id) => {
//     try {
//       const response = await axios.get(`${statusApiUrl}/${id}`);
//       const { isRequestingVolunteers, volunteerDetails } = response.data;

//       setIsRequestingVolunteers(isRequestingVolunteers);
//       if (isRequestingVolunteers && volunteerDetails) {
//         setVolunteerDetails(volunteerDetails);
//       }
//     } catch (error) {
//       console.error("Error fetching volunteer request status:", error);
//       setResponseMessage(
//         "Failed to fetch the current status. Please try again."
//       );
//     } finally {
//       setInitialLoading(false);
//     }
//   };

//   const updateVolunteerRequest = async () => {
//     if (!ngoId) {
//       setResponseMessage("NGO ID is missing. Please log in.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setResponseMessage("");

//       const data = {
//         isRequestingVolunteers,
//         volunteerDetails: isRequestingVolunteers ? volunteerDetails : {},
//       };

//       const response = await axios.post(apiUrl, data);
//       setResponseMessage(response.data.message);
//     } catch (error) {
//       console.error("Error while updating volunteer request:", error);
//       setResponseMessage("An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleToggleRequest = () => {
//     const newStatus = !isRequestingVolunteers;
//     setIsRequestingVolunteers(newStatus);

//     // Clear details when switching off
//     if (!newStatus) {
//       setVolunteerDetails({
//         purpose: "",
//         location: "",
//         noOfvolunteer: "",
//         timeofstarting: "",
//         endoftime: "",
//         desc: "",
//       });
//     }
//   };

//   const handleSaveChanges = async () => {
//     if (
//       isRequestingVolunteers &&
//       (!volunteerDetails.purpose ||
//         !volunteerDetails.location ||
//         !volunteerDetails.noOfvolunteer ||
//         !volunteerDetails.timeofstarting ||
//         !volunteerDetails.endoftime)
//     ) {
//       setResponseMessage("Please fill in all mandatory fields.");
//       return;
//     }
//     await updateVolunteerRequest();
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setVolunteerDetails({ ...volunteerDetails, [name]: value });
//   };

//   if (initialLoading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className="p-4 mt-20">
//       <h2 className="text-3xl font-bold mb-6 text-[#225738]">
//         Request Volunteers
//       </h2>

//       {/* Status Message */}
//       <div className="mb-4">
//         <p
//           className={`font-bold ${
//             isRequestingVolunteers ? "text-green-700" : "text-red-500"
//           }`}
//         >
//           {isRequestingVolunteers
//             ? "Volunteer request ON"
//             : "Volunteer request OFF"}
//         </p>
//       </div>

//       {/* Toggle ON/OFF */}
//       <div>
//         <button
//           className={`p-2 px-4 rounded ${
//             isRequestingVolunteers ? "bg-green-700" : "bg-gray-500"
//           } text-white`}
//           onClick={handleToggleRequest}
//           disabled={loading}
//         >
//           {isRequestingVolunteers ? "ON" : "OFF"}
//         </button>
//       </div>

//       {/* Volunteer Form */}
//       {isRequestingVolunteers && (
//         <div className="mt-4">
//           <div className="mb-4">
//             <label className="block mb-2 font-bold text-[#225738]">
//               Purpose
//             </label>
//             <input
//               type="text"
//               name="purpose"
//               className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
//               placeholder="Purpose of volunteering"
//               value={volunteerDetails.purpose}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-2 font-bold text-[#225738]">
//               Location
//             </label>
//             <input
//               type="text"
//               name="location"
//               className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
//               placeholder="Location"
//               value={volunteerDetails.location}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-2 font-bold text-[#225738]">
//               Number of Volunteers
//             </label>
//             <input
//               type="number"
//               name="noOfvolunteer"
//               className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
//               placeholder="Number of volunteers needed"
//               value={volunteerDetails.noOfvolunteer}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-2 font-bold text-[#225738]">
//               Start Time
//             </label>
//             <input
//               type="datetime-local"
//               name="timeofstarting"
//               className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
//               value={volunteerDetails.timeofstarting}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-2 font-bold text-[#225738]">
//               End Time
//             </label>
//             <input
//               type="datetime-local"
//               name="endoftime"
//               className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
//               value={volunteerDetails.endoftime}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-2 font-bold text-[#225738]">
//               Description (Optional)
//             </label>
//             <textarea
//               name="desc"
//               className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
//               rows="4"
//               placeholder="Additional details (optional)"
//               value={volunteerDetails.desc}
//               onChange={handleInputChange}
//             ></textarea>
//           </div>
//           {/* Save and Back Buttons */}
//           <div className="flex justify-between mt-6">
//             <button
//               type="button"
//               className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
//               onClick={() => window.history.back()}
//             >
//               Back
//             </button>
//             <button
//               className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-600 transition"
//               onClick={handleSaveChanges}
//               disabled={loading}
//             >
//               {loading ? "Loading..." : "Save Changes"}
//             </button>
//           </div>

//           {/* Response Message */}
//           {responseMessage && (
//             <div className="mt-4 p-2 border rounded text-center">
//               {responseMessage}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default RequestVolunteer;
import React, { useState, useEffect } from "react";
import axios from "axios";

const RequestVolunteer = () => {
  const [isRequestingVolunteers, setIsRequestingVolunteers] = useState(false);
  const [volunteerDetails, setVolunteerDetails] = useState({
    purpose: "",
    location: "",
    noOfvolunteer: "",
    timeofstarting: "",
    endoftime: "",
    desc: "",
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [responseMessage, setResponseMessage] = useState("");
  const [ngoId, setNgoId] = useState(null);

  // Retrieve NGO ID from localStorage
  useEffect(() => {
    const id = localStorage.getItem("ngoId");
    if (!id) {
      console.error("NGO ID is missing. Please log in.");
      setInitialLoading(false);
    } else {
      setNgoId(id);
      fetchVolunteerStatus(id);
    }
  }, []);

  const apiUrl = `http://localhost:5000/api/volunteer/request-volunteer/${ngoId}`;
  const statusApiUrl = `http://localhost:5000/api/volunteer/volunteerStatus`;

  const fetchVolunteerStatus = async (id) => {
    try {
      const response = await axios.get(`${statusApiUrl}/${id}`);
      const { isRequestingVolunteers, volunteerDetails } = response.data;

      setIsRequestingVolunteers(isRequestingVolunteers);
      if (isRequestingVolunteers && volunteerDetails) {
        setVolunteerDetails(volunteerDetails);
      }
    } catch (error) {
      console.error("Error fetching volunteer request status:", error);
      setResponseMessage("Failed to fetch the current status. Please try again.");
    } finally {
      setInitialLoading(false);
    }
  };

  const updateVolunteerRequest = async () => {
    if (!ngoId) {
      setResponseMessage("NGO ID is missing. Please log in.");
      return;
    }

    try {
      setLoading(true);
      setResponseMessage("");

      const data = {
        isRequestingVolunteers,
        volunteerDetails: isRequestingVolunteers ? volunteerDetails : {},
      };

      const response = await axios.post(apiUrl, data);
      setResponseMessage(response.data.message);
    } catch (error) {
      console.error("Error while updating volunteer request:", error);
      setResponseMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRequest = () => {
    const newStatus = !isRequestingVolunteers;
    setIsRequestingVolunteers(newStatus);

    // Clear details when switching off
    if (!newStatus) {
      setVolunteerDetails({
        purpose: "",
        location: "",
        noOfvolunteer: "",
        timeofstarting: "",
        endoftime: "",
        desc: "",
      });
    }
  };

  const handleSaveChanges = async () => {
    if (
      isRequestingVolunteers &&
      (!volunteerDetails.purpose ||
        !volunteerDetails.location ||
        !volunteerDetails.noOfvolunteer ||
        !volunteerDetails.timeofstarting ||
        !volunteerDetails.endoftime)
    ) {
      setResponseMessage("Please fill in all mandatory fields.");
      return;
    }
    await updateVolunteerRequest();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVolunteerDetails({ ...volunteerDetails, [name]: value });
  };

  if (initialLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md mt-[6.5rem]">
      <h2 className="text-xl font-bold mb-6 text-center">Request Volunteers</h2>

      {/* Status Message */}
      <div className="mb-4">
        <p
          className={`font-semibold ${
            isRequestingVolunteers ? "text-green-500" : "text-red-500"
          }`}
        >
          {isRequestingVolunteers
            ? "Volunteer request ON"
            : "Volunteer request OFF"}
        </p>
      </div>

      {/* Toggle ON/OFF */}
      <div className="mb-6 text-center">
        <button
          className={`px-6 py-2 rounded-lg text-white ${
            isRequestingVolunteers ? "bg-green-600" : "bg-gray-500"
          }`}
          onClick={handleToggleRequest}
          disabled={loading}
        >
          {isRequestingVolunteers ? "ON" : "OFF"}
        </button>
      </div>

      {/* Volunteer Form */}
      {isRequestingVolunteers && (
        <div>
          <div className="mb-5">
            <label className="block text-gray-700">Purpose:</label>
            <input
              type="text"
              name="purpose"
              className="w-full p-4 border border-gray-300 rounded-lg"
              placeholder="Purpose of volunteering"
              value={volunteerDetails.purpose}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-5">
            <label className="block text-gray-700">Location:</label>
            <input
              type="text"
              name="location"
              className="w-full p-4 border border-gray-300 rounded-lg"
              placeholder="Location"
              value={volunteerDetails.location}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-5">
            <label className="block text-gray-700">Number of Volunteers:</label>
            <input
              type="number"
              name="noOfvolunteer"
              className="w-full p-4 border border-gray-300 rounded-lg"
              placeholder="Number of volunteers needed"
              value={volunteerDetails.noOfvolunteer}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-5">
            <label className="block text-gray-700">Start Time:</label>
            <input
              type="datetime-local"
              name="timeofstarting"
              className="w-full p-4 border border-gray-300 rounded-lg"
              value={volunteerDetails.timeofstarting}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-5">
            <label className="block text-gray-700">End Time:</label>
            <input
              type="datetime-local"
              name="endoftime"
              className="w-full p-4 border border-gray-300 rounded-lg"
              value={volunteerDetails.endoftime}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-5">
            <label className="block text-gray-700">Description (Optional):</label>
            <textarea
              name="desc"
              className="w-full p-4 border border-gray-300 rounded-lg"
              rows="4"
              placeholder="Additional details (optional)"
              value={volunteerDetails.desc}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>
      )}

      {/* Save Changes */}
      <div className="mb-4">
        <button
          className="w-full py-3 bg-blue-600 text-white rounded-lg"
          onClick={handleSaveChanges}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Response Message */}
      {responseMessage && (
        <div className="mt-4 p-3 bg-yellow-300 text-center text-gray-800 rounded-lg">
          {responseMessage}
        </div>
      )}
    </div>
  );
};

export default RequestVolunteer;
