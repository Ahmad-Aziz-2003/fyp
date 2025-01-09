const admin = require("../../config/firebaseConfig");
const db = admin.database();
const storage = admin.storage().bucket(); // Access Firebase Storage
const DOMPurify = require("isomorphic-dompurify");

async function createProject(req, res) {
    try {
      // Destructuring the request body and validating required fields
      const {
        projectTitle,
        location,
        estimatedBudget,
        startDate,
        expectedEndDate,
        description,
        category,
        status, // single status field (ongoing, completed, or future)
      } = req.body;
  
      const ngoId = req.params.ngoId; // Get NGO ID from params
  
      if (!ngoId || !projectTitle || !location || !estimatedBudget || !startDate || !expectedEndDate || !category || !status) {
        return res.status(400).json({
          error: "NGO ID, project title, location, estimated budget, start date, expected end date, category, and status are required.",
        });
      }
  
      // Convert status to lowercase before validation
      const normalizedStatus = status.toLowerCase();
  
      // Validate the status
      const validStatuses = ["ongoing", "completed", "future"];
      if (!validStatuses.includes(normalizedStatus)) {
        return res.status(400).json({
          error: "Status must be one of 'ongoing', 'completed', or 'future'.",
        });
      }
  
      // Fetch NGO details from the database
      const ngoRef = db.ref(`NGOs/${ngoId}`);
      const ngoSnapshot = await ngoRef.once("value");
  
      if (!ngoSnapshot.exists()) {
        return res.status(404).json({ error: "NGO not found with the provided ID." });
      }
  
      const ngoData = ngoSnapshot.val();
      const ngoName = ngoData.name; // Assuming the NGO's name is stored under the 'name' key
  
      // Sanitize the description if provided
      const sanitizedDescription = description ? DOMPurify.sanitize(description) : null;
  
      // Save each image to Firebase Storage and get the image URLs (if images are provided)
      const imageUrls = [];
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const originalName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, ""); // Sanitize file name
          const fileName = `${Date.now()}-${originalName}`;
          const fileUpload = storage.file(`project_images/${fileName}`);
  
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
  
      // Set project dates
      const currentDate = new Date().toISOString();
      const start = startDate || currentDate; // Use the provided startDate or the current date
      const expectedEnd = expectedEndDate || null; // Expected end date is required
  
      // Prepare the data to be saved in the Realtime Database
      const projectData = {
        ngoId, // Associate the project with the NGO ID
        ngoName, // Add the NGO name
        projectTitle,
        location,
        estimatedBudget: parseFloat(estimatedBudget), // Ensure the budget is stored as a number
        startDate: start,
        expectedEndDate: expectedEnd,
        description: sanitizedDescription,
        imageUrls, // Array of image URLs
        category, // Project category/type (e.g., education, disaster relief, etc.)
        status: normalizedStatus, // Store the normalized (lowercase) status
        createdDate: currentDate, // Add created date
        isEdited: false, // Initially not edited
      };
  
      // Store the project data in Realtime Database
      const projectsRef = db.ref("projects");
      const newProjectRef = projectsRef.push();
      await newProjectRef.set(projectData);
  
      // Respond with a success message
      res.status(201).json({ message: "Project created successfully!" });
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  }
  
  module.exports = { createProject };
  