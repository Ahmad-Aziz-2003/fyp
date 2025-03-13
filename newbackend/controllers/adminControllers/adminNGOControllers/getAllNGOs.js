// Import Firebase Admin SDK from the firebaseConfig file
const admin = require("../../../config/firebaseConfig");
const db = admin.database();

async function getAllNGOs(req, res) {
    try {
        // Reference to all NGOs in the database
        const ngosRef = db.ref("NGOs");
        const snapshot = await ngosRef.once("value");
        const ngosData = snapshot.val();

        if (!ngosData) {
            return res.status(404).json({ error: "No NGOs found." });
        }

        // Transform data into an array with ID included
        const ngosList = Object.keys(ngosData).map(ngoId => ({
            ngoId,
            ...ngosData[ngoId]
        }));

        res.status(200).json({ message: "NGOs retrieved successfully", ngos: ngosList });
    } catch (error) {
        console.error("Error fetching NGOs:", error);
        res.status(500).json({ error: "Failed to fetch NGOs." });
    }
}

module.exports = { getAllNGOs };
