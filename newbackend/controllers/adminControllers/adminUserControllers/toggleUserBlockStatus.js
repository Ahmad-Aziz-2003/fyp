const admin = require("../../../config/firebaseConfig");
const db = admin.database();

// Toggle User Block Status API
async function toggleUserBlockStatus(req, res) {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: "User ID is required." });
        }

        // Reference to the user in Firebase
        const userRef = db.ref(`fyp/users/${userId}`);

        // Get current user data
        const snapshot = await userRef.once("value");
        const userData = snapshot.val();

        if (!userData) {
            return res.status(404).json({ error: "User not found." });
        }

        // Toggle isActive status
        const newStatus = !userData.isActive;
        await userRef.update({ isActive: newStatus });

        res.status(200).json({
            message: `User ${newStatus ? "unblocked" : "blocked"} successfully.`,
            userId,
            isActive: newStatus,
        });
    } catch (error) {
        console.error("Error toggling user status:", error);
        res.status(500).json({ error: "Failed to update user status." });
    }
}

module.exports = { toggleUserBlockStatus };
