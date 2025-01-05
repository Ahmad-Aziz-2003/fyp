// Import Firebase Admin SDK from the firebaseConfig file
const admin = require("../../config/firebaseConfig");
const { auth, createUserWithEmailAndPassword,sendPasswordResetEmail,signInWithEmailAndPassword } = require("../../config/firebasefronted");
const db = admin.database();
const storage = admin.storage().bucket(); // Access Firebase Storage
const authAdmin = admin.auth();

async function getNGOData(req, res) {
    try {
      const ngoId = req.params.ngoId; // Extract NGO ID from the route parameter
  
      // Fetch NGO data from Realtime Database
      const ngoRef = db.ref(`NGOs/${ngoId}`);
      const snapshot = await ngoRef.once("value");
      const ngoData = snapshot.val();
  
      if (!ngoData) {
        return res.status(404).json({ error: "NGO not found." });
      }
  
      // Filter out unwanted fields
      const { name, email, registrationNumber,foundedDate, profilePhoto,publicMessage,description, address, contact, categories } = ngoData;
  
      // Prepare the response object
      const filteredData = {
        name,
        email,
        registrationNumber,
        foundedDate,
        profilePhoto,
        description,
        publicMessage,
        address,
        contact,
        categories,
      };
  
      // Send the filtered data
      res.status(200).json({ message: "NGO data retrieved successfully", ngoId, ngoData: filteredData });
    } catch (error) {
      console.error("Error fetching NGO data:", error);
      res.status(500).json({ error: "Failed to fetch NGO data." });
    }
  }

module.exports={getNGOData};