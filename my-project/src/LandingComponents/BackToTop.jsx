import React, { useEffect, useState } from "react";

export default function BackToTop() {
  // State to track the visibility of the button
  const [visible, setVisible] = useState(false);

  // Function to handle window scroll event
  const handleScroll = () => {
    // Show the button if the scroll position is greater than 200px
    if (window.scrollY > 200) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  // Function to scroll to the top of the page
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Add and remove event listeners using useEffect
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    // Render the button with conditional visibility
    <button
      className={`fixed bg-yellow-500 bg-opacity-70 text-lg rounded-full w-11 h-11 flex items-center justify-center transition duration-500 ease-in-out hover:bg-yellow-500 hover:text-blue-900 right-4 bottom-4 z-10 ${
        visible ? "block" : "hidden"
      }`}
      onClick={handleClick}
    >
      <span className="material-icons text-blue-900">keyboard_arrow_up</span>
    </button>
  );
}
