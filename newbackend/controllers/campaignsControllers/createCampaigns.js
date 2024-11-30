const admin = require("../../config/firebaseConfig");
const db = admin.database();
const storage = admin.storage().bucket(); // Access Firebase Storage
const DOMPurify = require("isomorphic-dompurify");

async function createCampaigns(req, res) {
  try {
    // Destructuring the request body and validating it
    const { title, description, ngoId, startDate, endDate, targetAmount } = req.body;

    if (!title || !description || !ngoId || !targetAmount) {
      return res.status(400).json({
        error: "Title, description, NGO ID, and target amount are required.",
      });
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

    // Save each image to Firebase Storage and get the image URLs (if images are provided)
    const imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const originalName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, ""); // Sanitize file name
        const fileName = `${Date.now()}-${originalName}`;
        const fileUpload = storage.file(`campaign_images/${fileName}`);

        // Upload the file to Firebase Storage
        await fileUpload.save(file.buffer, { contentType: file.mimetype });

        // Get a signed URL for the uploaded file
        const [imageUrl] = await fileUpload.getSignedUrl({
          action: "read",
          expires: "03-01-2030", // Set an expiration date for the signed URL
        });
        imageUrls.push(imageUrl);
      }
    }

    // Set campaign dates
    const currentDate = new Date().toISOString();
    const start = startDate || currentDate; // Use the provided startDate or the current date
    const end = endDate || null; // End date is optional

    // Prepare the data to be saved in the Realtime Database
    const campaignData = {
      title,
      description: sanitizedDescription,
      imageUrls, // Array of image URLs
      ngoId,
      ngoName,
      targetAmount: parseFloat(targetAmount), // Ensure the target amount is stored as a number
      progressAmount: 0, // Initially 0
      isDeactivated: false, // Default to active
      startDate: start,
      endDate: end,
      createdAt: currentDate,
      isEdited: false,
    };

    // Store the campaign data in Realtime Database
    const campaignsRef = db.ref("campaigns");
    const newCampaignRef = campaignsRef.push();
    await newCampaignRef.set(campaignData);

    // Respond with a success message
    res.status(201).json({ message: "Campaign created successfully!" });
  } catch (error) {
    console.error("Error creating campaign:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

module.exports = { createCampaigns };
