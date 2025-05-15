

// import React, { useEffect, useState } from "react";
// import { CircularProgress, Typography, Box, IconButton, Dialog, DialogTitle, DialogContent, TextField, Button } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import axios from "axios";
// import ChatIcon from "@mui/icons-material/Chat";
// import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
// import CancelIcon from "@mui/icons-material/Cancel";
// import { database } from "../../config/firebaseConfig";
// import { ref, onValue, push } from "firebase/database";

// const ItemBasedDonation = () => {
//   const [donations, setDonations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openChat, setOpenChat] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [chatDetails, setChatDetails] = useState(null);

//   useEffect(() => {
//     const fetchDonations = async () => {
//       try {
//         const storedNgoId = localStorage.getItem("ngoId");
//         if (!storedNgoId) {
//           console.error("No NGO ID found in local storage");
//           setLoading(false);
//           return;
//         }
//         const response = await axios.get(
//           `http://localhost:5000/api/donations/item-based/${storedNgoId}`
//         );
//         setDonations(response.data);
//       } catch (error) {
//         console.error("Error fetching donations:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDonations();
//   }, []);

//   const updateStatus = async (donationId) => {
//     if (!window.confirm("Are you sure you want to mark this donation as processing?")) return;
//     try {
//       await axios.post(`http://localhost:5000/api/donations/status-updation/${donationId}`);
//       window.location.reload();
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

//   const handleOpenChat = (donationId) => {
//     setChatDetails({ donationId });
//     setOpenChat(true);
//     loadMessages(donationId);
//   };

//   const loadMessages = (donationId) => {
//     const chatRef = ref(database, `Chats/${donationId}/messages`);
//     onValue(chatRef, (snapshot) => {
//       if (snapshot.exists()) {
//         setMessages(Object.values(snapshot.val()));
//       } else {
//         setMessages([]);
//       }
//     });
//   };

//   const sendMessage = () => {
//     if (!newMessage.trim()) return;
//     const chatRef = ref(database, `Chats/${chatDetails.donationId}/messages`);
//     push(chatRef, {
//       sender: "ngo",
//       text: newMessage,
//       timestamp: new Date().toISOString(),
//     });
//     setNewMessage("");
//   };

//   const columns = [
//     { field: "name", headerName: "Donor Name", flex: 1 },
//     { field: "email", headerName: "Email", flex: 1 },
//     { field: "phoneNumber", headerName: "Phone Number", flex: 1 },
//     { field: "status", headerName: "Status", flex: 1 },
//     { field: "createdAt", headerName: "Date", flex: 1 },
//     {
//       field: "actions",
//       headerName: "Actions",
//       flex: 1,
//       sortable: false,
//       renderCell: (params) => (
//         <>
//           <IconButton color="primary" title="Chat" 
//           disabled={params.row.isChat === "false"}
//           onClick={() => handleOpenChat(params.row.id)}>
//             <ChatIcon />
//           </IconButton>
//           <IconButton color="warning" title="Processing" onClick={() => updateStatus(params.row.id)}>
//             <HourglassEmptyIcon />
//           </IconButton>
//           <IconButton color="error" title="Reject">
//             <CancelIcon />
//           </IconButton>
//         </>
//       ),
//     },
//   ];

//   return (
//     <div className="mt-[5.5rem] mx-auto p-6">
//       <Box sx={{ backgroundColor: "#225738", py: 2, mb: 2 }}>
//         <Typography variant="h5" fontWeight="bold" textAlign="center" color="white">
//           Item-Based Donations Received
//         </Typography>
//       </Box>
//       {loading ? (
//         <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />
//       ) : (
//         <DataGrid
//           rows={donations.map((donation, index) => ({ id: index, ...donation }))}
//           columns={columns}
//           pageSize={5}
//           rowsPerPageOptions={[5, 10, 20]}
//           sx={{ borderRadius: 2, "& .MuiDataGrid-columnHeaders": { backgroundColor: "#225738", color: "black", fontSize: "16px", fontWeight: "bold" } }}
//         />
//       )}
//       {/* Chat Modal */}
//       <Dialog open={openChat} onClose={() => setOpenChat(false)} fullWidth>
//         <DialogTitle>Chat</DialogTitle>
//         <DialogContent>
//           <Box sx={{ maxHeight: "300px", overflowY: "auto", p: 2 }}>
//             {messages.map((msg, index) => (
//               <Typography key={index} sx={{ backgroundColor: msg.sender === "ngo" ? "#d1e7dd" : "#f8d7da", p: 1, borderRadius: 1, mb: 1 }}>
//                 {msg.text} <br />
//                 <small>{new Date(msg.timestamp).toLocaleString()}</small>
//               </Typography>
//             ))}
//           </Box>
//           <TextField fullWidth variant="outlined" value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." sx={{ mt: 2 }} />
//           <Button fullWidth variant="contained" onClick={sendMessage} sx={{ mt: 1 }}>Send</Button>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default ItemBasedDonation;




