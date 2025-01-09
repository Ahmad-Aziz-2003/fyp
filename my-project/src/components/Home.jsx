import React, { useState, useEffect } from "react";
import ngoImage from "../assets/ngoImage.webp";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [ngoData, setNgoData] = useState({
    name: "",
    email: "",
    registrationNumber: "",
    profilePhoto: "",
    description: "",
    publicMessage: "",
    foundedDate: "",
    address: {},
    contact: {},
    categories: [],
  });

  const [campaigns, setCampaigns] = useState([]);
  const [goodnessPosts, setGoodnessPosts] = useState([]);
  const [currentCampaignIndex, setCurrentCampaignIndex] = useState(0);
  const [currentGoodnessIndex, setCurrentGoodnessIndex] = useState(0);
  const ngoId = localStorage.getItem("ngoId");

  useEffect(() => {
    fetch(`http://localhost:5000/api/ngos/ngoinfo/${ngoId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.ngoData) {
          const parsedAddress = JSON.parse(data.ngoData.address || "{}");
          const parsedContact = JSON.parse(data.ngoData.contact || "{}");
          setNgoData({
            ...data.ngoData,
            address: parsedAddress,
            contact: parsedContact,
          });
        }
      })
      .catch((error) => console.error("Error fetching NGO data:", error));

    fetch(`http://localhost:5000/api/campaigns/All-Campaigns/${ngoId}`)
      .then((response) => response.json())
      .then((data) => {
        const campaignList = Object.keys(data).map((key) => ({
          campaignId: key,
          ...data[key],
        }));
        setCampaigns(campaignList);
      })
      .catch((error) => console.error("Error fetching campaigns:", error));

    fetch(`http://localhost:5000/api/goodness/Allgoodness/${ngoId}`)
      .then((response) => response.json())
      .then((data) => {
        const goodnessList = Object.keys(data).map((key) => ({
          goodnessId: key,
          ...data[key],
        }));
        setGoodnessPosts(goodnessList);
      })
      .catch((error) => console.error("Error fetching goodness posts:", error));
  }, [ngoId]);

  const showNext = (index, length) => {
    return (index + 1) % length;
  };

  const showPrevious = (index, length) => {
    return (index - 1 + length) % length;
  };

  const getVisibleItems = (items, currentIndex) => {
    if (items.length <= 3) {
      return items;
    }
    const visibleItems = [];
    for (let i = 0; i < 3; i++) {
      visibleItems.push(items[(currentIndex + i) % items.length]);
    }
    return visibleItems;
  };

  const handleCampaigns = () => {
    navigate("/ngo-dashboard/editCampaign");
  };

  const handleGoodness = () => {
    navigate("/ngo-dashboard/editGoodness");
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10 mt-10 overflow-hidden">
      {/* NGO Profile */}
      <section className="mt-16 mx-auto w-full max-w-6xl flex items-center space-x-8 px-4 ml-80">
        <img
          src={ngoData.profilePhoto || ngoImage}
          alt="NGO Profile"
          className="w-44 h-44 rounded-full object-cover border-4 border-[#225738]"
        />
        <div className="flex flex-col space-y-2">
          <h1 className="text-4xl font-bold text-[#225738]">{ngoData.name}</h1>
          <p className="text-gray-600 text-lg">
            Registration #: {ngoData.registrationNumber}
          </p>
          <p className="text-gray-500">Founded: {ngoData.foundedDate}</p>
          <p className="text-gray-500 mt-1">Email: {ngoData.email}</p>
        </div>
      </section>

      {/* Public Message */}
      <section className="w-full max-w-4xl px-4">
        <h2 className="text-2xl font-semibold text-[#225738] text-center mb-4 mt-6">
          Public Message
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed text-center bg-green-100 py-4 px-6 rounded-lg shadow-md">
          {ngoData.publicMessage}
        </p>
      </section>

      {/* Description */}
      <section className="w-full max-w-4xl mt-8 px-4">
        <h2 className="text-2xl font-bold text-[#225738] text-center mb-4">
          About Us
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed text-center">
          {ngoData.description}
        </p>
      </section>

      {/* Address and Contact */}
      <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 px-4">
        <div className="text-center">
          <h3 className="text-xl font-bold text-[#225738] mb-2">Address</h3>
          <p className="text-gray-600">
            {ngoData.address.officeLocation || "Office Location N/A"},{" "}
            {ngoData.address.city}, {ngoData.address.state},{" "}
            {ngoData.address.country} - {ngoData.address.zipCode}
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold text-[#225738] mb-2">Contact</h3>
          <p className="text-gray-600">
            Phone: {ngoData.contact.phone || "N/A"} <br />
            Email: {ngoData.contact.email || "N/A"}
          </p>
        </div>
      </section>

      {/* Categories of Work */}
      <section className="w-full max-w-6xl mt-16 px-4">
        <h2 className="text-2xl font-bold text-[#225738] mb-4 text-center">
          Categories of Work
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {ngoData.categories.length > 0 ? (
            ngoData.categories.map((category, index) => (
              <div
                key={index}
                className="p-4 bg-green-100 text-center rounded-lg shadow-md text-[#225738] font-semibold"
              >
                {category}
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full">
              No categories available
            </p>
          )}
        </div>
      </section>

      {/* Campaigns Section */}
      <div className="w-full max-w-6xl p-6 bg-white rounded-lg mb-8 mt-20 overflow-hidden">
        <h2 className="text-3xl text-center font-bold text-[#225738] mb-8">
          Our Campaigns
        </h2>
        {campaigns.length === 0 ? (
          <p className="text-gray-600">No campaigns available</p>
        ) : (
          <div className="flex items-center">
            {campaigns.length > 3 && (
              <button
                onClick={() =>
                  setCurrentCampaignIndex((prev) =>
                    showPrevious(prev, campaigns.length)
                  )
                }
                className="p-2 bg-green-200 rounded-full hover:bg-green-600"
              >
                &lt;
              </button>
            )}
            <div className="flex flex-grow justify-evenly">
              {getVisibleItems(campaigns, currentCampaignIndex).map(
                (campaign) => (
                  <div
                    key={campaign.campaignId}
                    className="p-4 bg-green-50 rounded-lg shadow-md flex flex-col items-center justify-center mx-2 cursor-pointer"
                    onClick={handleCampaigns}
                  >
                    {campaign.imageUrls && campaign.imageUrls[0] && (
                      <img
                        src={campaign.imageUrls[0]}
                        alt={campaign.title}
                        className="w-64 h-40 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {campaign.title}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      <strong>Target:</strong> {campaign.targetAmount}
                    </p>
                    <p className="text-gray-500 text-sm">
                      <strong>End Date:</strong>{" "}
                      {new Date(campaign.endDate).toLocaleDateString()}
                    </p>
                  </div>
                )
              )}
            </div>
            {campaigns.length > 3 && (
              <button
                onClick={() =>
                  setCurrentCampaignIndex((prev) =>
                    showNext(prev, campaigns.length)
                  )
                }
                className="p-2 bg-green-200 rounded-full hover:bg-green-600"
              >
                &gt;
              </button>
            )}
          </div>
        )}
      </div>

      {/* Goodness Posts Section */}
      <div className="w-full max-w-6xl p-6 bg-white overflow-hidden">
        <h2 className="text-3xl text-center font-bold text-[#225738] mb-8">
          Goodness Posts
        </h2>
        {goodnessPosts.length === 0 ? (
          <p className="text-gray-600">No goodness posts available</p>
        ) : (
          <div className="flex items-center">
            {goodnessPosts.length > 3 && (
              <button
                onClick={() =>
                  setCurrentGoodnessIndex((prev) =>
                    showPrevious(prev, goodnessPosts.length)
                  )
                }
                className="p-2 bg-green-200 rounded-full hover:bg-green-600"
              >
                &lt;
              </button>
            )}
            <div className="flex flex-grow justify-evenly">
              {getVisibleItems(goodnessPosts, currentGoodnessIndex).map(
                (post) => (
                  <div
                    key={post.goodnessId}
                    className="p-4 bg-green-50 rounded-lg shadow-md flex flex-col items-center justify-center mx-2 cursor-pointer"
                    onClick={handleGoodness}
                  >
                    {post.imageUrls && post.imageUrls[0] && (
                      <img
                        src={post.imageUrls[0]}
                        alt={post.title}
                        className="w-64 h-40 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      <strong>Created At:</strong>{" "}
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                )
              )}
            </div>
            {goodnessPosts.length > 3 && (
              <button
                onClick={() =>
                  setCurrentGoodnessIndex((prev) =>
                    showNext(prev, goodnessPosts.length)
                  )
                }
                className="p-2 bg-green-200 rounded-full hover:bg-green-600"
              >
                &gt;
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

// import React, { useState, useEffect } from "react";
// import ngoImage from "../assets/ngoImage.webp"; // Placeholder Image
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const Home = () => {
//   const [ngoData, setNgoData] = useState({
//     name: "",
//     email: "",
//     registrationNumber: "",
//     profilePhoto: "",
//     description: "",
//     address: {},
//     contact: {},
//     categories: [],
//   });

//   const [campaigns, setCampaigns] = useState([]);
//   const [goodnessPosts, setGoodnessPosts] = useState([]);
//   const ngoId = localStorage.getItem("ngoId"); // Get the logged-in NGO's ID

//   useEffect(() => {
//     // Fetch NGO Data using the provided API
//     fetch(`http://localhost:5000/api/ngos/ngoinfo/${ngoId}`) // Update API URL
//       .then((response) => response.json())
//       .then((data) => {
//         if (data && data.ngoData) {
//           setNgoData(data.ngoData);
//         }
//       })
//       .catch((error) => console.error("Error fetching NGO data:", error));

//     // Fetch Campaigns Data
//     fetch(`http://localhost:5000/api/campaigns/All-Campaigns/${ngoId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         const campaignList = Object.keys(data).map((key) => ({
//           campaignId: key,
//           ...data[key],
//         }));
//         setCampaigns(campaignList);
//       })
//       .catch((error) => console.error("Error fetching campaigns:", error));

//     // Fetch Goodness Posts
//     fetch(`http://localhost:5000/api/goodness/Allgoodness/${ngoId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         const goodnessList = Object.keys(data).map((key) => ({
//           goodnessId: key,
//           ...data[key],
//         }));
//         setGoodnessPosts(goodnessList);
//       })
//       .catch((error) => console.error("Error fetching goodness posts:", error));
//   }, [ngoId]);

//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 5000,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     cssEase: "linear",
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 mt-20">
//       {/* Complete NGO Profile */}
//       <div className="w-full max-w-5xl p-6 bg-white shadow-lg rounded-lg mb-8">
//         <div className="flex items-center gap-4 mb-8">
//           <img
//             src={ngoData.profilePhoto || ngoImage} // Use the fetched photo or fallback image
//             alt="NGO Profile"
//             className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
//           />
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">{ngoData.name}</h1>
//             <p className="text-gray-600 text-lg">
//               Registration #: {ngoData.registrationNumber}
//             </p>
//             <p className="text-gray-500 mt-1">Email: {ngoData.email}</p>
//           </div>
//         </div>

//         {/* Description */}
//         <div className="mb-6">
//           <h2 className="text-xl font-semibold text-gray-800">Description</h2>
//           <p className="text-gray-600 mt-2 leading-relaxed">
//             {ngoData.description}
//           </p>
//         </div>

//         {/* Address */}
//         <div className="mb-6">
//           <h2 className="text-xl font-semibold text-gray-800">Address</h2>
//           <p className="text-gray-600">
//             {ngoData.address.officeLocation}, {ngoData.address.city},{" "}
//             {ngoData.address.state}, {ngoData.address.country} -{" "}
//             {ngoData.address.zipCode}
//           </p>
//         </div>

//         {/* Contact */}
//         <div className="mb-6">
//           <h2 className="text-xl font-semibold text-gray-800">Contact</h2>
//           <p className="text-gray-600">
//             Phone: {ngoData.contact.phone || "N/A"}
//             <br />
//             Email: {ngoData.contact.email || "N/A"}
//           </p>
//         </div>

//         {/* Categories */}
//         <div className="mb-6">
//           <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
//           <p className="text-gray-600">
//             {ngoData.categories.length > 0
//               ? ngoData.categories.join(", ")
//               : "No categories listed."}
//           </p>
//         </div>
//       </div>

//       {/* Campaigns Section */}
//       <div className="w-full max-w-6xl p-6 bg-white shadow-lg rounded-lg mb-8">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Campaigns</h2>
//         <Slider {...sliderSettings}>
//           {campaigns.map((campaign) => (
//             <div
//               key={campaign.campaignId}
//               className="p-4 bg-gray-100 rounded-lg shadow-md flex flex-col items-center justify-center mx-2"
//             >
//               {campaign.imageUrls && campaign.imageUrls[0] && (
//                 <img
//                   src={campaign.imageUrls[0]}
//                   alt={campaign.title}
//                   className="w-64 h-40 object-cover rounded-lg mb-4"
//                 />
//               )}
//               <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                 {campaign.title}
//               </h3>
//             </div>
//           ))}
//         </Slider>
//       </div>

//       {/* Goodness Posts Section */}
//       <div className="w-full max-w-6xl p-6 bg-white shadow-lg rounded-lg">
//         <h2 className="text-2xl font-bold text-gray-800 mb-4">
//           Goodness Posts
//         </h2>
//         <Slider {...sliderSettings}>
//           {goodnessPosts.map((post) => (
//             <div
//               key={post.goodnessId}
//               className="p-4 bg-gray-100 rounded-lg shadow-md flex flex-col items-center justify-center mx-2"
//             >
//               {post.imageUrls && post.imageUrls[0] && (
//                 <img
//                   src={post.imageUrls[0]}
//                   alt={post.title}
//                   className="w-64 h-40 object-cover rounded-lg mb-4"
//                 />
//               )}
//               <h3 className="text-lg font-semibold text-gray-800 mb-2">
//                 {post.title}
//               </h3>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </div>
//   );
// };

// export default Home;
