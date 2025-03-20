const admin = require("../../config/firebaseConfig");
const db = admin.database();

/**
 * Fetch all monetary donations for a specific NGO
 */
async function getNgoMonetaryDonations(req, res) {
  try {
    const { ngoId } = req.params;

    if (!ngoId) {
      return res.status(400).json({ error: "NGO ID is required." });
    }

    const donationsRef = db.ref("Donations/Ngo_Monetary_Donation");
    const snapshot = await donationsRef.orderByChild("ngoId").equalTo(ngoId).once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({ message: "No monetary donations found for the given NGO ID." });
    }

    const donations = [];
    snapshot.forEach((childSnapshot) => {
      donations.push({ id: childSnapshot.key, ...childSnapshot.val() });
    });

    res.status(200).json(donations);
  } catch (error) {
    console.error("Error fetching NGO monetary donations:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

module.exports = { getNgoMonetaryDonations };
