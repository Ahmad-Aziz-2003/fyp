const admin = require("../../config/firebaseConfig");
const db = admin.database();
const sendEmail = require("../../utils/sendEmails");

/**
 * Reject a donation request by updating status and notifying the user via email
 */

async function itembaseRejected(req, res) {
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

    if (donationData.status !== "Pending" && donationData.status !== "Processing") {
      return res.status(400).json({ error: "Only Pending or Processing donations can be rejected." });
    }

    // Always update donation status and force isChat to false
    await donationRef.update({ status: "Rejected", isChat: false });

    // Send rejection email
    if (donationData.email && donationData.name && donationData.ngoName) {
      const subject = "Your Donation Has Been Rejected - Dast-e-Khair";
      const message = `Dear ${donationData.name},\n\nWe regret to inform you that your donation request to "${donationData.ngoName}" has been rejected by ngo.\n\nDonation ID: ${donationId}\nStatus: Rejected\n\nThank you for your interest in helping.\n\nBest regards,\nDast-e-Khair Team`;
// await sendEmail("l211873@lhr.nu.edu.pk", subject, message); // Changed back to use actual donor email
      await sendEmail(donationData.email, subject, message); // Changed back to use actual donor email
    }

    res.status(200).json({ message: "Donation rejected and user notified by email." });
  } catch (error) {
    console.error("Error rejecting donation:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

module.exports = { itembaseRejected };
