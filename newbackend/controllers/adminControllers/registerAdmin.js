const admin = require("../../config/firebaseConfig");
const { auth, createUserWithEmailAndPassword } = require("../../config/firebasefronted");

const db = admin.database();
const authAdmin = admin.auth(); // Firebase Auth instance

async function registerAdmin(req, res) {
  try {
    const { email, password, name } = req.body;

    // Validate required fields
    if (!email || !password || !name) {
      return res.status(400).json({ error: "All required fields must be filled." });
    }

    // Check if the admin already exists in Realtime Database
    const adminRef = db.ref("Admins");
    const snapshot = await adminRef.once("value");
    const admins = snapshot.val();

    const exists = Object.values(admins || {}).some(admin => admin.email === email);

    if (exists) {
      return res.status(400).json({ error: "Admin with this email already exists." });
    }

    // Create a new admin user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const adminId = user.uid;

    // Admin data structure
    const adminData = {
      email,
      name,
      role: "admin",
      createdAt: new Date().toISOString(),
    };

    // Store admin data in the database
    await adminRef.child(adminId).set(adminData);

    res.status(201).json({
      message: "Admin registered successfully",
      adminId,
      adminData,
    });

  } catch (error) {
    console.error("Error registering admin:", error);
    res.status(500).json({ error: "Failed to register admin" });
  }
}

module.exports = { registerAdmin };
