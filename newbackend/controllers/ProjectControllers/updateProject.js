const admin = require("../../config/firebaseConfig");
const db = admin.database();
const DOMPurify = require("isomorphic-dompurify");
// const storage = admin.storage().bucket(); // Commented out storage for now

async function updateProject(req, res) {
  try {
    const { projectId } = req.params;
    const { projectTitle, description, location, estimatedBudget, startDate, expectedEndDate, category, status } = req.body;
    // const images = req.files || []; // Commented out image handling for now

    if (!projectId || !projectTitle || !description || !location || !estimatedBudget || !category || !status) {
      return res.status(400).json({
        error: "All fields (projectId, projectTitle, description, location, estimatedBudget, category, status) are required.",
      });
    }

    // Sanitize description to prevent XSS
    const sanitizedDescription = DOMPurify.sanitize(description);

    // Fetch the existing project from Realtime Database
    const projectRef = db.ref("projects").child(projectId);
    const snapshot = await projectRef.once("value");
    const projectData = snapshot.val();

    if (!projectData) {
      return res.status(404).json({ error: "Project not found." });
    }

    // const oldImageUrls = projectData.imageUrls || []; // Commented out image handling for now

    // Log old images to track the process
    // console.log("Old Image URLs:", oldImageUrls); // Commented out for now

    // Upload new images
    /*
    const newImageUrls = [];
    for (const file of images) {
      const fileName = `${Date.now()}-${file.originalname.replace(/[^a-zA-Z0-9._-]/g, "")}`;
      const fileUpload = storage.file(`project_images/${fileName}`);

      await fileUpload.save(file.buffer, { contentType: file.mimetype });

      const [imageUrl] = await fileUpload.getSignedUrl({
        action: "read",
        expires: "03-01-2030",
      });
      newImageUrls.push(imageUrl);
    }
    */

    // Update the project in the Realtime Database
    const updatedData = {
      projectTitle,
      description: sanitizedDescription,
      location,
      estimatedBudget: parseFloat(estimatedBudget),
      startDate: startDate || projectData.startDate,
      expectedEndDate: expectedEndDate || projectData.expectedEndDate,
      category,
      status: status.toLowerCase(),
      // imageUrls: newImageUrls, // Commented out image handling for now
      updatedAt: new Date().toISOString(),
      isEdited: true,
    };

    await projectRef.update(updatedData);

    // Now delete the old images from Firebase Storage
    /*
    for (const imageUrl of oldImageUrls) {
      try {
        const fileName = decodeURIComponent(imageUrl.split("/").pop().split("?")[0]);
        const fileRef = storage.file(`project_images/${fileName}`);
        await fileRef.delete();
      } catch (error) {
        console.error(`Error deleting image: ${imageUrl}`, error);
      }
    }
    */

    res.status(200).json({ message: "Project updated successfully!" });
    console.log("Updated project successfully.");
} catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

module.exports = { updateProject };