// import React, { useEffect, useState } from "react";
// import { CircularProgress, Typography, Box, IconButton, TextField, Button } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import axios from "axios";
// import ChatIcon from "@mui/icons-material/Chat";
// import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
// import CancelIcon from "@mui/icons-material/Cancel";
// import { database } from "../../config/firebaseConfig";
// import { ref, onValue, push, update } from "firebase/database";

// const ItemBasedDonation = () => {
//   const [donations, setDonations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openChat, setOpenChat] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [chatDetails, setChatDetails] = useState(null);
// const [acceptedRejectedDonations, setAcceptedRejectedDonations] = useState([]);
// const [filterStatus, setFilterStatus] = useState("Accepted"); // Default to "Accepted"


//   const fetchDonations = async () => {
//     try {
//       const storedNgoId = localStorage.getItem("ngoId");
//       if (!storedNgoId) {
//         console.error("No NGO ID found in local storage");
//         setLoading(false);
//         return;
//       }

//       const response = await axios.get(`http://localhost:5000/api/donations/item-based/${storedNgoId}`);
//       const donationList = response.data;
//      console.log(donationList);
//       const donationsWithUnreadCounts = await Promise.all(
//         donationList.map(async (donation) => {
//           const chatRef = ref(database, `Chats/${donation.id}/messages`);
//           return new Promise((resolve) => {
//             onValue(chatRef, (snapshot) => {
//               let unreadCount = 0;
//               if (snapshot.exists()) {
//                 const msgs = Object.values(snapshot.val());
//                 unreadCount = msgs.filter(
//                   (msg) => msg.sender === "user" && msg.isread ==false
//                 ).length;
//               }
//               resolve({ ...donation, id: donation.id, unreadCount });
//             }, { onlyOnce: true });
//           });
//         })
//       );

//       setDonations(donationsWithUnreadCounts);
//     } catch (error) {
//       console.error("Error fetching donations:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
   
//     fetchDonations();
//   }, []);
// console.log(donations);  
//   const updateStatus = async (donationId) => {
//     if (!window.confirm("Are you sure you want to mark this donation as processing?")) return;
//     try {
//       await axios.post(`http://localhost:5000/api/donations/status-updation/${donationId}`);
//       window.location.reload();
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

//   const handleOpenChat = (donationId) => {
//     setChatDetails({ donationId });
//     setOpenChat(true);
//     loadMessages(donationId);
//   };

//   // const loadMessages = (donationId) => {
//   //   const chatRef = ref(database, `Chats/${donationId}/messages`);
//   //   onValue(chatRef, (snapshot) => {
//   //     if (snapshot.exists()) {
//   //       setMessages(Object.values(snapshot.val()));
//   //     } else {
//   //       setMessages([]);
//   //     }
//   //   });
//   // };
//   const loadMessages = (donationId) => {
//     const chatRef = ref(database, `Chats/${donationId}/messages`);
//     onValue(chatRef, (snapshot) => {
//       if (snapshot.exists()) {
//         const msgsObj = snapshot.val();
//         const msgsArray = Object.entries(msgsObj); // Convert to entries for easy iteration
  
