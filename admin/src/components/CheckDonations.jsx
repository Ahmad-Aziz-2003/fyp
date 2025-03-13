// import React, { useEffect, useState } from "react";
// import "tailwindcss/tailwind.css"; // Ensure Tailwind is available

// const CheckDonations = () => {
//   const [donations, setDonations] = useState([]);

//   useEffect(() => {
//     // Simulated API call to fetch donations
//     fetch("http://localhost:5000/api/donations")
//       .then((response) => response.json())
//       .then((data) => setDonations(data))
//       .catch((error) => console.error("Error fetching donations:", error));
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-6">
//       <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
//         Donations
//       </h1>

//       <div className="overflow-x-auto shadow-lg rounded-lg">
//         <table className="min-w-full bg-white border-collapse border border-gray-200">
//           <thead className="bg-blue-800 text-white">
//             <tr>
//               <th className="py-4 px-6 text-left text-sm font-bold">
//                 Name of Donor
//               </th>
//               <th className="py-4 px-6 text-left text-sm font-bold">Email</th>
//               <th className="py-4 px-6 text-left text-sm font-bold">
//                 Transaction ID
//               </th>
//               <th className="py-4 px-6 text-left text-sm font-bold">Amount</th>
//               <th className="py-4 px-6 text-left text-sm font-bold">Date</th>
//               <th className="py-4 px-6 text-left text-sm font-bold">Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {donations.length > 0 ? (
//               donations.map((donation, index) => (
//                 <tr
//                   key={index}
//                   className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
//                 >
//                   <td className="py-4 px-6 text-gray-800 text-sm">
//                     {donation.name}
//                   </td>
//                   <td className="py-4 px-6 text-gray-800 text-sm">
//                     {donation.email}
//                   </td>
//                   <td className="py-4 px-6 text-gray-800 text-sm">
//                     {donation.transactionId}
//                   </td>
//                   <td className="py-4 px-6 text-gray-800 text-sm">
//                     ${donation.amount}
//                   </td>
//                   <td className="py-4 px-6 text-gray-800 text-sm">
//                     {new Date(donation.date).toLocaleDateString()}
//                   </td>
//                   <td className="py-4 px-6 text-gray-800 text-sm">
//                     {new Date(donation.date).toLocaleTimeString()}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan="6"
//                   className="py-6 px-6 text-center text-gray-500 text-sm"
//                 >
//                   No donations found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default CheckDonations;

import React from "react";

