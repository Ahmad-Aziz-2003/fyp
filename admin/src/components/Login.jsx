import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import donationbg from "../assets/asd.jpg";

const Login = () => {
  const [isAdminLogin, setIsAdminLogin] = useState(true); // Default to admin login
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Admin Login Function
  const handleAdminLogin = async (email, password, setError) => {
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:5000/api/admin/signin", {
        email,
        password,
      });

      const { adminId, token } = response.data;
      localStorage.setItem("adminId", adminId);
      localStorage.setItem("token", token);

      navigate("/admin-dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  // Admin Login Form
  const AdminLoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    return (
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs">
        <h2 className="text-xl font-bold text-center text-[#225738] mb-4">Admin Sign In</h2>
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}
        <input
          type="email"
          className="border border-gray-300 rounded-md p-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-[#225738]"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="border border-gray-300 rounded-md p-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-[#225738]"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-[#225738] text-white font-semibold rounded-md py-2 w-full hover:bg-[#258e66] transition"
          onClick={() => handleAdminLogin(email, password, setError)}
        >
          Sign In
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 relative">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-white text-2xl">Loading...</div>
        </div>
      )}
      <div className="flex max-w-4xl w-full bg-white rounded-lg shadow-lg overflow-hidden h-[80vh]">
        <div
          className="w-1/2 flex justify-center items-center p-10 relative"
          style={{
            backgroundImage: `url(${donationbg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="w-1/2 flex justify-center items-center p-10 relative">
          {isAdminLogin ? <AdminLoginForm /> : <></>}
        </div>
      </div>
    </div>
  );
};

export default Login;
