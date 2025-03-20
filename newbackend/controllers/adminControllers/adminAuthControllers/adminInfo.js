const admin = require("../../../config/firebaseConfig");

const db = admin.database();

async function getAdminInfo(req, res) {
  try {
    const { adminId } = req.params;

    if (!adminId) {
      return res.status(400).json({ error: "Admin ID is required." });
    }

    // Reference to Admins in Firebase Realtime Database
    const adminRef = db.ref(`Admins/${adminId}`);
    const snapshot = await adminRef.once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({ error: "Admin not found." });
    }

    res.status(200).json({ adminData: snapshot.val() });
  } catch (error) {
    console.error("Error fetching admin info:", error);
    res.status(500).json({ error: "Failed to fetch admin info." });
  }
}

module.exports = { getAdminInfo };