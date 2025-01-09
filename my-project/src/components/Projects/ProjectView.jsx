// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const ProjectView = () => {
//   const [projects, setProjects] = useState([]);
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filter, setFilter] = useState("all");
//   const navigate = useNavigate();

//   const ngoId = localStorage.getItem("ngoId"); // Retrieve NGO ID from local storage
// console.log(ngoId);
//   useEffect(() => {
//     // Fetch all projects from multiple APIs
//     const fetchProjects = async () => {
//       try {
//         const ongoingResponse = await fetch(
//           `http://localhost:5000/api/project/ongoing/${ngoId}`
//         );
//         const futureResponse = await fetch(
//           `http://localhost:5000/api/project/future/${ngoId}`
//         );
//         const completedResponse = await fetch(
//           `http://localhost:5000/api/project/completed/${ngoId}`
//         );

//         const ongoingProjects = await ongoingResponse.json();
//         const futureProjects = await futureResponse.json();
//         const completedProjects = await completedResponse.json();

//         const allProjects = [
//           ...ongoingProjects.map((project) => ({
//             ...project,
//             status: "ongoing",
//           })),
//           ...futureProjects.map((project) => ({
//             ...project,
//             status: "future",
//           })),
//           ...completedProjects.map((project) => ({
//             ...project,
//             status: "completed",
//           })),
//         ];

//         setProjects(allProjects);
//         setFilteredProjects(allProjects); // Default to show all projects
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching projects:", error);
//         setLoading(false);
//       }
//     };

//     fetchProjects();
//   }, [ngoId]);

//   // Handle filter change
//   const handleFilterChange = (status) => {
//     setFilter(status);
//     if (status === "all") {
//       setFilteredProjects(projects);
//     } else {
//       setFilteredProjects(
//         projects.filter((project) => project.status === status)
//       );
//     }
//   };

//   if (loading) {
//     return <div className="text-center text-gray-500">Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto p-6 mt-20">
//       <h1 className="text-3xl font-bold text-[#225738] text-center mb-8">
//         Projects Dashboard
//       </h1>

//       {/* Filter Buttons */}
//       <div className="flex justify-center space-x-4 mb-6">
//         <button
//           className={`px-4 py-2 rounded ${
//             filter === "all" ? "bg-green-700 text-white" : "bg-gray-200"
//           }`}
//           onClick={() => handleFilterChange("all")}
//         >
//           All Projects
//         </button>
//         <button
//           className={`px-4 py-2 rounded ${
//             filter === "ongoing" ? "bg-green-700 text-white" : "bg-gray-200"
//           }`}
//           onClick={() => handleFilterChange("ongoing")}
//         >
//           Ongoing Projects
//         </button>
//         <button
//           className={`px-4 py-2 rounded ${
//             filter === "future" ? "bg-green-700 text-white" : "bg-gray-200"
//           }`}
//           onClick={() => handleFilterChange("future")}
//         >
//           Future Projects
//         </button>
//         <button
//           className={`px-4 py-2 rounded ${
//             filter === "completed" ? "bg-green-700 text-white" : "bg-gray-200"
//           }`}
//           onClick={() => handleFilterChange("completed")}
//         >
//           Completed Projects
//         </button>
//       </div>

//       {/* Project List */}
//       <div className="space-y-6">
//         {filteredProjects.map((project) => (
//           <div
//             key={project.id}
//             data-project-id={project.id}
//             className="p-4 border rounded-lg shadow-md bg-white"
//           >
//             <h3 className="font-bold text-lg mb-2">{project.projectTitle}</h3>

//             {/* Displaying description */}
//             <p className="text-gray-700 mb-4">
//               {project.description.replace(/<[^>]*>?/gm, "").slice(0, 120)}...
//             </p>

//             {/* Images in a flex row */}
//             {project.imageUrls && project.imageUrls.length > 0 && (
//               <div className="flex gap-4 overflow-x-auto mb-4">
//                 {project.imageUrls.map((imageUrl, index) => (
//                   <img
//                     key={index}
//                     src={imageUrl}
//                     alt={`Project ${project.projectTitle} - Image ${index + 1}`}
//                     className="w-32 h-32 object-cover rounded-lg"
//                   />
//                 ))}
//               </div>
//             )}