const CheckDonations = () => {
  // Sample data for 20 donors
  const donations = [
    {
      name: "Ahmed Akram",
      email: "ahmedakram@gmail.com",
      transactionId: "TXN001",
      amount: 25000,
      date: "2025-01-06T10:30:00",
    },
    {
      name: "Ahmad Aziz",
      email: "ahmadaziz@gmail.com",
      transactionId: "TXN002",
      amount: 15000,
      date: "2025-01-06T11:00:00",
    },
    {
      name: "Arslan Kashif",
      email: "arslankashif@yahoo.com",
      transactionId: "TXN003",
      amount: 5000,
      date: "2025-01-06T12:15:00",
    },
    {
      name: "Ali Raza",
      email: "aliraza@gmail.com",
      transactionId: "TXN004",
      amount: 25000,
      date: "2025-01-06T14:20:00",
    },
    {
      name: "Fatima Zahra",
      email: "fatimazahra@yahoo.com",
      transactionId: "TXN005",
      amount: 30000,
      date: "2025-01-06T15:45:00",
    },
    {
      name: "Usman Tariq",
      email: "usmantariq@hotmail.com",
      transactionId: "TXN006",
      amount: 4000,
      date: "2025-01-06T16:30:00",
    },
    {
      name: "Ayesha Khan",
      email: "ayeshakhan@gmail.com",
      transactionId: "TXN007",
      amount: 3500,
      date: "2025-01-06T18:10:00",
    },
    {
      name: "Hassan Javed",
      email: "hassanjaved@gmail.com",
      transactionId: "TXN008",
      amount: 45000,
      date: "2025-01-06T19:00:00",
    },
    {
      name: "Zainab Ali",
      email: "zainabali@yahoo.com",
      transactionId: "TXN009",
      amount: 500,
      date: "2025-01-06T20:15:00",
    },
    {
      name: "Sana Yusuf",
      email: "sanayusuf@gmail.com",
      transactionId: "TXN010",
      amount: 6000,
      date: "2025-01-06T21:45:00",
    },
    {
      name: "Hamza Saeed",
      email: "hamzasaeed@gmail.com",
      transactionId: "TXN011",
      amount: 7000,
      date: "2025-01-06T22:30:00",
    },
    {
      name: "Ahmed Akram",
      email: "ahmedakram@gmail.com",
      transactionId: "TXN001",
      amount: 25000,
      date: "2025-01-06T10:30:00",
    },
    {
      name: "Ahmad Aziz",
      email: "ahmadaziz@gmail.com",
      transactionId: "TXN002",
      amount: 15000,
      date: "2025-01-06T11:00:00",
    },
    {
      name: "Arslan Kashif",
      email: "arslankashif@yahoo.com",
      transactionId: "TXN003",
      amount: 5000,
      date: "2025-01-06T12:15:00",
    },
    {
      name: "Ali Raza",
      email: "aliraza@gmail.com",
      transactionId: "TXN004",
      amount: 25000,
      date: "2025-01-06T14:20:00",
    },
    {
      name: "Fatima Zahra",
      email: "fatimazahra@yahoo.com",
      transactionId: "TXN005",
      amount: 30000,
      date: "2025-01-06T15:45:00",
    },
    {
      name: "Usman Tariq",
      email: "usmantariq@hotmail.com",
      transactionId: "TXN006",
      amount: 4000,
      date: "2025-01-06T16:30:00",
    },
    {
      name: "Ayesha Khan",
      email: "ayeshakhan@gmail.com",
      transactionId: "TXN007",
      amount: 3500,
      date: "2025-01-06T18:10:00",
    },
    {
      name: "Hassan Javed",
      email: "hassanjaved@gmail.com",
      transactionId: "TXN008",
      amount: 45000,
      date: "2025-01-06T19:00:00",
    },
    {
      name: "Zainab Ali",
      email: "zainabali@yahoo.com",
      transactionId: "TXN009",
      amount: 500,
      date: "2025-01-06T20:15:00",
    },
    {
      name: "Sana Yusuf",
      email: "sanayusuf@gmail.com",
      transactionId: "TXN010",
      amount: 6000,
      date: "2025-01-06T21:45:00",
    },
    {
      name: "Hamza Saeed",
      email: "hamzasaeed@gmail.com",
      transactionId: "TXN011",
      amount: 7000,
      date: "2025-01-06T22:30:00",
    },
  ];

  return (
    <div className="min-h-screen py-10 px-6 mt-20">
      <h1 className="text-4xl font-bold text-center text-[#225738] mb-8">
        Donations
      </h1>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border-collapse border border-gray-200">
          <thead className="bg-[#225738] text-white">
            <tr>
              <th className="py-4 px-6 text-left text-base font-bold">
                Name of Donor
              </th>
              <th className="py-4 px-6 text-left text-base font-bold">Email</th>
              <th className="py-4 px-6 text-left text-base font-bold">
                Transaction ID
              </th>
              <th className="py-4 px-6 text-left text-base font-bold">
                Amount
              </th>
              <th className="py-4 px-6 text-left text-base font-bold">Date</th>
              <th className="py-4 px-6 text-left text-base font-bold">Time</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="py-4 px-6 text-gray-800 text-sm">
                  {donation.name}
                </td>
                <td className="py-4 px-6 text-gray-800 text-sm">
                  {donation.email}
                </td>
                <td className="py-4 px-6 text-gray-800 text-sm">
                  {donation.transactionId}
                </td>
                <td className="py-4 px-6 text-gray-800 text-sm">
                  Rs. {donation.amount}
                </td>
                <td className="py-4 px-6 text-gray-800 text-sm">
                  {new Date(donation.date).toLocaleDateString()}
                </td>
                <td className="py-4 px-6 text-gray-800 text-sm">
                  {new Date(donation.date).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CheckDonations;
