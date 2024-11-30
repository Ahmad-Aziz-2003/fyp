// Import Firebase Admin SDK from the firebaseConfig file
const admin = require("../../config/firebaseConfig");
const { auth, createUserWithEmailAndPassword,sendPasswordResetEmail,signInWithEmailAndPassword } = require("../../config/firebasefronted");
const db = admin.database();
const storage = admin.storage().bucket(); // Access Firebase Storage
const authAdmin = admin.auth(); // Firebase Auth instance

async function signinNGO(req, res) {
    console.time('signinNGO');
    try {
      const { email, password } = req.body;
  
      // Validate required fields
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
      }
  
      // Step 1: Authenticate using Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth,email, password);
      const user = userCredential.user;
  
      // Step 2: Fetch NGO data from Realtime Database using the email address
      const ngoRef = db.ref("NGOs");
      const snapshot = await ngoRef.orderByChild("email").equalTo(email).once("value");
      const ngos = snapshot.val();
  
      // If no NGO data found for the email
      if (!ngos) {
        console.log("No NGO data found for the email");
        return res.status(404).json({ error: "No NGO found with this email." });
      }
  
      // Step 3: Check if the password matches the one in the database
      const ngoId = Object.keys(ngos)[0];
      const ngoData = ngos[ngoId];
  
      if (ngoData.password !== password) {
        console.log("Incorrect password");
        return res.status(401).json({ error: "Incorrect password." });
      }
  
      // Step 4: Check if the profile is complete
      if (ngoData.isProfileCompletion) {
        // If profile is complete, return only the required details
        res.status(200).json({
          message: "Sign-in successful.",
          userId: user.uid, // Include Firebase UID
          email: user.email, // Include the email from Firebase
          token: await user.getIdToken(), // Include the Firebase ID token
          ngoId, // Include NGO ID in the response
          isProfileCompletion: ngoData.isProfileCompletion, // Return the profile completion status
        });
      } else {
        // If profile is incomplete, return the NGO data along with the profile completion status
        res.status(200).json({
          message: "Sign-in successful, profile completion required.",
          userId: user.uid, // Include Firebase UID
          email: user.email, // Include the email from Firebase
          token: await user.getIdToken(), // Include the Firebase ID token
          ngoId, // Include NGO ID in the response
          isProfileCompletion: ngoData.isProfileCompletion, // Return the profile completion status
          email: ngoData.email, // Include NGO email
          name: ngoData.name, // Include NGO name
          registrationNumber: ngoData.registrationNumber, // Include NGO registration number
          foundedDate: ngoData.foundedDate, // Include NGO founded date
        });
      }
  
    } catch (error) {
      console.error("Error signing in NGO:", error);
      if (error.code === 'auth/user-not-found') {
        return res.status(404).json({ error: "User not found." });
      } else if (error.code === 'auth/invalid-email') {
        return res.status(400).json({ error: "Invalid email format." });
      } else if (error.code === 'auth/wrong-password') {
        return res.status(401).json({ error: "Invalid password." });
      } else {
        res.status(500).json({ error: "Failed to sign in NGO." });
      }
    }
    console.timeEnd('signinNGO');
  }

module.exports={signinNGO};