//         // Loop through messages to check if the user message is unread
//         msgsArray.forEach(([key, msg]) => {
//           if (msg.sender === "user" && msg.isread == false) {
//             // Update isread to true for unread user messages
//             const msgRef = ref(database, `Chats/${donationId}/messages/${key}`);
//             update(msgRef, { isread: true }).then(() => {
//               console.log(`Updated message ${key} to read`);
//             }).catch(error => {
//               console.error("Error updating isread field:", error);
//             });
//           }
//         });
  
//         // Set the messages to the state after marking user messages as read
//         setMessages(Object.values(msgsObj)); 
//       } else {
//         setMessages([]);
//       }
//     });
//   };
  
//   const sendMessage = () => {
//     if (!newMessage.trim()) return;
//     const chatRef = ref(database, `Chats/${chatDetails.donationId}/messages`);
//     push(chatRef, {
//       sender: "ngo",
//       text: newMessage,
//       timestamp: new Date().toISOString(),
//       isread:false,
//     });
//     setNewMessage("");
//   };

//   const columns = [
//     { field: "name", headerName: "Donor Name", flex: 1 },
//     { field: "email", headerName: "Email", flex: 1 },
//     { field: "phoneNumber", headerName: "Phone Number", flex: 1 },
//     { field: "status", headerName: "Status", flex: 1 },
//     { field: "createdAt", headerName: "Date", flex: 1 },
//     {
//       field: "actions",
//       headerName: "Actions",
//       flex: 1,
//       sortable: false,
//       renderCell: (params) => (
//         <>
//          <IconButton
//   color="primary"
//   title="Chat"
//   disabled={params.row.isChat === "false"}
//   onClick={() => handleOpenChat(params.row.id)}
//   style={{ position: "relative" }}
// >
//   <ChatIcon />
//   {params.row.isChat !== "false" && params.row.unreadCount > 0 && (
//     <span
//       style={{
//         position: "absolute",
//         top: 0,
//         right: 0,
//         backgroundColor: "red",
//         color: "white",
//         borderRadius: "50%",
//         padding: "2px 6px",
//         fontSize: "10px",
//       }}
//     >
//       {params.row.unreadCount}
//     </span>
//   )}
// </IconButton>

//           <IconButton color="warning" title="Processing" onClick={() => updateStatus(params.row.id)}>
//             <HourglassEmptyIcon />
//           </IconButton>
//           <IconButton color="error" title="Reject">
//             <CancelIcon />
//           </IconButton>
//         </>
//       ),
//     },
//   ];

//   return (
//     <div className="mt-[5.5rem] mx-auto p-6">
//       <Box sx={{ backgroundColor: "#225738", py: 2, mb: 2 }}>
//         <Typography variant="h5" fontWeight="bold" textAlign="center" color="white">
//           Item-Based Donations Received
//         </Typography>
//       </Box>
//       {loading ? (
//         <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />
//       ) : (
//         <DataGrid
//           rows={donations.map((donation, index) => ({ id: index, ...donation }))}
//           columns={columns}
//           pageSize={5}
//           rowsPerPageOptions={[5, 10, 20]}
//           sx={{
//             borderRadius: 2,
//             "& .MuiDataGrid-columnHeaders": {
//               backgroundColor: "#225738",
//               color: "black",
//               fontSize: "16px",
//               fontWeight: "bold",
//             },
//           }}
//         />
//       )}

