const admin = require("../../../config/firebaseConfig");
const db = admin.database();

async function verifyNGO(req, res) {
    try {
        const { ngoId } = req.params; // Get NGO ID from URL

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

        res.status(200).json({
            message: "NGO verified successfully.",
            isVerified: true
        });

    } catch (error) {
        console.error("Error verifying NGO:", error);
        res.status(500).json({ error: "Failed to verify NGO." });
    }
}

module.exports = { verifyNGO };
