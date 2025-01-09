export default function Footer() {
  return (
    <div className="bg-green-950 text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-10">
        {/* Contact Section (Left Side) */}
        <div className="text-left ml-16">
          <h2 className="text-yellow-500 text-xl font-bold mb-4 ml-2">
            Contact Us
          </h2>
          <div className="space-y-2">
            <p className="flex items-center hover:text-yellow-500 text-lg transition-all duration-300">
              <span className="material-icons text-yellow-500 mr-2">
                location_on
              </span>
              Faisal Town, Lahore, Pakistan
            </p>
            <p className="flex items-center hover:text-yellow-500 text-lg transition-all duration-300">
              <span className="material-icons text-yellow-500 mr-2">phone</span>
              +923097785431
            </p>
            <p className="flex items-center hover:text-yellow-500 text-lg transition-all duration-300">
              <span className="material-icons text-yellow-500 mr-2">email</span>
              ahmedakram6404@gmail.com
            </p>
          </div>
          {/* Social Icons Section */}
          <div className="flex space-x-4 mt-4">
            <a
              className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-500"
              href="#"
            >
              <span className="material-icons text-white">location_on</span>
            </a>
            <a
              className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-500"
              href="#"
            >
              <span className="material-icons text-white">phone</span>
            </a>
            <a
              className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-500"
              href="#"
            >
              <span className="material-icons text-white">email</span>
            </a>
          </div>
        </div>

        {/* Popular Links Section (Middle) */}
        <div className="text-left ml-36">
          <h2 className="text-yellow-500 text-xl font-bold mb-4">
            Popular Links
          </h2>
          <ul className="space-y-2">
            <li className="hover:text-yellow-500 text-lg transition-all duration-300">
              <a href="#">About Us</a>
            </li>
            <li className="hover:text-yellow-500 text-lg transition-all duration-300">
              <a href="#">Contact Us</a>
            </li>
            <li className="hover:text-yellow-500 text-lg transition-all duration-300">
              <a href="#">Popular Causes</a>
            </li>
            <li className="hover:text-yellow-500 text-lg transition-all duration-300">
              <a href="#">Upcoming Events</a>
            </li>
            <li className="hover:text-yellow-500 text-lg transition-all duration-300">
              <a href="#">Latest Blog</a>
            </li>
          </ul>
        </div>

        {/* Useful Links Section (Right Side) */}
        <div className="text-left ml-40">
          <h2 className="text-yellow-500 text-xl font-bold mb-4">
            Useful Links
          </h2>
          <ul className="space-y-2">
            <li className="hover:text-yellow-500 text-lg transition-all duration-300">
              <a href="#">Terms of Use</a>
            </li>
            <li className="hover:text-yellow-500 text-lg transition-all duration-300">
              <a href="#">Privacy Policy</a>
            </li>
            <li className="hover:text-yellow-500 text-lg transition-all duration-300">
              <a href="#">Cookies</a>
            </li>
            <li className="hover:text-yellow-500 text-lg transition-all duration-300">
              <a href="#">Help</a>
            </li>
            <li className="hover:text-yellow-500 text-lg transition-all duration-300">
              <a href="#">FAQs</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-6 mt-6 px-10">
        <p className="text-gray-400 text-left ml-16">
          &copy;{" "}
          <a href="#" className="text-yellow-500">
            DAST-E-KHAIR
          </a>{" "}
          | 2024, All Rights Reserved.
        </p>
        <p className="text-gray-400 text-right mt-4 md:mt-0 mr-6">
          Designed By{" "}
          <a
            href="https://www.linkedin.com/in/bhavesh-patil-92b7aa22a"
            className="text-yellow-500"
          >
            FAST NUCES, Lahore, Pakistan
          </a>
        </p>
      </div>
    </div>
  );
}