//       {/* Chat Sidebar */}
//       {openChat && (
//         // <Box
//         //   sx={{
//         //     position: "fixed",
//         //     right: 0,
//         //     top: 0,
//         //     height: "100%",
//         //     width: "400px",
//         //     backgroundColor: "#fff",
//         //     boxShadow: "-4px 0 8px rgba(0, 0, 0, 0.2)",
//         //     display: "flex",
//         //     flexDirection: "column",
//         //     padding: 2,
//         //     zIndex: 10,
//         //   }}
//         // >
//                 <Box
//           sx={{
//             position: "fixed",
//             right: 0,
//             top:0,
//             marginTop:"70px",
//             height: "90%",
//             width: "400px",
//             backgroundColor: "#fff",
//             boxShadow: "-4px 0 8px rgba(0, 0, 0, 0.2)",
//             display: "flex",
//             flexDirection: "column",
//             padding: 2,
//             zIndex: 10,
//           }}
//     >
//           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//             <Typography variant="h6">Chat</Typography>
//             {/* <IconButton onClick={() => setOpenChat(false)}>
//               <CancelIcon />
//             </IconButton> */}
//             <IconButton onClick={() => {
//   setOpenChat(false);  // Close the chat
//   fetchDonations();  // Fetch donations again after closing the chat
// }}>
//   <CancelIcon />
// </IconButton>
//           </Box>
//           <Box sx={{ flex: 1, overflowY: "auto", marginBottom: 2 }}>
//             {messages.map((msg, index) => (
//               <Box
//                 key={index}
//                 sx={{
//                   display: "flex",
//                   flexDirection: msg.sender === "ngo" ? "row":"row-reverse",
//                   alignItems: "flex-start",
//                   mb: 1,
//                 }}
//               >
//                 <Box
//                   sx={{
//                     backgroundColor: msg.sender === "ngo" ? "#dcf8c6":"#d1f6ff",
//                     padding: "10px 15px",
//                     borderRadius: "10px",
//                     maxWidth: "80%",
//                     boxShadow: msg.sender === "ngo" ? "0 2px 5px rgba(0, 0, 0, 0.1)" : "0 2px 5px rgba(0, 0, 0, 0.1)",
//                   }}
//                 >
//                   <Typography variant="body2">{msg.text}</Typography>
//                   <Typography
//                     variant="caption"
//                     sx={{
//                       display: "block",
//                       textAlign: msg.sender === "ngo" ? "left":"right",
//                       color: "#888",
//                       marginTop: "5px",
//                     }}
//                   >
//                     {new Date(msg.timestamp).toLocaleString()}
//                   </Typography>
//                 </Box>
//               </Box>
//             ))}
//           </Box>
//           <TextField
//             fullWidth
//             variant="outlined"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             placeholder="Type a message..."
//             sx={{ mb: 2 }}
//           />
//           <Button fullWidth variant="contained" onClick={sendMessage}>
//             Send
//           </Button>
//         </Box>
//       )}
//     </div>
//   );
// };

// export default ItemBasedDonation;


// import React, { useEffect, useState } from "react";
// import {
//   CircularProgress,
//   Typography,
//   Box,
//   IconButton,
//   TextField,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import axios from "axios";
// import ChatIcon from "@mui/icons-material/Chat";
// import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
// import CancelIcon from "@mui/icons-material/Cancel";
// import { database } from "../../config/firebaseConfig";
// import { ref, onValue, push, update } from "firebase/database";

// const ItemBasedDonation = () => {
//   const [donations, setDonations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openChat, setOpenChat] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [chatDetails, setChatDetails] = useState(null);

//   const [openRejectDialog, setOpenRejectDialog] = useState(false);
//   const [selectedDonationId, setSelectedDonationId] = useState(null);

//   const fetchDonations = async () => {
//     try {
//       const storedNgoId = localStorage.getItem("ngoId");
//       if (!storedNgoId) {
//         console.error("No NGO ID found in local storage");
//         setLoading(false);
//         return;
//       }

//       const response = await axios.get(
//         `http://localhost:5000/api/donations/item-based/${storedNgoId}`
//       );
//       const donationList = response.data;
//       console.log(donationList);
//       const donationsWithUnreadCounts = await Promise.all(
//         donationList.map(async (donation) => {
//           const chatRef = ref(database, `Chats/${donation.id}/messages`);
//           return new Promise((resolve) => {
//             onValue(
//               chatRef,
//               (snapshot) => {
//                 let unreadCount = 0;
//                 if (snapshot.exists()) {
//                   const msgs = Object.values(snapshot.val());
//                   unreadCount = msgs.filter(
//                     (msg) => msg.sender === "user" && msg.isread == false
//                   ).length;
//                 }
//                 resolve({ ...donation, id: donation.id, unreadCount });
//               },
//               { onlyOnce: true }
//             );
//           });
//         })
//       );

