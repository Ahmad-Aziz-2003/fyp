// routes/ngoRoutes.js file
const express = require("express");
const router = express.Router();
const multer = require("multer");
const ngoController = require("../controllers/ngoController");


// Multer setup for file handling
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to register a new NGO
router.post("/register", ngoController.registerNGO);

// Route to complete NGO profile
router.post("/completeProfile/:ngoId", upload.single("profilePhoto"), ngoController.completeProfile);

// Route to register a new NGO
router.post("/signin", ngoController.signinNGO);

// Route to get NGO details
router.get("/ngoinfo/:ngoId", ngoController.getNGOData);

// Route to change password
router.post("/password/:ngoId", ngoController.changePassword);

// Route to update NGO information
router.put("/updateInfo/:ngoId", ngoController.updateNGOInfo);

// Forgot password route
router.post("/forgot-password", ngoController.forgotPassword);

module.exports = router;