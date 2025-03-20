// Import Firebase Admin SDK from the firebaseConfig file
const admin = require("../../config/firebaseConfig");
const db = admin.database();

async function getAppliedVolunteer(req, res) {
    try {
        const { ngoId } = req.params; // Get ngoId from request parameters

        if (!ngoId) {
            return res.status(400).json({ error: "NGO ID is required." });
        }

        // Reference to the Volunteers node in Firebase
        const volunteersRef = db.ref("Volunteers");
        const snapshot = await volunteersRef.once("value");
        const volunteersData = snapshot.val();

        if (!volunteersData) {
            return res.status(404).json({ error: "No volunteers found." });
        }

        // Filter volunteers by ngoId
        const filteredVolunteers = Object.keys(volunteersData)
            .map(volunteerId => ({
                volunteerId,
                ...volunteersData[volunteerId]
            }))
            .filter(volunteer => volunteer.ngoId === ngoId); // Filter by NGO ID

        if (filteredVolunteers.length === 0) {
            return res.status(404).json({ error: "No volunteers found for this NGO." });
        }

        res.status(200).json({
            message: "Volunteers retrieved successfully",
            volunteers: filteredVolunteers
        });
    } catch (error) {
        console.error("Error fetching volunteers:", error);
        res.status(500).json({ error: "Failed to fetch volunteers." });
    }
}

module.exports = { getAppliedVolunteer };