//       setDonations(donationsWithUnreadCounts);
//     } catch (error) {
//       console.error("Error fetching donations:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchDonations();
//   }, []);
//   console.log(donations);

//   const updateStatus = async (donationId) => {
//     if (!window.confirm("Are you sure you want to mark this donation as processing?")) return;
//     try {
//       await axios.post(`http://localhost:5000/api/donations/status-updation/${donationId}`);
//       window.location.reload();
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

//   // New reject dialog handlers
//   const handleReject = (donationId) => {
//     setSelectedDonationId(donationId);
//     setOpenRejectDialog(true);
//   };

//   const confirmReject = async () => {
//     try {
//       // Assuming ngoId is not required in API URL but present in token/session
//       await axios.post(
//         `http://localhost:5000/api/donations/rejecteditem/${selectedDonationId}`
//       );
//       setOpenRejectDialog(false);
//       window.location.reload();
//     } catch (error) {
//       console.error("Error rejecting donation:", error);
//     }
//   };

//   const handleOpenChat = (donationId) => {
//     setChatDetails({ donationId });
//     setOpenChat(true);
//     loadMessages(donationId);
//   };

//   const loadMessages = (donationId) => {
//     const chatRef = ref(database, `Chats/${donationId}/messages`);
//     onValue(chatRef, (snapshot) => {
//       if (snapshot.exists()) {
//         const msgsObj = snapshot.val();
//         const msgsArray = Object.entries(msgsObj); // Convert to entries for easy iteration

//         // Loop through messages to check if the user message is unread
//         msgsArray.forEach(([key, msg]) => {
//           if (msg.sender === "user" && msg.isread == false) {
//             // Update isread to true for unread user messages
//             const msgRef = ref(database, `Chats/${donationId}/messages/${key}`);
//             update(msgRef, { isread: true })
//               .then(() => {
//                 console.log(`Updated message ${key} to read`);
//               })
//               .catch((error) => {
//                 console.error("Error updating isread field:", error);
//               });
//           }
//         });

//         // Set the messages to the state after marking user messages as read
//         setMessages(Object.values(msgsObj));
//       } else {
//         setMessages([]);
//       }
//     });
//   };

//   const sendMessage = () => {
//     if (!newMessage.trim()) return;
//     const chatRef = ref(database, `Chats/${chatDetails.donationId}/messages`);
//     push(chatRef, {
//       sender: "ngo",
//       text: newMessage,
//       timestamp: new Date().toISOString(),
//       isread: false,
//     });
//     setNewMessage("");
//   };

//   const columns = [
//     { field: "name", headerName: "Donor Name", flex: 1 },
//     { field: "email", headerName: "Email", flex: 1 },
//     { field: "phoneNumber", headerName: "Phone Number", flex: 1 },
//     { field: "status", headerName: "Status", flex: 1 },
//     { field: "createdAt", headerName: "Date", flex: 1 },
//     {
//       field: "actions",
//       headerName: "Actions",
//       flex: 1,
//       sortable: false,
//       renderCell: (params) => (
//         <>
//           <IconButton
//             color="primary"
//             title="Chat"
//             disabled={params.row.isChat == false}
//             onClick={() => handleOpenChat(params.row.id)}
//             style={{ position: "relative" }}
//           >
//             <ChatIcon />
//             {params.row.isChat !== "false" && params.row.unreadCount > 0 && (
//               <span
//                 style={{
//                   position: "absolute",
//                   top: 0,
//                   right: 0,
//                   backgroundColor: "red",
//                   color: "white",
//                   borderRadius: "50%",
//                   padding: "2px 6px",
//                   fontSize: "10px",
//                 }}
//               >
//                 {params.row.unreadCount}
//               </span>
//             )}
//           </IconButton>

//           <IconButton
//             color="warning"
//             title="Processing"
//             onClick={() => updateStatus(params.row.id)}
//           >
//             <HourglassEmptyIcon />
//           </IconButton>

//           {/* Reject button with dialog */}
//           <IconButton
//             color="error"
//             title="Reject"
//             onClick={() => handleReject(params.row.id)}
//           >
//             <CancelIcon />
//           </IconButton>
//         </>
//       ),
//     },
//   ];

