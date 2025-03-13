import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import donationbg from "../assets/asd.jpg";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle login request
  const handleLogin = async (email, password, setError) => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:5000/api/ngos/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to sign in");

      localStorage.setItem("ngoId", data.ngoId);

      if (data.isProfileCompletion) {
        navigate("/ngo-dashboard");
      } else {
        const ngoData = {
          email: data.email,
          name: data.name,
          registrationNumber: data.registrationNumber,
          foundedDate: data.foundedDate,
        };
        localStorage.setItem("ngoData", JSON.stringify(ngoData));
        navigate("/profile-completion");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Forgot Password form
  const ForgotPasswordForm = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleForgotPassword = async () => {
      try {
        setError("");
        if (!email) {
          setError("Please enter your email address.");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/ngos/forgot-password",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
          }
        );

        const data = await response.json();

        if (!response.ok) throw new Error(data.message || "Failed to send email.");

        setSuccess(true);
      } catch (err) {
        setError(err.message);
      }
    };

    return (
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs">
        <h2 className="text-xl font-bold text-center text-[#225738] mb-4">
          Forgot Password
        </h2>
        {error && <p className="text-red-500 text-center mb-3">{error}</p>}
        {success ? (
          <div className="text-center">
            <p className="text-green-500 mb-4">
              A reset email has been sent to your email address. Please check your inbox to reset your password.
            </p>
            <button
              onClick={() => {
                setIsForgotPassword(false);
                setIsLogin(true);
              }}
              className="bg-[#225738] text-white font-semibold rounded-md py-2 w-full hover:bg-[#258e66] transition"
            >
              OK
            </button>
          </div>
        ) : (
          <>
            <input
              type="email"
              className="border border-gray-300 rounded-md p-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-[#225738]"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="bg-[#225738] text-white font-semibold rounded-md py-2 w-full hover:bg-[#258e66] transition"
              onClick={handleForgotPassword}
            >
              Send Reset Email
            </button>
          </>
        )}
      </div>
    );
  };

  // Login form
  const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    return (
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xs">
        <h2 className="text-xl font-bold text-center text-[#225738] mb-4">
          Sign In
        </h2>
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
          onClick={() => handleLogin(email, password, setError)}
        >
          Sign In
        </button>
        <p
          className="text-center text-black mt-3 cursor-pointer hover:text-[#258e66] transition"
          onClick={() => {
            setIsForgotPassword(true);
            setIsLogin(false);
          }}
        >
          Forgot your password?
        </p>
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
          {isForgotPassword ? (
            <ForgotPasswordForm />
          ) : isLogin ? (
            <LoginForm />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
