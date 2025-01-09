const admin = require("../../config/firebaseConfig");
const db = admin.database();

async function deleteProjectById(req, res) {
  try {
    const { projectId } = req.params;

    // Validate the projectId parameter
    if (!projectId) {
      return res.status(400).json({ error: "Project ID is required." });
    }

    // Reference the project in the database
    const projectRef = db.ref("projects").child(projectId);

    // Check if the project exists
    const snapshot = await projectRef.once("value");
    if (!snapshot.exists()) {
      return res.status(404).json({ error: "Project not found." });
    }

    // Delete the project from the database
    await projectRef.remove();

    // Respond with a success message
    res.status(200).json({ message: "Project deleted successfully." });
  } catch (error) {
    console.error("Error deleting project by ID:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

module.exports = { deleteProjectById };
