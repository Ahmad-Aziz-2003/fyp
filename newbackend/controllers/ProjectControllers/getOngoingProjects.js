const admin = require("../../config/firebaseConfig");
const db = admin.database();

/**
 * Fetch all ongoing projects
 */
async function getOngoingProjects(req, res) {

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
    if (project.status === "ongoing") {
      completedProjects.push({ id: childSnapshot.key, ...project });
    }
  });

  if (completedProjects.length === 0) {
    return res.status(404).json({ message: "No ongoing projects found for the given NGO ID." });
  }

  res.status(200).json(completedProjects);
} catch (error) {
  console.error("Error fetching completed projects for NGO:", error);
  res.status(500).json({ error: "Internal server error." });
}
}

module.exports = { getOngoingProjects };


//   try {
//     const projectsRef = db.ref("projects");
//     const snapshot = await projectsRef.orderByChild("status").equalTo("ongoing").once("value");

//     if (!snapshot.exists()) {
//       return res.status(404).json({ message: "No ongoing projects found." });
//     }

//     const projects = [];
//     snapshot.forEach((childSnapshot) => {
//       projects.push({ id: childSnapshot.key, ...childSnapshot.val() });
//     });

//     res.status(200).json(projects);
//   } catch (error) {
//     console.error("Error fetching ongoing projects:", error);
//     res.status(500).json({ error: "Internal server error." });
//   }
// }