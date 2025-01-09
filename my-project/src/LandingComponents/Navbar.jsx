import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [auth, setAuth] = useState("");
  const path = useLocation().pathname;
  const navigate = useNavigate();

  // Function to scroll to the bottom of the page
  const handleClick = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  // Add and remove event listeners using useEffect
  useEffect(() => {
    const handleScroll = () => {
      console.log("User is scrolling");
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <div className="navbar flex items-center justify-between py-6 px-6 lg:px-20 transition-all duration-500 z-50 bg-green-950 shadow-lg fixed top-0 w-full">
        <Link
          to="/"
          className="text-white text-3xl lg:text-4xl font-bold uppercase tracking-wide"
        >
          DAST-E-KHAIR
        </Link>
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <span className="text-2xl">\u2630</span>
        </button>
        <div
          className={`${
            dropdownOpen ? "block" : "hidden"
          } lg:flex lg:items-center lg:space-x-20`}
        >
          <Link
            to="/"
            className={`text-white hover:text-yellow-500 text-xl transition-all duration-300 ${
              path === "/" ? "text-white" : ""
            }`}
          >
            Home
          </Link>
          <Link
            to="/"
            onClick={handleClick}
            className={`text-white hover:text-yellow-500 text-xl transition-all duration-300 ${
              path === "/" ? "text-white" : ""
            }`}
          >
            About
          </Link>
          <Link
            to="/"
            onClick={handleClick}
            className={`text-white hover:text-yellow-500 text-xl transition-all duration-300 ${
              path === "/" ? "text-white" : ""
            }`}
          >
            Contact Us
          </Link>
          <Link
            to="/login"
            className={`text-white hover:text-yellow-500 text-xl transition-all duration-300 ${
              path === "/" ? "text-white" : ""
            }`}
          >
            Sign In
          </Link>
        </div>
      </div>
    </>
  );
}
