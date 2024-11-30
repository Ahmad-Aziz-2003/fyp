const admin = require("../../config/firebaseConfig");
const { auth, createUserWithEmailAndPassword,sendPasswordResetEmail,signInWithEmailAndPassword } = require("../../config/firebasefronted");
const db = admin.database();
const storage = admin.storage().bucket(); // Access Firebase Storage
const authAdmin = admin.auth(); // Firebase Auth instance

async function forgotPassword(req, res) {

  try {
    const { email } = req.body;

    // Check if the email is provided
    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }

    // // Send a password reset email via Firebase Authentication
    // await authAdmin.generatePasswordResetLink(email);

     // Send a password reset email via Firebase Authentication
     await sendPasswordResetEmail(auth, email);

    // Respond with a success message
    res.status(200).json({ message: "Password reset email sent successfully." });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    res.status(500).json({ error: "Failed to send password reset email." });
  }
}

module.exports={forgotPassword}