//             {/* Project details */}
//             <div className="text-sm text-gray-500 mb-4">
//               <p>
//                 <strong>Category:</strong> {project.category}
//               </p>
//               <p>
//                 <strong>Location:</strong> {project.location}
//               </p>
//               <p>
//                 <strong>Budget:</strong> $
//                 {project.estimatedBudget.toLocaleString()}
//               </p>
//               <p>
//                 <strong>End Date:</strong>{" "}
//                 {new Date(project.expectedEndDate).toLocaleDateString()}
//               </p>
//             </div>

//             {/* Edit Button */}
//             <button
//               className="mt-4 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 transition"
//               onClick={() => {
//                 localStorage.setItem("projectId", project.id); // Store project ID in localStorage
//                 navigate(`/project-dashboard/edit/${project.id}`); // Navigate to the edit page
//               }}
//             >
//               Edit
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProjectView;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProjectView = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const ngoId = localStorage.getItem("ngoId"); // Retrieve NGO ID from local storage
  console.log(ngoId);

  useEffect(() => {
    // Fetch all projects from multiple APIs
    const fetchProjects = async () => {
      try {
        const ongoingResponse = await fetch(
          `http://localhost:5000/api/project/ongoing/${ngoId}`
        );
        const futureResponse = await fetch(
          `http://localhost:5000/api/project/future/${ngoId}`
        );
        const completedResponse = await fetch(
          `http://localhost:5000/api/project/completed/${ngoId}`
        );

        const ongoingProjects = await ongoingResponse.json();
        const futureProjects = await futureResponse.json();
        const completedProjects = await completedResponse.json();

        // Log the responses to inspect their structure
        console.log("Ongoing Projects:", ongoingProjects);
        console.log("Future Projects:", futureProjects);
        console.log("Completed Projects:", completedProjects);

        // Check if completedProjects is an array before using map
        const allProjects = [
          ...ongoingProjects.map((project) => ({
            ...project,
            status: "ongoing",
          })),
          ...futureProjects.map((project) => ({
            ...project,
            status: "future",
          })),
          ...(Array.isArray(completedProjects)
            ? completedProjects.map((project) => ({
                ...project,
                status: "completed",
              }))
            : []), // Safely handle if completedProjects is not an array
        ];

        setProjects(allProjects);
        setFilteredProjects(allProjects); // Default to show all projects
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, [ngoId]);

  // Handle filter change
  const handleFilterChange = (status) => {
    setFilter(status);
    if (status === "all") {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) => project.status === status)
      );
    }
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 mt-20">
      <h1 className="text-3xl font-bold text-[#225738] text-center mb-8">
        Projects Dashboard
      </h1>

      {/* Filter Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            filter === "all" ? "bg-green-700 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleFilterChange("all")}
        >
          All Projects
        </button>
        <button
          className={`px-4 py-2 rounded ${
            filter === "ongoing" ? "bg-green-700 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleFilterChange("ongoing")}
        >
          Ongoing Projects
        </button>
        <button
          className={`px-4 py-2 rounded ${
            filter === "future" ? "bg-green-700 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleFilterChange("future")}
        >
          Future Projects
        </button>
        <button
          className={`px-4 py-2 rounded ${
            filter === "completed" ? "bg-green-700 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleFilterChange("completed")}
        >
          Completed Projects
        </button>
      </div>

      {/* Project List */}
      <div className="space-y-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            data-project-id={project.id}
            className="p-4 border rounded-lg shadow-md bg-white"
          >
            <h3 className="font-bold text-lg mb-2">{project.projectTitle}</h3>

            {/* Displaying description */}
            <p className="text-gray-700 mb-4">
              {project.description.replace(/<[^>]*>?/gm, "").slice(0, 120)}...
            </p>

            {/* Images in a flex row */}
            {project.imageUrls && project.imageUrls.length > 0 && (
              <div className="flex gap-4 overflow-x-auto mb-4">
                {project.imageUrls.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Project ${project.projectTitle} - Image ${index + 1}`}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}

            {/* Project details */}
            <div className="text-sm text-gray-500 mb-4">
              <p>
                <strong>Category:</strong> {project.category}
              </p>
              <p>
                <strong>Location:</strong> {project.location}
              </p>
              <p>
                <strong>Budget:</strong> $
                {project.estimatedBudget.toLocaleString()}
              </p>
              <p>
                <strong>End Date:</strong>{" "}
                {new Date(project.expectedEndDate).toLocaleDateString()}
              </p>
            </div>

            {/* Edit Button */}
            <button
              className="mt-4 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              onClick={() => {
                localStorage.setItem("projectId", project.id); // Store project ID in localStorage
                navigate(`/project-dashboard/edit/${project.id}`); // Navigate to the edit page
              }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectView;
