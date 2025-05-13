// Import Firebase Admin SDK from the firebaseConfig file
const admin = require("../../config/firebaseConfig");
const { auth, createUserWithEmailAndPassword,sendPasswordResetEmail,signInWithEmailAndPassword } = require("../../config/firebasefronted");
const db = admin.database();
const storage = admin.storage().bucket(); // Access Firebase Storage
const authAdmin = admin.auth(); // Firebase Auth instance


// async function completeProfile(req, res) {
    
//     try {
//       const ngoId = req.params.ngoId;  // NGO ID from URL parameter
//       const { name, registrationNumber, email, foundedDate, publicMessage, description, type,founder, address, contact, categories } = req.body;
//       const profilePhoto = req.file; // Profile photo from the request
  
//       // Check if the file is provided and if it's a valid image format
//       if (!profilePhoto || !['image/jpeg', 'image/png', 'image/jpg'].includes(profilePhoto.mimetype)) {
//         return res.status(400).json({ error: "Profile photo must be a PNG, JPEG, or JPG image." });
//       }
  
//       // Upload the profile photo to Firebase Storage
//       const fileName = `profile_photos/${ngoId}/${Date.now()}-${profilePhoto.originalname}`;
//       const file = storage.file(fileName);
//       await file.save(profilePhoto.buffer, {
//         contentType: profilePhoto.mimetype,
//         public: true, // Make the file public
//       });
  
//       // Get the file's public URL from Firebase Storage
//       const fileUrl = `https://firebasestorage.googleapis.com/v0/b/${storage.name}/o/${encodeURIComponent(fileName)}?alt=media`;
  
//       // Prepare the updated data for the NGO profile
//       const updatedData = {
//         name,
//         registrationNumber,
//         email,
//         foundedDate,
//         publicMessage,
//         description,
//         type,
//         founder:JSON.parse(founder),
//         address,
//         contact,
//         categories: JSON.parse(categories), // Assuming categories are sent as a JSON string
//         profilePhoto: fileUrl, // Store the URL of the uploaded profile photo
//         isProfileCompletion: true, // Mark the profile as completed
//       };
  
//       // Update the NGO profile in the Realtime Database
//       const ngoRef = db.ref(`NGOs/${ngoId}`);
//       await ngoRef.update(updatedData);
  
//       // Send a success response
//       res.status(200).json({ message: "Profile completed successfully!", ngoId, updatedData });
//     } catch (error) {
//       console.error("Error completing profile:", error);
//       res.status(500).json({ error: "Failed to complete the NGO profile." });
//     }
//   }


async function completeProfile(req, res) {
  try {
    const ngoId = req.params.ngoId;
    const { name, registrationNumber, email, foundedDate, publicMessage, description, type, founder, address, contact, categories } = req.body;
    const profilePhoto = req.file;

    if (!profilePhoto || !['image/jpeg', 'image/png', 'image/jpg'].includes(profilePhoto.mimetype)) {
      return res.status(400).json({ error: "Profile photo must be a PNG, JPEG, or JPG image." });
    }

    const fileName = `profile_photos/${ngoId}/${Date.now()}-${profilePhoto.originalname}`;
    const file = storage.file(fileName);
    await file.save(profilePhoto.buffer, {
      contentType: profilePhoto.mimetype,
      public: true,
    });

    const fileUrl = `https://firebasestorage.googleapis.com/v0/b/${storage.name}/o/${encodeURIComponent(fileName)}?alt=media`;

    const updatedData = {
      name,
      registrationNumber,
      email,
      foundedDate,
      publicMessage,
      description,
      type,
      founder: JSON.parse(founder),
      address,
      contact,
      categories: JSON.parse(categories),
      profilePhoto: fileUrl,
      isProfileCompletion: true,
    };

    const ngoRef = db.ref(`NGOs/${ngoId}`);
    await ngoRef.update(updatedData);

    // Convert timestamp to Asia/Karachi formatted time
    const timestamp = Date.now();
    const formattedDateTime = new Date(timestamp).toLocaleString("en-PK", {
      timeZone: "Asia/Karachi",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    // Store notification
    const notificationRef = db.ref("notifications/adminNotifications").push();
    const notificationData = {
      ngoId,
      ngoName: name,
      message: `${name} has requested profile verification.`,
      timestamp,
      formattedDateTime, // Add readable date and time
      isRead: false
    };
    await notificationRef.set(notificationData);

    res.status(200).json({
      message: "Profile completed successfully!",
      ngoId,
      updatedData
    });
  } catch (error) {
    console.error("Error completing profile:", error);
    res.status(500).json({ error: "Failed to complete the NGO profile." });
  }
}

module.exports={completeProfile}