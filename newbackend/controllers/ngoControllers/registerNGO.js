// Import Firebase Admin SDK from the firebaseConfig file
const admin = require("../../config/firebaseConfig");
const { auth, createUserWithEmailAndPassword,sendPasswordResetEmail,signInWithEmailAndPassword } = require("../../config/firebasefronted");
const db = admin.database();
const storage = admin.storage().bucket(); // Access Firebase Storage
const authAdmin = admin.auth(); // Firebase Auth instance

async function registerNGO(req, res) {
    try {
      const { email, registrationNumber, password, name, foundedDate } = req.body;
  
      // Validate required fields
      if (!email || !registrationNumber || !password || !name || !foundedDate) {
        return res.status(400).json({ error: "All required fields must be filled." });
      }
  console.log("hhhello")
      // Check if email or registration number already exists in Realtime Database
      const ngoRef = db.ref("NGOs");
      const snapshot = await ngoRef.once("value");
      const ngos = snapshot.val();
  
      const exists = Object.values(ngos || {}).some(
        (ngo) => ngo.email === email || ngo.registrationNumber === registrationNumber
      );
  
      if (exists) {
        return res.status(400).json({ error: "Email or registration number already exists." });
      }
      console.log("hello ia am in");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      console.log("hhhello")
      // // Use a custom UID as the NGO ID (can be a generated ID or another unique field)
      const ngoId=user.uid;
  
      // const ngoId = Date.now().toString();  // For example, using the current timestamp as the unique ID
      // Prepare the initial data for the NGO
      const initialData = {
        email,
        registrationNumber,
        password, // Store password only if necessary (preferably hashed)
        name,
        foundedDate,
        isVerified: false, // Default value
        isDeactivated: false, // Default value
        isProfileCompletion: false,
        messageQuote: "",
        description: "",
        founder:[],
        address: {
          city: "",
          state: "",
          country: "",
          zipCode: "",
          officeLocation:""
        },
        contact: {
          phone: "",
          email: email,
        },
        categories: [],
        isRequestingVolunteers: false,
        volunteerDetails: {
          purpose:"",
          location:"",
          noOfvolunteer:"",
          desc:"",
        },
      };
  
      console.log("hhhello")
      // Save NGO data with the NGO ID as the key in Firebase Realtime Database
      await ngoRef.child(ngoId).set(initialData);
  
      console.log("hhhello")
      // Send a successful response including the ngoId and initialData
      res.status(201).json({
        message: "NGO registered successfully",
        ngoId,
        ngoData: initialData,
        
      });
    } catch (error) {
      console.error("Error registering NGO:", error);
      res.status(500).json({ error: "Failed to register NGO" });
    }
  }
  
module.exports= {registerNGO};
  
  