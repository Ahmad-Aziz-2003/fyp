const admin = require("../../../config/firebaseConfig");
const db = admin.database();

async function toggleNGOStatus(req, res) {
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
        const newStatus = !ngoData.isDeactivated; // Toggle status

        // Update database
        await ngoRef.update({ isDeactivated: newStatus });

        res.status(200).json({ 
            message: `NGO ${newStatus ? "deactivated" : "activated"} successfully.`,
            isDeactivated: newStatus 
        });

    } catch (error) {
        console.error("Error updating NGO status:", error);
        res.status(500).json({ error: "Failed to update NGO status." });
    }
}

module.exports = { toggleNGOStatus };
