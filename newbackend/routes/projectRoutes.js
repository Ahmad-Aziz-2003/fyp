//routes/ProjectRoutes.js file
const express = require("express");
const router = express.Router();
const multer = require("multer");

const createProject = require("../controllers/ProjectControllers/createProject");
const getOngoingProjects=require("../controllers/ProjectControllers/getOngoingProjects");
const getCompletedProjects=require("../controllers/ProjectControllers/getCompletedProjects");
const getFutureProjects=require("../controllers/ProjectControllers/getFutureProjects");
const getProjectById=require("../controllers/ProjectControllers/getProjectById");
const deleteProjectById=require("../controllers/ProjectControllers/deleteProjectById");
const updateProject=require("../controllers/ProjectControllers/updateProject");

// Multer setup for file handling
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
    "/create-project/:ngoId",
    upload.array("imagesproject", 5), // Allow up to 5 images
    createProject.createProject
  );

router.get("/ongoing/:ngoId", getOngoingProjects.getOngoingProjects);
router.get("/completed/:ngoId", getCompletedProjects.getCompletedProjects);
router.get("/future/:ngoId", getFutureProjects.getFutureProjects);

router.get("/project-specific/:projectId", getProjectById.getProjectById);
router.delete("/project-delete/:projectId",deleteProjectById.deleteProjectById);

router.put(
    '/update-project/:projectId',
    upload.array('imagesproject', 5), // Allow up to 5 images
    updateProject.updateProject
  );

module.exports = router;
