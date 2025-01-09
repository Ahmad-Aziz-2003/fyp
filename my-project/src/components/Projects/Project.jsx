// import React from "react";
// import { Link, Outlet } from "react-router-dom";

// const Projects = () => {
//   return (
//     <div className="p-6 bg-white shadow rounded">
//       <h1 className="text-2xl font-bold mb-6">Goodness Section</h1>
//       <p className="mb-4 text-gray-600">
//         Manage projects here. You can create, edit, or delete project.
//       </p>

//       {/* Navigation buttons */}
//       <div className="space-x-4 mb-6">
//         <Link to="/ngo-dashboard/createProject">
//           <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
//             Create Project
//           </button>
//         </Link>

//         <Link to="/ngo-dashboard/viewProject">
//           <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-red-600 transition">
//             Projects Detail
//           </button>
//         </Link>
//       </div>

//       {/* Outlet for nested routes */}
//       <Outlet />
//     </div>
//   );
// };

// export default Projects;

import React from "react";
import { Link, Outlet } from "react-router-dom";
import ProjectsImage from "../../assets/asd.jpg";

const Projects = () => {
  return (
    <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${ProjectsImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1, // Makes sure the background image stays behind other elements
        }}
      >
        {/* Overlay to make the image dull */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Black overlay with 50% opacity
          }}
        ></div>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: "white",
          fontFamily: "Arial, sans-serif",
          //zIndex: 1, // Ensure this content appears above the background and overlay
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "bold",
              marginBottom: "20px",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
            }}
          >
            Small help together makes better Life
          </h1>

          <p
            style={{
              fontSize: "20px",
              fontWeight: "normal",
              marginBottom: "40px",
              maxWidth: "700px",
              textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
              margin: "0 auto",
            }}
          >
            Your small contribution can make change. Help today because tomorrow
            you may be the one who needs help. Become a Part to change the
            World.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "30px",
              marginTop: "20px",
            }}
          >
            <Link to="/ngo-dashboard/createProject">
              <button className="px-4 py-2 bg-green-700 text-lg text-white font-bold rounded hover:bg-green-600 transition">
                Create Project
              </button>
            </Link>
            <Link to="/ngo-dashboard/viewProject">
              <button className="px-4 py-2 bg-green-700 text-lg font-bold text-white rounded hover:bg-green-600 transition">
                View Projects
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Outlet for nested routes */}
      <Outlet />
    </div>
  );
};

export default Projects;

// {/* <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
//   <div
//     style={{
//       position: "absolute",
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       backgroundImage: `url(${DonationsImage})`,
//       backgroundSize: "cover",
//       backgroundPosition: "center",
//       zIndex: -1, // Makes sure the background image stays behind other elements
//     }}
//   >
//     {/* Overlay to make the image dull */}
//     <div
//       style={{
//         position: "absolute",
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: "rgba(0, 0, 0, 0.5)", // Black overlay with 50% opacity
//       }}
//     ></div>
//   </div>

//   <div
//     style={{
//       flex: 1,
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       textAlign: "center",
//       color: "white",
//       fontFamily: "Arial, sans-serif",
//       //zIndex: 1, // Ensure this content appears above the background and overlay
//     }}
//   >
//     <div>
//       <h1
//         style={{
//           fontSize: "48px",
//           fontWeight: "bold",
//           marginBottom: "20px",
//           textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
//         }}
//       >
//         Small help together makes better Life
//       </h1>

//       <p
//         style={{
//           fontSize: "20px",
//           fontWeight: "normal",
//           marginBottom: "40px",
//           maxWidth: "700px",
//           textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
//           margin: "0 auto",
//         }}
//       >
//         Your small contribution can make change. Help today because tomorrow you
//         may be the one who needs help. Become a Part to change the World.
//       </p>
//     </div>
//   </div>

//   {/* Outlet for nested routes */}
//   <Outlet />
// </div>; */}
