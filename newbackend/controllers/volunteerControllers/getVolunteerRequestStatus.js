const admin = require("../../config/firebaseConfig");
const db = admin.database();

async function getVolunteerRequestStatus(req, res) {
    try {
        const { ngoId } = req.params;

        if (!ngoId) {
            return res.status(400).json({
                success: false,
                message: "'ngoId' is required."
            });
        }

        // Fetch NGO data from Realtime Database
        const ngoRef = db.ref(`NGOs/${ngoId}`);
        const snapshot = await ngoRef.once("value");
        const ngoData = snapshot.val();

        if (!ngoData) {
            return res.status(404).json({ 
                success: false, 
                message: "NGO not found." 
            });
        }

        const isRequestingVolunteers = ngoData.isRequestingVolunteers || false;
        const volunteerDetails = ngoData.volunteerDetails || {};

        return res.status(200).json({
            success: true,
            message: "Volunteer request status retrieved successfully.",
            isRequestingVolunteers,
            volunteerDetails
        });
    } catch (error) {
        console.error("Error fetching volunteer request status:", error);

        return res.status(500).json({
            success: false,
            message: "An error occurred while processing your request.",
            error: error.message
        });
    }
}

module.exports = { getVolunteerRequestStatus };