//   return (
//     <div className="mt-[5.5rem] mx-auto p-6">
//       <Box sx={{ backgroundColor: "#225738", py: 2, mb: 2 }}>
//         <Typography
//           variant="h5"
//           fontWeight="bold"
//           textAlign="center"
//           color="white"
//         >
//           Item-Based Donations Received
//         </Typography>
//       </Box>
//       {loading ? (
//         <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />
//       ) : (
//         <DataGrid
//           rows={donations.map((donation, index) => ({ id: index, ...donation }))}
//           columns={columns}
//           pageSize={5}
//           rowsPerPageOptions={[5, 10, 20]}
//           sx={{
//             borderRadius: 2,
//             "& .MuiDataGrid-columnHeaders": {
//               backgroundColor: "#225738",
//               color: "black",
//               fontSize: "16px",
//               fontWeight: "bold",
//             },
//           }}
//         />
//       )}

//       {/* Reject Confirmation Dialog */}
//       <Dialog
//         open={openRejectDialog}
//         onClose={() => setOpenRejectDialog(false)}
//       >
//         <DialogTitle>Confirm Rejection</DialogTitle>
//         <DialogContent>
//           <Typography>Are you sure you want to reject this donation?</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenRejectDialog(false)} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={confirmReject} color="error">
//             Reject
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Chat Sidebar */}
//       {openChat && (
//         <Box
//           sx={{
//             position: "fixed",
//             right: 0,
//             top: 0,
//             marginTop: "70px",
//             height: "90%",
//             width: "400px",
//             backgroundColor: "#fff",
//             boxShadow: "-4px 0 8px rgba(0, 0, 0, 0.2)",
//             display: "flex",
//             flexDirection: "column",
//             padding: 2,
//             zIndex: 10,
//           }}
//         >
//           <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//             <Typography variant="h6">Chat</Typography>
//             {/* <IconButton onClick={() => setOpenChat(false)}>
//               <CancelIcon />
//             </IconButton> */}
//             <IconButton
//               onClick={() => {
//                 setOpenChat(false); // Close the chat
//                 fetchDonations(); // Fetch donations again after closing the chat
//               }}
//             >
//               <CancelIcon />
//             </IconButton>
//           </Box>
//           <Box sx={{ flex: 1, overflowY: "auto", marginBottom: 2 }}>
//             {messages.map((msg, index) => (
//               <Box
//                 key={index}
//                 sx={{
//                   display: "flex",
//                   flexDirection: msg.sender === "ngo" ? "row" : "row-reverse",
//                   alignItems: "flex-start",
//                   mb: 1,
//                 }}
//               >
//                 <Box
//                   sx={{
//                     backgroundColor:
//                       msg.sender === "ngo" ? "#dcf8c6" : "#d1f6ff",
//                     padding: "10px 15px",
//                     borderRadius: "10px",
//                     maxWidth: "80%",
//                     boxShadow:
//                       msg.sender === "ngo"
//                         ? "0 2px 5px rgba(0, 0, 0, 0.1)"
//                         : "0 2px 5px rgba(0, 0, 0, 0.1)",
//                   }}
//                 >
//                   <Typography variant="body2">{msg.text}</Typography>
//                   <Typography
//                     variant="caption"
//                     sx={{
//                       display: "block",
//                       textAlign: msg.sender === "ngo" ? "left" : "right",
//                       color: "#888",
//                       marginTop: "5px",
//                     }}
//                   >
//                     {new Date(msg.timestamp).toLocaleString()}
//                   </Typography>
//                 </Box>
//               </Box>
//             ))}
//           </Box>
//           <TextField
//             fullWidth
//             variant="outlined"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             placeholder="Type a message..."
//             sx={{ mb: 2 }}
//           />
//           <Button fullWidth variant="contained" onClick={sendMessage}>
//             Send
//           </Button>
//         </Box>
//       )}
//     </div>
//   );
// };

// export default ItemBasedDonation;


import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  Typography,
  Box,
  IconButton,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import ChatIcon from "@mui/icons-material/Chat";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { database } from "../../config/firebaseConfig";
