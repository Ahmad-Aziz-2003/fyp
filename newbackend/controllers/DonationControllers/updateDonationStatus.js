// const admin = require("../../config/firebaseConfig");
// const db = admin.database();

// /**
//  * Update donation status from Pending to Processing
//  */
// async function updateDonationStatus(req, res) {
//   try {
//     const { donationId } = req.params;

//     if (!donationId) {
//       return res.status(400).json({ error: "Donation ID is required." });
//     }

//     const donationRef = db.ref(`Donations/Ngo_Item_Base_Donation/${donationId}`);
//     const snapshot = await donationRef.once("value");

//     if (!snapshot.exists()) {
//       return res.status(404).json({ error: "Donation not found." });
//     }

//     const donationData = snapshot.val();

//     if (donationData.status !== "Pending") {
//       return res.status(400).json({ error: "Donation status can only be updated from Pending to Processing." });
//     }

//     await donationRef.update({ status: "Processing" });

//     res.status(200).json({ message: "Donation status updated to Processing." });
//   } catch (error) {
//     console.error("Error updating donation status:", error);
//     res.status(500).json({ error: "Internal server error." });
//   }
// }

// module.exports = { updateDonationStatus };
const admin = require("../../config/firebaseConfig");
const db = admin.database();

/**
 * Update donation status from Pending to Processing and enable chat
 */
async function updateDonationStatus(req, res) {
  try {
    const { donationId } = req.params;

    if (!donationId) {
      return res.status(400).json({ error: "Donation ID is required." });
    }

    const donationRef = db.ref(`Donations/Ngo_Item_Base_Donation/${donationId}`);
    const snapshot = await donationRef.once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({ error: "Donation not found." });
    }

    const donationData = snapshot.val();

    if (donationData.status !== "Pending") {
      return res.status(400).json({ error: "Donation status can only be updated from Pending to Processing." });
    }

    // Update donation status and enable chat
    await donationRef.update({ status: "Processing", isChat: true });

    // Ensure donorId (userId) and ngoId exist before creating a chat entry
    if (!donationData.userId || !donationData.ngoId) {
      return res.status(400).json({ error: "Missing required donorId (userId) or ngoId." });
    }

    // // Create a new chat entry
    // const chatRef = db.ref("Chats").push();
    // const chatId = chatRef.key;
    // await chatRef.set({
    //   donationId: donationId,
    //   donorId: donationData.userId, // Corrected donorId to userId
    //   ngoId: donationData.ngoId,
    //   chatEnabled: true,
    //   messages: []
    // });

    res.status(200).json({ message: "Donation status updated to Processing and chat enabled." });
  } catch (error) {
    console.error("Error updating donation status:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

module.exports = { updateDonationStatus };
