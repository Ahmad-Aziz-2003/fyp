// Import Firebase Admin SDK from the firebaseConfig file
const admin = require("../../../config/firebaseConfig");
const db = admin.database();

async function getNgoDetail(req, res) {
    try {
        const ngoId = req.params.ngoId; // Extract NGO ID from the route parameter

        // Fetch NGO data from Realtime Database
        const ngoRef = db.ref(`NGOs/${ngoId}`);
        const snapshot = await ngoRef.once("value");
        const ngoData = snapshot.val();

        if (!ngoData) {
            return res.status(404).json({ error: "NGO not found." });
        }

        // Fetch counts for projects, campaigns, and goodness posts
        const [projectsSnapshot, campaignsSnapshot, goodnessSnapshot] = await Promise.all([
            db.ref("projects").orderByChild("ngoId").equalTo(ngoId).once("value"),
            db.ref("campaigns").orderByChild("ngoId").equalTo(ngoId).once("value"),
            db.ref("goodness").orderByChild("ngoId").equalTo(ngoId).once("value")
        ]);

        const totalProjects = projectsSnapshot.numChildren();
        const totalCampaigns = campaignsSnapshot.numChildren();
        const totalGoodnessPosts = goodnessSnapshot.numChildren();

        // Filter out unwanted fields
        const {
            name,
            email,
            registrationNumber,
            foundedDate,
            profilePhoto,
            publicMessage,
            description,
            address,
            contact,
            categories
        } = ngoData;

        // Prepare the response object
        const filteredData = {
            name,
            email,
            registrationNumber,
            foundedDate,
            profilePhoto,
            description,
            publicMessage,
            address,
            contact,
            categories,
            totalProjects,
            totalCampaigns,
            totalGoodnessPosts
        };

        // Send the filtered data
        res.status(200).json({
            message: "NGO data retrieved successfully",
            ngoId,
            ngoData: filteredData
        });

    } catch (error) {
        console.error("Error fetching NGO data:", error);
        res.status(500).json({ error: "Failed to fetch NGO data." });
    }
}

module.exports = { getNgoDetail };