import { ref, onValue, push, update } from "firebase/database";

const ItemBasedDonation = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openChat, setOpenChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatDetails, setChatDetails] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("");
  const [currentDonationId, setCurrentDonationId] = useState(null);

  // const fetchDonations = async () => {
  //   try {
  //     const storedNgoId = localStorage.getItem("ngoId");
  //     if (!storedNgoId) {
  //       console.error("No NGO ID found in local storage");
  //       setLoading(false);
  //       return;
  //     }

  //     const response = await axios.get(
  //       `http://localhost:5000/api/donations/item-based/${storedNgoId}`
  //     );
  //     const donationList = response.data;

  //     const donationsWithUnreadCounts = await Promise.all(
  //       donationList.map(async (donation) => {
  //         const chatRef = ref(database, `Chats/${donation.id}/messages`);
  //         return new Promise((resolve) => {
  //           onValue(
  //             chatRef,
  //             (snapshot) => {
  //               let unreadCount = 0;
  //               if (snapshot.exists()) {
  //                 const msgs = Object.values(snapshot.val());
  //                 unreadCount = msgs.filter(
  //                   (msg) => msg.sender === "user" && msg.isread === false
  //                 ).length;
  //               }
  //               resolve({ ...donation, unreadCount });
  //             },
  //             { onlyOnce: true }
  //           );
  //         });
  //       })
  //     );

  //     setDonations(donationsWithUnreadCounts);
  //   } catch (error) {
  //     console.error("Error fetching donations:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
