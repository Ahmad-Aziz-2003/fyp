const admin = require("../../../config/firebaseConfig");
const { auth, signInWithEmailAndPassword } = require("../../../config/firebasefronted");

const db = admin.database();
const authAdmin = admin.auth(); // Firebase Auth instance

async function adminSignin(req, res) {
    console.time('adminSignin');
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required." });
        }

        // Step 1: Authenticate using Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Step 2: Fetch Admin data from Realtime Database using the email address
        const adminRef = db.ref("Admins");
        const snapshot = await adminRef.orderByChild("email").equalTo(email).once("value");
        const admins = snapshot.val();

        // If no admin data found for the email
        if (!admins) {
            console.log("No Admin data found for the email");
            return res.status(404).json({ error: "No Admin found with this email." });
        }

        // Step 3: Extract the admin details
        const adminId = Object.keys(admins)[0];
        const adminData = admins[adminId];

        // Step 4: Return successful response with admin details
        res.status(200).json({
            message: "Admin sign-in successful.",
            adminId, // Firebase Admin ID
            email: user.email, // Admin email
            token: await user.getIdToken(), // Firebase ID token
            name: adminData.name, // Admin name
            role: adminData.role, // Admin role
        });

    } catch (error) {
        console.error("Error signing in Admin:", error);
        if (error.code === 'auth/user-not-found') {
            return res.status(404).json({ error: "Admin not found." });
        } else if (error.code === 'auth/invalid-email') {
            return res.status(400).json({ error: "Invalid email format." });
        } else if (error.code === 'auth/wrong-password') {
            return res.status(401).json({ error: "Invalid password." });
        } else {
            res.status(500).json({ error: "Failed to sign in Admin." });
        }
    }
    console.timeEnd('adminSignin');
}

module.exports = { adminSignin };
