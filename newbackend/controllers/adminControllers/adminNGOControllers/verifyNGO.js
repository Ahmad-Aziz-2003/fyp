// const admin = require("../../../config/firebaseConfig");
// const db = admin.database();

// async function verifyNGO(req, res) {
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

//         const ngoData = snapshot.val();

//         // Check if the NGO is already verified
//         if (ngoData.isVerified) {
//             return res.status(400).json({ error: "NGO is already verified and cannot be unverified." });
//         }

//         // Verify NGO (set isVerified to true)
//         await ngoRef.update({ isVerified: true });

//         res.status(200).json({
//             message: "NGO verified successfully.",
//             isVerified: true
//         });

//     } catch (error) {
//         console.error("Error verifying NGO:", error);
//         res.status(500).json({ error: "Failed to verify NGO." });
//     }
// }

// module.exports = { verifyNGO };
const admin = require("../../../config/firebaseConfig");
const db = admin.database();
const sendEmail = require("../../../utils/sendEmails"); // adjust path as needed

async function verifyNGO(req, res) {
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

        // Check if the NGO is already verified
        if (ngoData.isVerified) {
            return res.status(400).json({ error: "NGO is already verified and cannot be unverified." });
        }

        // Verify NGO (set isVerified to true)
        await ngoRef.update({ isVerified: true });

        // Send verification email
        const ngoEmail = ngoData.email;
        const subject = "NGO Verification Approved - Dast-e-Khair";
        const message = `Dear ${ngoData.name},\n\nCongratulations! Your NGO has been successfully verified by Dast-e-Khair.\n\nYou can now start receiving donations and accessing all features on our platform.\n\nThank you for joining us in doing good.\n\nBest regards,\nDast-e-Khair Team`;

        await sendEmail(ngoEmail, subject, message);

        res.status(200).json({
            message: "NGO verified and email sent successfully.",
            isVerified: true
        });

    } catch (error) {
        console.error("Error verifying NGO:", error);
        res.status(500).json({ error: "Failed to verify NGO." });
    }
}

module.exports = { verifyNGO };
