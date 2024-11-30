// Import Firebase Admin SDK from the firebaseConfig file
const admin = require("../../config/firebaseConfig");
const { auth, createUserWithEmailAndPassword,sendPasswordResetEmail,signInWithEmailAndPassword } = require("../../config/firebasefronted");
const db = admin.database();
const storage = admin.storage().bucket(); // Access Firebase Storage
const authAdmin = admin.auth(); // Firebase Auth instance

async function changePassword(req, res) {
    try {
      const ngoId = req.params.ngoId; // NGO ID from the URL
      const { currentPassword, newPassword } = req.body;
  
      // Validate required fields
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: "Both current and new passwords are required." });
      }
  
      // Fetch NGO data from Realtime Database
      const ngoRef = db.ref(`NGOs/${ngoId}`);
      const snapshot = await ngoRef.once("value");
      const ngoData = snapshot.val();
  
      if (!ngoData) {
        return res.status(404).json({ error: "NGO not found." });
      }
  
      // Check if the current password matches
      if (ngoData.password !== currentPassword) {
        return res.status(401).json({ error: "Current password is incorrect." });
      }
  
      // Update the password
      await ngoRef.update({ password: newPassword });
  
      // Respond with success
      res.status(200).json({ message: "Password updated successfully." });
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(500).json({ error: "Failed to change password." });
    }
  }

module.exports={changePassword};