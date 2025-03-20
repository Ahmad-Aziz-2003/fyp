// // Import Firebase Admin SDK from the firebaseConfig file
// const admin = require("../../config/firebaseConfig");
// const { auth, createUserWithEmailAndPassword,sendPasswordResetEmail,signInWithEmailAndPassword } = require("../../config/firebasefronted");
// const db = admin.database();
// const storage = admin.storage().bucket(); // Access Firebase Storage
// const authAdmin = admin.auth(); // Firebase Auth instance

// async function updateNGOInfo(req, res) {
//     try {
//       const ngoId = req.params.ngoId; // Extract NGO ID from the route parameter
//       const {
//         messageQuote,
//         description,
//         address,
//         contact,
//         categories,
//         type, // Add type to allow updates
//         // Ignored fields
//         name,
//         foundedDate,
//         email,
//         registrationNumber,
//         isVerified,
//         isDeactivated,
//         isProfileCompletion
//       } = req.body;
  
//       // Prevent updates to restricted fields (name, foundedDate, email, registrationNumber, isVerified, isDeactivated, isProfileCompletion)
//       if (name || foundedDate || email || registrationNumber || isVerified || isDeactivated || isProfileCompletion) {
//         return res.status(400).json({ error: "Attempt to modify restricted fields is not allowed." });
//       }
  
//       // Fetch the NGO record from the database
//       const ngoRef = db.ref(`NGOs/${ngoId}`);
//       const snapshot = await ngoRef.once("value");
//       const ngoData = snapshot.val();
  
//       if (!ngoData) {
//         return res.status(404).json({ error: "NGO not found." });
//       }
  
//       // Prepare the update data
//       const updateData = {
//         ...(messageQuote && { messageQuote }),
//         ...(description && { description }),
//         ...(address && {
//           address: {
//             city: address.city || ngoData.address.city,
//             state: address.state || ngoData.address.state,
//             country: address.country || ngoData.address.country,
//             zipCode: address.zipCode || ngoData.address.zipCode,
//             officeLocation: address.officeLocation || ngoData.address.officeLocation,
//           },
//         }),
//         ...(contact && {
//           contact: {
//             phone: contact.phone || ngoData.contact.phone,
//           },
//         }),
//         ...(categories && { categories }),
//         ...(type && { type }), // Allow the type field to be updated
//       };
  
//       console.log("Update Data:", updateData);
  
//       // Update the database
//       await ngoRef.update(updateData);
  
//       // Respond with success and the updated data
//       res.status(200).json({ message: "NGO information updated successfully.", updatedData: updateData });
//     } catch (error) {
//       console.error("Error updating NGO information:", error);
//       res.status(500).json({ error: "Failed to update NGO information." });
//     }
//   }

// module.exports={updateNGOInfo};
// Import Firebase Admin SDK from the firebaseConfig file
const admin = require("../../config/firebaseConfig");
const db = admin.database();
const storage = admin.storage().bucket(); // Firebase Storage

async function updateNGOInfo(req, res) {
    try {

        const ngoId = req.params.ngoId; // Extract NGO ID from the route parameter
        console.log("sdsjn");
        const {
            messageQuote,
            description,
            address,
            contact,
            categories,
            type,
            profilePhoto, // Allow profile photo updates
            isProfileCompletion, // Allow profile completion update
            // Restricted fields (cannot be updated)
            name,
            foundedDate,
            email,
            registrationNumber,
        } = req.body;

        // Prevent updates to restricted fields
        if (name || foundedDate || email || registrationNumber) {
            return res.status(400).json({ error: "Updating name, founded date, email, or registration number is not allowed." });
        }

        // Fetch the existing NGO record from the database
        const ngoRef = db.ref(`NGOs/${ngoId}`);
        const snapshot = await ngoRef.once("value");
        const ngoData = snapshot.val();

        if (!ngoData) {
            return res.status(404).json({ error: "NGO not found." });
        }

        // Prepare the update data
        let updateData = {
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
            ...(type && { type }),
            ...(isProfileCompletion !== undefined && { isProfileCompletion }), // Allow profile completion update
        };

        // Handle profile photo update if provided
        if (req.file) {
            const fileName = `profile_photos/${ngoId}/${Date.now()}-${req.file.originalname}`;
            const file = storage.file(fileName);
            await file.save(req.file.buffer, {
                contentType: req.file.mimetype,
                public: true, // Make the file public
            });

            // Get the file's public URL
            const fileUrl = `https://firebasestorage.googleapis.com/v0/b/${storage.name}/o/${encodeURIComponent(fileName)}?alt=media`;
            updateData.profilePhoto = fileUrl; // Update profile photo URL
        }

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

module.exports = { updateNGOInfo };
