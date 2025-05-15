const admin = require("../../config/firebaseConfig");
const db = admin.database();
const sendEmail = require("../../utils/sendEmails");

/**
 * Accept a donation request by updating status and notifying the user via email
 */
async function acceptItemDonation(req, res) {
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

    if (donationData.status !== "Processing") {
      return res.status(400).json({ error: "Only donations with status 'Processing' can be accepted." });
    }

    // Update donation status to Accepted and disable chat
    await donationRef.update({ status: "Accepted", isChat: false });

    // Send acceptance email
    if (donationData.email && donationData.name && donationData.ngoName) {
      const subject = "Your Donation Has Been Accepted - Dast-e-Khair";
      const message = `Dear ${donationData.name},\n\nGood news! Your donation request to "${donationData.ngoName}" has been accepted.\n\nDonation ID: ${donationId}\nStatus: Accepted\n\nThank you for your generous support!\n\nBest regards,\nDast-e-Khair Team`;
      await sendEmail("l211873@lhr.nu.edu.pk", subject, message);
    //   await sendEmail(donationData.email, subject, message);
    }

    res.status(200).json({ message: "Donation accepted and user notified by email." });
  } catch (error) {
    console.error("Error accepting donation:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

module.exports = { acceptItemDonation };
