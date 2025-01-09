const admin = require("../../config/firebaseConfig");
const db = admin.database();

/**
 * Fetch all completed projects
 */
async function getCompletedProjects(req, res) {
  try {
    const { ngoId } = req.params;

    if (!ngoId) {
      return res.status(400).json({ error: "NGO ID is required." });
    }

    const projectsRef = db.ref("projects");
    const snapshot = await projectsRef.orderByChild("ngoId").equalTo(ngoId).once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({ message: "No projects found for the given NGO ID." });
    }

    const completedProjects = [];
    snapshot.forEach((childSnapshot) => {
      const project = childSnapshot.val();
      if (project.status === "completed") {
        completedProjects.push({ id: childSnapshot.key, ...project });
      }
    });

    if (completedProjects.length === 0) {
      return res.status(404).json({ message: "No completed projects found for the given NGO ID." });
    }

    res.status(200).json(completedProjects);
  } catch (error) {
    console.error("Error fetching completed projects for NGO:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}


module.exports = { getCompletedProjects };
