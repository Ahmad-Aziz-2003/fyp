const admin = require("../config/firebaseConfig");
const db = admin.database();
const storage = admin.storage().bucket(); // Access Firebase Storage
const DOMPurify = require("isomorphic-dompurify");

async function createGoodness(req, res) {
  try {
    // Destructuring the request body and validating it
    const { title, description, ngoId } = req.body;

    if (!title || !description || !ngoId || !req.files || req.files.length === 0) {
      return res.status(400).json({ error: "All fields (title, description, images, ngoId) are required." });
    }

    // Sanitize the description to prevent XSS attacks
    const sanitizedDescription = DOMPurify.sanitize(description);

    // Fetch NGO data from Realtime Database
    const ngoRef = db.ref(`NGOs/${ngoId}`);
    const snapshot = await ngoRef.once("value");
    const ngoData = snapshot.val();

    if (!ngoData) {
      return res.status(404).json({ error: "NGO not found." });
    }

    const ngoName = ngoData.name;

    // Save each image to Firebase Storage and get the image URLs
    const imageUrls = [];
    for (const file of req.files) {
      const fileName = `${Date.now()}-${file.originalname}`; // Create a unique file name
      const fileUpload = storage.file(`goodness_images/${fileName}`);
      
      // Upload the file to Firebase Storage
      await fileUpload.save(file.buffer, { contentType: file.mimetype });

      // Get a signed URL for the uploaded file
      const [imageUrl] = await fileUpload.getSignedUrl({
        action: "read",
        expires: "03-01-2030", // Set an expiration date for the signed URL
      });
      imageUrls.push(imageUrl); // Add the image URL to the array
    }

    // Prepare the data to be saved in the Realtime Database
    const goodnessData = {
      title,
      description: sanitizedDescription,
      imageUrls, // Array of image URLs
      ngoId,
      ngoName,
      createdAt: new Date().toISOString(),
    };

    // Store the goodness data in Realtime Database
    const goodnessRef = db.ref("goodness");
    const newGoodnessRef = goodnessRef.push();
    await newGoodnessRef.set(goodnessData);

    // Respond with a success message
    res.status(201).json({ message: "Goodness post created successfully!" });

  } catch (error) {
    console.error("Error creating goodness post:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}
async function getGoodnessForNgo(req, res) {
    try {
      const { ngoId } = req.params;
  
      // Fetch all goodness posts related to the specific NGO
      const goodnessRef = db.ref("goodness");
      const snapshot = await goodnessRef.orderByChild("ngoId").equalTo(ngoId).once("value");
      
      const goodnessData = snapshot.val();
  
      if (!goodnessData) {
        return res.status(404).json({ error: "No goodness posts found for this NGO." });
      }
  
      res.status(200).json(goodnessData);
    } catch (error) {
      console.error("Error fetching goodness posts:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  }
  
  async function getGoodnessById(req, res) {
    try {
      const { goodnessId } = req.params; // Extract goodnessId from the request params
  
      // Fetch the specific goodness post based on goodnessId
      const goodnessRef = db.ref("goodness").child(goodnessId); // Use child() to access the specific post
      const snapshot = await goodnessRef.once("value");
      
      const goodnessData = snapshot.val();
  
      if (!goodnessData) {
        return res.status(404).json({ error: "Goodness post not found." });
      }
  
      res.status(200).json(goodnessData); // Return the found goodness post
  
    } catch (error) {
      console.error("Error fetching goodness post by ID:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  }
  async function deleteGoodnessById(req, res) {
    try {
      const { goodnessId } = req.params; // Extract goodnessId from the request params
      console.log(goodnessId);
      // Reference to the specific goodness post in the Realtime Database
      const goodnessRef = db.ref("goodness").child(goodnessId);
  
      // Check if the goodness post exists
      const snapshot = await goodnessRef.once("value");
  
      if (!snapshot.exists()) {
        return res.status(404).json({ error: "Goodness post not found." });
      }
  
      // Delete the goodness post from the Realtime Database
      await goodnessRef.remove();
  
      // Optionally, delete images from Firebase Storage
      // (Ensure you want to delete these images as well)
      const imageUrls = snapshot.val().imageUrls || [];
      for (const imageUrl of imageUrls) {
        const fileName = imageUrl.split("/").pop(); // Extract file name from URL
        const fileRef = storage.file(`goodness_images/${fileName}`);
        await fileRef.delete(); // Delete the image from Firebase Storage
      }
  
      // Respond with a success message
      res.status(200).json({ message: "Goodness post deleted successfully." });
    } catch (error) {
      console.error("Error deleting goodness post:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  }
module.exports = { createGoodness,getGoodnessForNgo,getGoodnessById,deleteGoodnessById };

// const admin = require("../config/firebaseConfig");
// const db = admin.database();
// const storage = admin.storage().bucket(); // Access Firebase Storage
// const DOMPurify = require("isomorphic-dompurify");

// async function createGoodness(req, res) {
//     try {
//       const { title, description, ngoId } = req.body;
  
//       if (!title || !description || !ngoId || !req.files || req.files.length === 0) {
//         return res.status(400).json({ error: "All fields (title, description, images, ngoId) are required." });
//       }
  
//       // Sanitize the description
//       const sanitizedDescription = DOMPurify.sanitize(description);
  
//       // Fetch NGO data from Realtime Database
//       const ngoRef = db.ref(`NGOs/${ngoId}`);
//       const snapshot = await ngoRef.once("value");
//       const ngoData = snapshot.val();
  
//       if (!ngoData) {
//         return res.status(404).json({ error: "NGO not found." });
//       }
  
//       const ngoName = ngoData.name;
  
//       // Save each image to Firebase Storage
//       const imageUrls = [];
//       for (const file of req.files) {
//         const fileName = `${Date.now()}-${file.originalname}`;
//         const fileUpload = storage.file(`goodness_images/${fileName}`);
//         await fileUpload.save(file.buffer, { contentType: file.mimetype });
  
//         const [imageUrl] = await fileUpload.getSignedUrl({
//           action: "read",
//           expires: "03-01-2030", // Set an expiration date
//         });
//         imageUrls.push(imageUrl);
//       }
  
//       // Prepare data to store in the Realtime Database
//       const goodnessData = {
//         title,
//         description: sanitizedDescription,
//         imageUrls, // Array of image URLs
//         ngoId,
//         ngoName,
//         createdAt: new Date().toISOString(),
//       };
  
//       // Store the data in Realtime Database
//       const goodnessRef = db.ref("goodness");
//       const newGoodnessRef = goodnessRef.push();
//       await newGoodnessRef.set(goodnessData);
  
//       res.status(201).json({ message: "Goodness post created successfully!" });
//     } catch (error) {
//       console.error("Error creating goodness post:", error);
//       res.status(500).json({ error: "Internal server error." });
//     }
//   }
  
// module.exports = { createGoodness };


// async function createGoodness(req, res) {
//   try {
//     const { title, description, ngoId } = req.body;

//     if (!title || !description || !ngoId || !req.file) {
//       return res.status(400).json({ error: "All fields (title, description, image, ngoId) are required." });
//     }
//     console.log(ngoId);
//     // Sanitize the description
//     const sanitizedDescription = DOMPurify.sanitize(description);
  
//     // Fetch NGO data from Realtime Database
//     const ngoRef = db.ref(`NGOs/${ngoId}`);
//     const snapshot = await ngoRef.once("value");
//     const ngoData = snapshot.val();
//     if (!ngoData) {
//         return res.status(404).json({ error: "NGO not found." });
//       }

//     const ngoName = ngoData.name;
//     console.log(ngoName);
//     // Save the image to Firebase Storage
//     const file = req.file;
//     const fileName = `${Date.now()}-${file.originalname}`;
//     const fileUpload = storage.file(`goodness_images/${fileName}`);
//     await fileUpload.save(file.buffer, { contentType: file.mimetype });

//     // Get the public URL of the uploaded image
//     const imageUrl = await fileUpload.getSignedUrl({
//       action: "read",
//       expires: "03-01-2030", // Set an expiration date
//     });

//     // Prepare data to store in the Realtime Database
//     const goodnessData = {
//       title,
//       description: sanitizedDescription,
//       imageUrl: imageUrl[0],
//       ngoId,
//       ngoName,
//       createdAt: new Date().toISOString(), // Add the current date and time
//     };

//     // Store the data in Realtime Database
//     const goodnessRef = db.ref("goodness");
//     const newGoodnessRef = goodnessRef.push();
//     await newGoodnessRef.set(goodnessData);

//     res.status(201).json({ message: "Goodness post created successfully!" });
//   } catch (error) {
//     console.error("Error creating goodness post:", error);
//     res.status(500).json({ error: "Internal server error." });
//   }
// }