const fetchDonations = async () => {
  try {
    const storedNgoId = localStorage.getItem("ngoId");
    if (!storedNgoId) {
      console.error("No NGO ID found in local storage");
      setLoading(false);
      return;
    }

    const response = await axios.get(
      `http://localhost:5000/api/donations/item-based/${storedNgoId}`
    );
    const donationList = response.data;

    // ✅ Filter only Pending and Processing
    const filteredDonations = donationList.filter(
      (donation) => donation.status === "Pending" || donation.status === "Processing"
    );

    const donationsWithUnreadCounts = await Promise.all(
      filteredDonations.map(async (donation) => {
        const chatRef = ref(database, `Chats/${donation.id}/messages`);
        return new Promise((resolve) => {
          onValue(
            chatRef,
            (snapshot) => {
              let unreadCount = 0;
              if (snapshot.exists()) {
                const msgs = Object.values(snapshot.val());
                unreadCount = msgs.filter(
                  (msg) => msg.sender === "user" && msg.isread == false
                ).length;
              }
              resolve({ ...donation, id: donation.id, unreadCount });
            },
            { onlyOnce: true }
          );
        });
      })
    );

    setDonations(donationsWithUnreadCounts);
  } catch (error) {
    console.error("Error fetching donations:", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleOpenChat = (donationId) => {
    setChatDetails({ donationId });
    setOpenChat(true);
    loadMessages(donationId);
  };

  const loadMessages = (donationId) => {
    const chatRef = ref(database, `Chats/${donationId}/messages`);
    onValue(chatRef, (snapshot) => {
      if (snapshot.exists()) {
        const msgsObj = snapshot.val();
        const msgsArray = Object.entries(msgsObj);

        msgsArray.forEach(([key, msg]) => {
          if (msg.sender === "user" && msg.isread === false) {
            const msgRef = ref(database, `Chats/${donationId}/messages/${key}`);
            update(msgRef, { isread: true }).catch((error) =>
              console.error("Error updating isread field:", error)
            );
          }
        });

        setMessages(Object.values(msgsObj));
      } else {
        setMessages([]);
      }
    });
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const chatRef = ref(database, `Chats/${chatDetails.donationId}/messages`);
    push(chatRef, {
      sender: "ngo",
      text: newMessage,
      timestamp: new Date().toISOString(),
      isread: false,
    });
    setNewMessage("");
  };

  const handleDialogOpen = (type, donationId) => {
    setDialogType(type);
    setCurrentDonationId(donationId);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setDialogType("");
    setCurrentDonationId(null);
  };

  const handleConfirmAction = async () => {
    try {
      if (dialogType === "processing") {
        await axios.post(
          `http://localhost:5000/api/donations/status-updation/${currentDonationId}`
        );
      } else if (dialogType === "accept") {
        await axios.post(
          `http://localhost:5000/api/donations/acceptdonation/${currentDonationId}`
        );
      } else if (dialogType === "reject") {
        await axios.post(
          `http://localhost:5000/api/donations/rejecteditem/${currentDonationId}`
        );
      }
      window.location.reload();
    } catch (error) {
      console.error("Action failed:", error);
    } finally {
      handleDialogClose();
    }
  };

  const columns = [
    { field: "name", headerName: "Donor Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phoneNumber", headerName: "Phone Number", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "createdAt", headerName: "Date", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            title="Chat"
            disabled={params.row.isChat === false}
            onClick={() => handleOpenChat(params.row.id)}
            style={{ position: "relative" }}
          >
            <ChatIcon />
            {params.row.isChat !=false && params.row.unreadCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "50%",
                  padding: "2px 6px",
                  fontSize: "10px",
                }}
              >
                {params.row.unreadCount}
              </span>
            )}
          </IconButton>

          {params.row.status === "Pending" && (
            <IconButton
              color="warning"
              title="Processing"
              onClick={() => handleDialogOpen("processing", params.row.id)}
            >
              <HourglassEmptyIcon />
            </IconButton>
          )}

          {params.row.status === "Processing" && (
            <IconButton
              color="success"
              title="Accept"
              onClick={() => handleDialogOpen("accept", params.row.id)}
            >
              <CheckCircleIcon />
            </IconButton>
          )}

          <IconButton
            color="error"
            title="Reject"
            onClick={() => handleDialogOpen("reject", params.row.id)}
          >
            <CancelIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div className="mt-[5.5rem] mx-auto p-6">
      <Box sx={{ backgroundColor: "#225738", py: 2, mb: 2 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" color="white">
          Item-Based Donations Received
        </Typography>
      </Box>

      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />
      ) : (
        <DataGrid
          rows={donations.map((donation, index) => ({ id: donation.id || index, ...donation }))}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          sx={{
            borderRadius: 2,
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#225738",
              color: "black",
              fontSize: "16px",
              fontWeight: "bold",
            },
          }}
        />
      )}

      {/* Chat Sidebar */}
      {openChat && (
        <Box
          sx={{
            position: "fixed",
            right: 0,
            top: 0,
            marginTop: "70px",
            height: "90%",
            width: "400px",
            backgroundColor: "#fff",
            boxShadow: "-4px 0 8px rgba(0, 0, 0, 0.2)",
            display: "flex",
            flexDirection: "column",
            padding: 2,
            zIndex: 10,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6">Chat</Typography>
            <IconButton
              onClick={() => {
                setOpenChat(false);
                fetchDonations();
              }}
            >
              <CancelIcon />
            </IconButton>
          </Box>
          <Box sx={{ flex: 1, overflowY: "auto", marginBottom: 2 }}>
            {messages.map((msg, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: msg.sender === "ngo" ? "row" : "row-reverse",
                  mb: 1,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: msg.sender === "ngo" ? "#dcf8c6" : "#d1f6ff",
                    padding: "10px 15px",
                    borderRadius: "10px",
                    maxWidth: "80%",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Typography variant="body2">{msg.text}</Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: "block",
                      textAlign: msg.sender === "ngo" ? "left" : "right",
                      color: "#888",
                      mt: "5px",
                    }}
                  >
                    {new Date(msg.timestamp).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <TextField
            fullWidth
            variant="outlined"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            sx={{ mb: 2 }}
          />
          <Button fullWidth variant="contained" onClick={sendMessage}>
            Send
          </Button>
        </Box>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          {dialogType === "processing" &&
            "Are you sure you want to mark this donation as Processing?"}
          {dialogType === "accept" &&
            "Did you receive the item-based donation? Confirm to mark it as Accepted."}
          {dialogType === "reject" &&
            "Are you sure you want to reject this donation?"}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button variant="contained" onClick={handleConfirmAction}>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ItemBasedDonation;
