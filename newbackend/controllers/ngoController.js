//ngoController.js file

// Import Firebase Admin SDK from the firebaseConfig file
const admin = require("../config/firebaseConfig");
const { auth, createUserWithEmailAndPassword,sendPasswordResetEmail,signInWithEmailAndPassword } = require("../config/firebasefronted");
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

async function registerNGO(req, res) {
  try {
    const { email, registrationNumber, password, name, foundedDate } = req.body;

    // Validate required fields
    if (!email || !registrationNumber || !password || !name || !foundedDate) {
      return res.status(400).json({ error: "All required fields must be filled." });
    }

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
      isVerified: true, // Default value
      isDeactivated: true, // Default value
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
      volunteerDetails: "",
    };

    // Save NGO data with the NGO ID as the key in Firebase Realtime Database
    await ngoRef.child(ngoId).set(initialData);

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



  
async function completeProfile(req, res) {
    
    try {
      const ngoId = req.params.ngoId;  // NGO ID from URL parameter
      const { name, registrationNumber, email, foundedDate, publicMessage, description, type,founder, address, contact, categories } = req.body;
      const profilePhoto = req.file; // Profile photo from the request
  
      // Check if the file is provided and if it's a valid image format
      if (!profilePhoto || !['image/jpeg', 'image/png', 'image/jpg'].includes(profilePhoto.mimetype)) {
        return res.status(400).json({ error: "Profile photo must be a PNG, JPEG, or JPG image." });
      }
  
      // Upload the profile photo to Firebase Storage
      const fileName = `profile_photos/${ngoId}/${Date.now()}-${profilePhoto.originalname}`;
      const file = storage.file(fileName);
      await file.save(profilePhoto.buffer, {
        contentType: profilePhoto.mimetype,
        public: true, // Make the file public
      });
  
      // Get the file's public URL from Firebase Storage
      const fileUrl = `https://firebasestorage.googleapis.com/v0/b/${storage.name}/o/${encodeURIComponent(fileName)}?alt=media`;
  
      // Prepare the updated data for the NGO profile
      const updatedData = {
        name,
        registrationNumber,
        email,
        foundedDate,
        publicMessage,
        description,
        type,
        founder:JSON.parse(founder),
        address,
        contact,
        categories: JSON.parse(categories), // Assuming categories are sent as a JSON string
        profilePhoto: fileUrl, // Store the URL of the uploaded profile photo
        isProfileCompletion: true, // Mark the profile as completed
      };
  
      // Update the NGO profile in the Realtime Database
      const ngoRef = db.ref(`NGOs/${ngoId}`);
      await ngoRef.update(updatedData);
  
      // Send a success response
      res.status(200).json({ message: "Profile completed successfully!", ngoId, updatedData });
    } catch (error) {
      console.error("Error completing profile:", error);
      res.status(500).json({ error: "Failed to complete the NGO profile." });
    }
  }

// async function signinNGO(req, res) {
//     console.log("Signin request received");
//     try {
//       const { email, password } = req.body;
  
//       // Validate required fields
//       if (!email || !password) {
//         return res.status(400).json({ error: "Email and password are required." });
//       }
  
//       // Fetch NGO data from Realtime Database
//       const ngoRef = db.ref("NGOs");
//       const snapshot = await ngoRef.orderByChild("email").equalTo(email).once("value");
//       const ngos = snapshot.val();
//       console.log("NGO data from Realtime DB:", ngos);
  
//       if (!ngos || Object.values(ngos)[0].password !== password) {
//         console.log("Incorrect email/password or no NGO data found");
//         return res.status(401).json({ error: "Invalid email or password." });
//       }
  
//       // Get NGO details
//       const ngoId = Object.keys(ngos)[0];
//       const ngoData = ngos[ngoId];
  
//       // Check if profile is complete and send appropriate response
//       if (ngoData.isProfileCompletion) {
//         // If profile is complete, return only the required details
//         return res.status(200).json({
//           message: "Sign-in successful.",
//           ngoId, // Include NGO ID in the response
//           isProfileCompletion: ngoData.isProfileCompletion, // Return the profile completion status
//         });
//       } else {
//         // If profile is incomplete, return the NGO data along with the profile completion status
//         return res.status(200).json({
//           message: "Sign-in successful, profile completion required.",
//           ngoId, // Include NGO ID in the response
//           isProfileCompletion: ngoData.isProfileCompletion, // Return the profile completion status
//           email: ngoData.email, // Include NGO email
//           name: ngoData.name, // Include NGO name
//           registrationNumber: ngoData.registrationNumber, // Include NGO registration number
//           foundedDate: ngoData.foundedDate, // Include NGO founded date
//         });
//       }
  
//     } catch (error) {
//       console.error("Error signing in NGO:", error);
//       res.status(500).json({ error: "Failed to sign in NGO." });
//     }
//   }


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


  async function getNGOData(req, res) {
    try {
      const ngoId = req.params.ngoId; // Extract NGO ID from the route parameter
  
      // Fetch NGO data from Realtime Database
      const ngoRef = db.ref(`NGOs/${ngoId}`);
      const snapshot = await ngoRef.once("value");
      const ngoData = snapshot.val();
  
      if (!ngoData) {
        return res.status(404).json({ error: "NGO not found." });
      }
  
      // Filter out unwanted fields
      const { name, email, registrationNumber, profilePhoto, description, address, contact, categories } = ngoData;
  
      // Prepare the response object
      const filteredData = {
        name,
        email,
        registrationNumber,
        profilePhoto,
        description,
        address,
        contact,
        categories,
      };
  
      // Send the filtered data
      res.status(200).json({ message: "NGO data retrieved successfully", ngoId, ngoData: filteredData });
    } catch (error) {
      console.error("Error fetching NGO data:", error);
      res.status(500).json({ error: "Failed to fetch NGO data." });
    }
  }

  async function changePassword(req, res) {
    try {
      const ngoId = req.params.ngoId; // NGO ID from the URL
      const { currentPassword, newPassword } = req.body;
  
      // Validate required fields
      if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: "Both current and new passwords are required." });
      }
  
      // Fetch NGO data from Realtime Database
      const ngoRef = db.ref(`NGOs/${ngoId}`);
      const snapshot = await ngoRef.once("value");
      const ngoData = snapshot.val();
  
      if (!ngoData) {
        return res.status(404).json({ error: "NGO not found." });
      }
  
      // Check if the current password matches
      if (ngoData.password !== currentPassword) {
        return res.status(401).json({ error: "Current password is incorrect." });
      }
  
      // Update the password
      await ngoRef.update({ password: newPassword });
  
      // Respond with success
      res.status(200).json({ message: "Password updated successfully." });
    } catch (error) {
      console.error("Error changing password:", error);
      res.status(500).json({ error: "Failed to change password." });
    }
  }

  async function updateNGOInfo(req, res) {
    try {
      const ngoId = req.params.ngoId; // Extract NGO ID from the route parameter
      const {
        messageQuote,
        description,
        address,
        contact,
        categories,
        type, // Add type to allow updates
        // Ignored fields
        name,
        foundedDate,
        email,
        registrationNumber,
        isVerified,
        isDeactivated,
        isProfileCompletion
      } = req.body;
  
      // Prevent updates to restricted fields (name, foundedDate, email, registrationNumber, isVerified, isDeactivated, isProfileCompletion)
      if (name || foundedDate || email || registrationNumber || isVerified || isDeactivated || isProfileCompletion) {
        return res.status(400).json({ error: "Attempt to modify restricted fields is not allowed." });
      }
  
      // Fetch the NGO record from the database
      const ngoRef = db.ref(`NGOs/${ngoId}`);
      const snapshot = await ngoRef.once("value");
      const ngoData = snapshot.val();
  
      if (!ngoData) {
        return res.status(404).json({ error: "NGO not found." });
      }
  
      // Prepare the update data
      const updateData = {
        ...(messageQuote && { messageQuote }),
        ...(description && { description }),
        ...(address && {
          address: {
            city: address.city || ngoData.address.city,
            state: address.state || ngoData.address.state,
            country: address.country || ngoData.address.country,
            zipCode: address.zipCode || ngoData.address.zipCode,
            officeLocation: address.officeLocation || ngoData.address.officeLocation,
          },
        }),
        ...(contact && {
          contact: {
            phone: contact.phone || ngoData.contact.phone,
          },
        }),
        ...(categories && { categories }),
        ...(type && { type }), // Allow the type field to be updated
      };
  
      console.log("Update Data:", updateData);
  
      // Update the database
      await ngoRef.update(updateData);
  
      // Respond with success and the updated data
      res.status(200).json({ message: "NGO information updated successfully.", updatedData: updateData });
    } catch (error) {
      console.error("Error updating NGO information:", error);
      res.status(500).json({ error: "Failed to update NGO information." });
    }
  }
  
  
module.exports = { registerNGO,completeProfile,signinNGO ,getNGOData,changePassword,updateNGOInfo,forgotPassword};

  
  

