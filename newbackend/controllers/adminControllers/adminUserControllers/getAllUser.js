// Import Firebase Admin SDK from the firebaseConfig file
const admin = require("../../../config/firebaseConfig");
const db = admin.database();

async function getAllUsers(req, res) {
    try {
        // Reference to users inside the fyp table
        const usersRef = db.ref("fyp/users");
        const snapshot = await usersRef.once("value");
        const usersData = snapshot.val();

        if (!usersData) {
            return res.status(404).json({ error: "No users found." });
        }

        // Transform data into an array with ID included
        const usersList = Object.keys(usersData).map(userId => ({
            userId,
            ...usersData[userId]
        }));

        res.status(200).json({ message: "Users retrieved successfully", users: usersList });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users." });
    }
}

module.exports = { getAllUsers };
