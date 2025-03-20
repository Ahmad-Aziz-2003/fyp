const admin = require("../../../config/firebaseConfig");

const db = admin.database();

async function getPlatformStats(req, res) {
  try {
    const { adminId } = req.params; // Get adminId from request params

    if (!adminId) {
      return res.status(400).json({ error: "Admin ID is required." });
    }

    // Check if admin exists
    const adminRef = db.ref(`Admins/${adminId}`);
    const adminSnapshot = await adminRef.once("value");

    if (!adminSnapshot.exists()) {
      return res.status(403).json({ error: "Unauthorized. Admin not found." });
    }

    // References to database nodes
    const usersRef = db.ref("fyp/users");
    const ngosRef = db.ref("NGOs");
    const volunteersRef = db.ref("Volunteers");

    // Fetching snapshots
    const [usersSnapshot, ngosSnapshot, volunteersSnapshot] = await Promise.all([
      usersRef.once("value"),
      ngosRef.once("value"),
      volunteersRef.once("value"),
    ]);

    // Getting counts
    const totalUsers = usersSnapshot.numChildren();
    const totalNGOs = ngosSnapshot.numChildren();
    const totalVolunteers = volunteersSnapshot.numChildren();

    // Separate verified and unverified NGOs
    let verifiedNGOs = 0;
    let unverifiedNGOs = 0;

    // Separate active and inactive users
    let activeUsers = 0;
    let inactiveUsers = 0;

    ngosSnapshot.forEach((ngo) => {
      if (ngo.val().isVerified) {
        verifiedNGOs++;
      } else {
        unverifiedNGOs++;
      }
    });

    usersSnapshot.forEach((user) => {
      if (user.val().isActive) {
        activeUsers++;
      } else {
        inactiveUsers++;
      }
    });

    res.status(200).json({
      totalUsers,
      activeUsers,
      inactiveUsers,
      totalNGOs,
      verifiedNGOs,
      unverifiedNGOs,
      totalVolunteers,
    });
  } catch (error) {
    console.error("Error fetching platform stats:", error);
    res.status(500).json({ error: "Failed to fetch platform statistics." });
  }
}

module.exports = { getPlatformStats };
