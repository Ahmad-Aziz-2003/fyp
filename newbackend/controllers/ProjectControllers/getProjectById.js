const admin = require("../../config/firebaseConfig");
const db = admin.database();

async function getProjectById(req, res) {
  try {
    const { projectId } = req.params;

    // Validate the projectId parameter
    if (!projectId) {
      return res.status(400).json({ error: "Project ID is required." });
    }

    // Reference the project in the database
    const projectRef = db.ref("projects").child(projectId);
    const snapshot = await projectRef.once("value");

    // Check if the project exists
    if (!snapshot.exists()) {
      return res.status(404).json({ error: "Project not found." });
    }

    // Respond with the project data
    res.status(200).json(snapshot.val());
  } catch (error) {
    console.error("Error fetching project by ID:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

module.exports = { getProjectById };
