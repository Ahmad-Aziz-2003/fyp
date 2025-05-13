// const admin = require("../../../config/firebaseConfig");
// const db = admin.database();

// async function rejectNGO(req, res) {
//     try {
//         const { ngoId } = req.params; // Get NGO ID from URL

//         if (!ngoId) {
//             return res.status(400).json({ error: "NGO ID is required." });
//         }

//         const ngoRef = db.ref(`NGOs/${ngoId}`);
//         const snapshot = await ngoRef.once("value");

//         if (!snapshot.exists()) {
//             return res.status(404).json({ error: "NGO not found." });
//         }

//         // Delete the NGO
//         await ngoRef.remove();

//         res.status(200).json({
//             message: "NGO deleted successfully.",
//             ngoId
//         });

//     } catch (error) {
//         console.error("Error deleting NGO:", error);
//         res.status(500).json({ error: "Failed to delete NGO." });
//     }
// }

// module.exports = { rejectNGO };


const admin = require("../../../config/firebaseConfig");
const db = admin.database();
const sendEmail = require("../../../utils/sendEmails"); // adjust path as needed

async function rejectNGO(req, res) {
  try {
    const { ngoId } = req.params;

    if (!ngoId) {
      return res.status(400).json({ error: "NGO ID is required." });
    }

    const ngoRef = db.ref(`NGOs/${ngoId}`);
    const snapshot = await ngoRef.once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({ error: "NGO not found." });
    }

    const ngoData = snapshot.val();
    const ngoEmail = ngoData.email;

    // Delete NGO
    await ngoRef.remove();

    // Send rejection email
    const subject = "NGO Verification Rejected - Dast-e-Khair";
    const message = `Dear ${ngoData.name},\n\nWe regret to inform you that your application for NGO verification has been rejected.\n\nPlease review your information and apply again through our platform.\n\nThank you,\nDast-e-Khair Team`;

    await sendEmail(ngoEmail, subject, message);

    res.status(200).json({
      message: "NGO deleted and email sent successfully.",
      ngoId
    });

  } catch (error) {
    console.error("Error rejecting NGO:", error);
    res.status(500).json({ error: "Failed to reject NGO." });
  }
}

module.exports = { rejectNGO };
