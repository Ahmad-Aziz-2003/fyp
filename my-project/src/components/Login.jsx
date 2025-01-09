import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import donationbg from "../assets/asd.jpg";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // State to control loading screen visibility
  const navigate = useNavigate();

  // Handle login request
  const handleLogin = async (email, password, setError) => {
    try {
      setIsLoading(true); // Show loading screen
      const response = await fetch("http://localhost:5000/api/ngos/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      console.log(data); // Add this line for debugging the response

      if (!response.ok) {
        throw new Error(data.error || "Failed to sign in");
      }

      // Store NGO ID in localStorage
      localStorage.setItem("ngoId", data.ngoId);

      // Check profile completion status
      if (data.isProfileCompletion) {
        // If profile is complete, redirect to the NGO dashboard
        navigate("/ngo-dashboard");
      } else {
        // If profile is incomplete, store additional NGO data and redirect to the profile completion page
        const ngoData = {
          email: data.email,
          name: data.name,
          registrationNumber: data.registrationNumber,
          foundedDate: data.foundedDate,
        };

        // Overwrite the previous data in localStorage
        localStorage.setItem("ngoData", JSON.stringify(ngoData));

        // Redirect to the profile completion page
        navigate("/profile-completion");
      }
    } catch (err) {
      setError(err.message); // Show the error message if any
    } finally {
      setIsLoading(false); // Hide loading screen after request is complete
    }
  };

  const SignUpForm = () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      registrationNumber: "",
      foundedDate: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSignUp = async () => {
      try {
        setIsLoading(true); // Show loading screen
        setError(""); // Reset error message
        setSuccess(""); // Reset success message

        // Validate required fields
        if (
          !formData.name ||
          !formData.email ||
          !formData.password ||
          !formData.registrationNumber ||
          !formData.foundedDate
        ) {
          setError("All fields are required.");
          return;
        }

        // Make a POST request to the backend
        const response = await fetch(
          "http://localhost:5000/api/ngos/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to register NGO");
        }

        // Save ngoId to localStorage for future use
        console.log(data.ngoData);
        localStorage.setItem("ngoId", data.ngoId);
        localStorage.setItem("ngoData", JSON.stringify(data.ngoData));

        setSuccess("NGO registered successfully!");
        setFormData({
          name: "",
          email: "",
          password: "",
          registrationNumber: "",
          foundedDate: "",
        });

        // Redirect to profile-completion, passing ngoId via localStorage or query param
        setTimeout(() => navigate(`/profile-completion`), 1500);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false); // Hide loading screen after request is complete
      }
    };

    return (
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs">
        <h2 className="text-xl font-bold text-center text-[#225738] mb-4">
          Sign Up
        </h2>
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mb-3">{success}</p>
        )}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-[#225738]"
          placeholder="Full Name"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-[#225738]"
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-[#225738]"
          placeholder="Password"
        />
        <input
          type="text"
          name="registrationNumber"
          value={formData.registrationNumber}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-[#225738]"
          placeholder="Registration Number (NGO)"
        />
        <input
          type="date"
          name="foundedDate"
          value={formData.foundedDate}
          onChange={handleChange}
          className="border border-gray-300 rounded-md p-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-[#225738]"
        />
        <button
          onClick={handleSignUp}
          className="bg-[#225738] text-white font-semibold rounded-md py-2 w-full hover:bg-[#258e66] transition"
        >
          Sign Up
        </button>
      </div>
    );
  };

  const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    return (
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs">
        <h2 className="text-xl font-bold text-center text-[#225738] mb-4">
          Sign in
        </h2>
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mb-3">{success}</p>
        )}
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
          onClick={() => handleLogin(email, password, setError)} // Pass setError to handleLogin
        >
          Sign In
        </button>
        <p className="text-center text-black mt-3 cursor-pointer hover:text-[#258e66] transition">
          Forgot your password?
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 relative">
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
          {isLogin ? <LoginForm /> : <SignUpForm />}
          <div className="absolute bottom-6 text-center w-full">
            <button
              className="text-[#225738] font-semibold"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin
                ? "Don't have an account? Sign Up"
                : "Already have an account? Sign In"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
