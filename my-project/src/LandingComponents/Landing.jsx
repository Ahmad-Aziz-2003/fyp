import main from "../LandingAssets/LandImg.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Landing() {
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

  return (
    <div className="flex flex-col lg:flex-row justify-between w-full h-[600px] bg-gradient-to-r from-[#133710] via-[#043d3acc] to-[#133710]">
      {/* Left Section */}
      <div className="flex-1 p-5 lg:p-20 text-left">
        <div className="flex items-center">
          <hr className="w-[40%] border-yellow-500 mr-2 mt-20" />
          <h4 className="text-yellowgreen italic text-lg lg:text-xl mt-20">
            DAST-E-KHAIR - Platform for NGOs
          </h4>
        </div>
        <div className="max-w-[700px] ml-0 lg:ml-20 mt-10 lg:mt-20">
          <div className="mb-4">
            <p className="text-white text-2xl lg:text-4xl font-bold uppercase">
              At <span className="text-yellow-500">Dast-e-Khair,</span> we work
              towards the betterment of our{" "}
              <span className="text-yellow-500">world</span>
            </p>
          </div>
          <div className="mb-4">
            <p className="text-white text-base lg:text-xl font-light italic">
              Bring out the change in society by spreading hands to help the
              unprivileged children and other backward communities.
            </p>
          </div>
          <div className="flex space-x-4 mt-4">
            <button
              type="button"
              className="btn btn-outline-info border border-yellow-600 text-yellow-600 px-4 py-2 rounded hover:bg-yellow-600 hover:text-white transition"
              onClick={handleClick}
            >
              Know More
            </button>
            <button
              type="button"
              className="btn bg-green-700 text-white px-4 py-2 rounded hover:bg-green-500 transition"
              onClick={() => navigate("/login")}
            >
              DONATE
            </button>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-0 p-0">
        <img
          src={main}
          alt="Smiling Faces"
          className="w-[700px] h-[600px] lg:w-[100%] lg:h-[100%]"
        />
      </div>
    </div>
  );
}
