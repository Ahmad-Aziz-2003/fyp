import React, { useState } from "react";
import sudhaar from "../LandingAssets/Initiatives/Sudhaar.png";
import gyaan from "../LandingAssets/Initiatives/Gyaan.png";
import nirmaan from "../LandingAssets/Initiatives/Nirmaan.png";
import gogreen from "../LandingAssets/Initiatives/Go-Green.png";
import muskaan from "../LandingAssets/Initiatives/Muskaan.png";

const Initiatives = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const initiatives = [
    { id: 1, image: sudhaar, title: "Sudhaar" },
    { id: 2, image: gyaan, title: "Gyaan" },
    { id: 3, image: nirmaan, title: "Nirmaan" },
    { id: 4, image: gogreen, title: "Go Green" },
    { id: 5, image: muskaan, title: "Muskaan" },
  ];

  const onRight = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % initiatives.length);
  };

  const onLeft = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + initiatives.length) % initiatives.length
    );
  };

  return (
    <div className="bg-gradient-to-r from-[#133710] via-[#043d3acc] to-[#133710] py-10">
      <div className="text-center mb-8">
        <h1 className="font-bold text-5xl md:text-6xl text-gray-300">
          <span className="text-yellow-500">OUR</span> REGISTERED NGOS
        </h1>
      </div>
      <div className="flex justify-center items-center">
        <svg
          onClick={onLeft}
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="currentColor"
          className="text-yellow-500 hover:text-gray-300 transition-transform transform hover:scale-110 cursor-pointer"
          viewBox="0 0 16 16"
        >
          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
        </svg>
        <div className="w-4/5 mx-4 text-center">
          <img
            src={initiatives[currentIndex].image}
            alt={initiatives[currentIndex].title}
            className="w-full h-auto rounded-lg"
          />
          {/* <h2 className="text-white text-xl mt-4">
            {initiatives[currentIndex].title}
          </h2> */}
        </div>
        <svg
          onClick={onRight}
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="currentColor"
          className="text-yellow-500 hover:text-gray-300 transition-transform transform hover:scale-110 cursor-pointer"
          viewBox="0 0 16 16"
        >
          <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
        </svg>
      </div>
    </div>
  );
};

export default Initiatives;
