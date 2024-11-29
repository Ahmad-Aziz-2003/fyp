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
        // Sanitize the original file name
        const originalName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, ""); // Remove special characters
        const fileName = `${Date.now()}-${originalName}`; // Create a unique file name
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
        isEdited:false,
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

async function getGoodnessById(req, res) {
    try {
      const { goodnessId } = req.params;
  
      if (!goodnessId) {
        return res.status(400).json({ error: "Goodness ID is required." });
      }
  
      const goodnessRef = db.ref("goodness").child(goodnessId);
      const snapshot = await goodnessRef.once("value");
  
      if (!snapshot.exists()) {
        return res.status(404).json({ error: "Goodness post not found." });
      }
  
      res.status(200).json(snapshot.val());
    } catch (error) {
      console.error("Error fetching goodness post by ID:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  }
  
  async function deleteGoodnessById(req, res) {
    try {
      const { goodnessId } = req.params;
  
      if (!goodnessId) {
        return res.status(400).json({ error: "Goodness ID is required." });
      }
  
      const goodnessRef = db.ref("goodness").child(goodnessId);
      const snapshot = await goodnessRef.once("value");
  
      if (!snapshot.exists()) {
        return res.status(404).json({ error: "Goodness post not found." });
      }
  
      const goodnessData = snapshot.val();
      const imageUrls = goodnessData.imageUrls || [];
  
      // Delete the goodness post from the database
      await goodnessRef.remove();
  
      // Delete images from Firebase Storage
      for (const imageUrl of imageUrls) {
        try {
          const fileName = decodeURIComponent(imageUrl.split("/").pop().split("?")[0]); // Handle query strings
          const fileRef = storage.file(`goodness_images/${fileName}`);
          await fileRef.delete();
        } catch (error) {
          console.error(`Error deleting image: ${imageUrl}`, error);
        }
      }
  
      res.status(200).json({ message: "Goodness post deleted successfully." });
    } catch (error) {
      console.error("Error deleting goodness post:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  }
  
async function updateGoodness(req, res) {
    try {
      const { title, description, goodnessId } = req.body;
      const images = req.files || [];
  
      if (!goodnessId || !title || !description) {
        return res.status(400).json({ error: 'All fields (title, description, goodnessId) are required.' });
      }
  
      // Sanitize description to prevent XSS
      const sanitizedDescription = DOMPurify.sanitize(description);
  
      // Fetch the existing goodness post from Realtime Database
      const goodnessRef = db.ref('goodness').child(goodnessId);
      const snapshot = await goodnessRef.once('value');
      const goodnessData = snapshot.val();
  
      if (!goodnessData) {
        return res.status(404).json({ error: 'Goodness post not found.' });
      }
  
      const oldImageUrls = goodnessData.imageUrls || [];
  
      // Log the old images to ensure you're deleting the correct ones
      console.log("Old Image URLs:", oldImageUrls);
       // Now delete the old images from Firebase Storage
       for (const imageUrl of oldImageUrls) {
        try {
          const fileName = decodeURIComponent(imageUrl.split('/').pop().split('?')[0]);
          const fileRef = storage.file(`goodness_images/${fileName}`);
          await fileRef.delete();
        } catch (error) {
          console.error(`Error deleting image: ${imageUrl}`, error);
        }
      }
          // Save each image to Firebase Storage and get the image URLs
          const newimageUrls = [];
          for (const file of req.files) {
            // Sanitize the original file name
            const originalName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, ""); // Remove special characters
            const fileName = `${Date.now()}-${originalName}`; // Create a unique file name
            const fileUpload = storage.file(`goodness_images/${fileName}`);
            
            // Upload the file to Firebase Storage
            await fileUpload.save(file.buffer, { contentType: file.mimetype });
      
            // Get a signed URL for the uploaded file
            const [imageUrl] = await fileUpload.getSignedUrl({
              action: "read",
              expires: "03-01-2030", // Set an expiration date for the signed URL
            });
            newimageUrls.push(imageUrl); // Add the image URL to the array
          }
     console.log(newimageUrls);
  
      // Update the post in the Realtime Database
      const updatedData = {
        title,
        description: sanitizedDescription,
        imageUrls: newimageUrls,
        updatedAt: new Date().toISOString(),
        isEdited: true,
      };
  
      await goodnessRef.update(updatedData);
  
     
  
      res.status(200).json({ message: 'Goodness post updated successfully!' });
    } catch (error) {
      console.error('Error updating goodness post:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  }
  

module.exports = { createGoodness,getGoodnessForNgo,getGoodnessById,deleteGoodnessById ,updateGoodness};
