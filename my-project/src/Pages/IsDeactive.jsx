// import React from "react";
// import { FaClock } from "react-icons/fa";

// const RequestPending = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
//         <FaClock className="text-yellow-500 text-5xl mx-auto mb-4" />
//         <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Pending</h2>
//         <p className="text-gray-600 mb-4">
//           Your request for registration is currently under review by the admin.
//           Please wait for approval. You will be notified once your account is
//           verified.
//         </p>
//         <div className="text-gray-500 text-sm">Thank you for your patience.</div>
//       </div>
//     </div>
//   );
// };

// export default RequestPending;
import React from "react";
import { FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const IsDeactive = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md text-center">
        <FaClock className="text-yellow-500 text-5xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your account is deactive</h2>
        <p className="text-gray-600 mb-4">
          Your account has been deactivated by admin.
          Please email at admin@dast.e.khair.com .
        </p>
        <div className="text-gray-500 text-sm mb-4">Thank you for your patience.</div>
        <button
          onClick={() => navigate("/")}
          className="bg-[#225738] text-white font-semibold px-4 py-2 rounded-md hover:bg-[#258e66] transition"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default IsDeactive;
