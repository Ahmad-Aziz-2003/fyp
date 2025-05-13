// // Import Firebase Admin SDK from the firebaseConfig file
// const admin = require("../../../config/firebaseConfig");
// const db = admin.database();
// async function getUnverifiedNGOs(req, res) {
//     try {
//         // Reference to all NGOs in the database
//         const ngosRef = db.ref("NGOs");
//         const snapshot = await ngosRef.once("value");
//         const ngosData = snapshot.val();

//         if (!ngosData) {
//             return res.status(404).json({ error: "No NGOs found." });
//         }

//         // Filter NGOs where "isVerified" is false
//         const unverifiedNGOs = Object.keys(ngosData)
//             .filter(ngoId => ngosData[ngoId].isVerified === false)
//             .map(ngoId => ({
//                 ngoId,
//                 ...ngosData[ngoId]
//             }));

//         if (unverifiedNGOs.length === 0) {
//             return res.status(404).json({ error: "No unverified NGOs found." });
//         }

//         res.status(200).json({ message: "Unverified NGOs retrieved successfully", ngos: unverifiedNGOs });
//     } catch (error) {
//         console.error("Error fetching unverified NGOs:", error);
//         res.status(500).json({ error: "Failed to fetch unverified NGOs." });
//     }
// }

// module.exports = { getUnverifiedNGOs };
// Import Firebase Admin SDK from the firebaseConfig file
const admin = require("../../../config/firebaseConfig");
const db = admin.database();

async function getUnverifiedNGOs(req, res) {
    try {
        // Reference to all NGOs in the database
        const ngosRef = db.ref("NGOs");
        const snapshot = await ngosRef.once("value");
        const ngosData = snapshot.val();

        if (!ngosData) {
            return res.status(200).json({
                message: "No NGOs found.",
                ngos: []
            });
        }

        // Filter NGOs where "isVerified" is false
        const unverifiedNGOs = Object.keys(ngosData)
            .filter(ngoId => ngosData[ngoId].isVerified === false)
            .map(ngoId => ({
                ngoId,
                ...ngosData[ngoId]
            }));

        if (unverifiedNGOs.length === 0) {
            return res.status(200).json({
                message: "No unverified NGOs found.",
                ngos: []
            });
        }

        // If unverified NGOs are found
        res.status(200).json({
            message: "Unverified NGOs retrieved successfully.",
            ngos: unverifiedNGOs
        });

    } catch (error) {
        console.error("Error fetching unverified NGOs:", error);
        res.status(500).json({ error: "Failed to fetch unverified NGOs." });
    }
}

module.exports = { getUnverifiedNGOs };
