import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
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

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 5000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 space-y-10">
      {/* NGO Profile */}
      <section className="mt-16 ml-[39rem] w-full max-w-6xl flex items-center space-x-8">
        <img
          src={ngoData.profilePhoto}
          alt="NGO Profile"
          className="w-44 h-44 rounded-full object-cover border-4 border-blue-500"
        />
        <div className="flex flex-col space-y-2">
          <h1 className="text-4xl font-bold text-blue-800">{ngoData.name}</h1>
          <p className="text-gray-600 text-lg">
            Registration #: {ngoData.registrationNumber}
          </p>
          <p className="text-gray-500">Founded: {ngoData.foundedDate}</p>
          <p className="text-gray-500 mt-1">Email: {ngoData.email}</p>
        </div>
      </section>

      {/* Public Message */}
      <section className="w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-blue-700 text-center mb-4">
          Public Message
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed text-center bg-blue-100 py-4 px-6 rounded-lg shadow-md">
          {ngoData.publicMessage}
        </p>
      </section>

      {/* Description */}
      <section className="w-full max-w-4xl">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          About Us
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed text-center">
          {ngoData.description}
        </p>
      </section>

      {/* Address and Contact */}
      <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Address</h3>
          <p className="text-gray-600">
            {ngoData.address.officeLocation || "Office Location N/A"},{" "}
            {ngoData.address.city}, {ngoData.address.state},{" "}
            {ngoData.address.country} - {ngoData.address.zipCode}
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Contact</h3>
          <p className="text-gray-600">
            Phone: {ngoData.contact.phone || "N/A"} <br />
            Email: {ngoData.contact.email || "N/A"}
          </p>
        </div>
      </section>

      {/* Categories of Work */}
      <section className="w-full max-w-6xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Categories of Work
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {ngoData.categories.length > 0 ? (
            ngoData.categories.map((category, index) => (
              <div
                key={index}
                className="p-4 bg-blue-100 text-center rounded-lg shadow-md text-blue-800 font-semibold"
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
      <section className="w-full max-w-6xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Our Campaigns
        </h2>
        <Slider {...sliderSettings}>
          {campaigns.map((campaign) => (
            <div
              key={campaign.campaignId}
              className="p-4 bg-gray-50 border rounded-lg shadow-md mx-2"
            >
              {campaign.imageUrls && campaign.imageUrls[0] && (
                <img
                  src={campaign.imageUrls[0]}
                  alt={campaign.title}
                  className="w-full h-40 object-cover rounded-lg mb-4 pt-2"
                />
              )}
              <h3 className="text-lg font-semibold text-gray-800 text-center">
                {campaign.title}
              </h3>
            </div>
          ))}
        </Slider>
      </section>

      {/* Goodness Posts Section */}
      <section className="w-full max-w-6xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Goodness Posts
        </h2>
        <Slider {...sliderSettings}>
          {goodnessPosts.map((post) => (
            <div
              key={post.goodnessId}
              className="p-4 bg-gray-50 border rounded-lg shadow-md mx-2"
            >
              {post.imageUrls && post.imageUrls[0] && (
                <img
                  src={post.imageUrls[0]}
                  alt={post.title}
                  className="w-full h-40 object-cover rounded-lg mb-4 pt-2"
                />
              )}
              <h3 className="text-lg font-semibold text-gray-800 text-center">
                {post.title}
              </h3>
            </div>
          ))}
        </Slider>
      </section>
    </div>
  );
};

export default Home;
