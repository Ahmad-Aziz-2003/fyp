// routes/ngoRoutes.js file
const express = require("express");
const router = express.Router();
const multer = require("multer");
// const ngoController = require("../controllers/ngoController");

const registerNGO=require("../controllers/ngoControllers/registerNGO");
const completeProfile=require("../controllers/ngoControllers/completeProfile");
const signinNGO=require("../controllers/ngoControllers/signinNGO");
const getNGOData=require("../controllers/ngoControllers/getNGOData");
const changePassword=require("../controllers/ngoControllers/changePassword");
const updateNGOInfo=require("../controllers/ngoControllers/updateNGOInfo")
const forgotPassword=require("../controllers/ngoControllers/forgotPassword")
const getStats=require("../controllers/ngoControllers/getStats")
// Multer setup for file handling
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to register a new NGO
router.post("/register", registerNGO.registerNGO);

// Route to complete NGO profile
// router.post("/completeProfile/:ngoId", upload.single("profilePhoto"), ngoController.completeProfile);
router.post("/completeProfile/:ngoId", upload.single("profilePhoto"), completeProfile.completeProfile);

// Route to register a new NGO
// router.post("/signin", ngoController.signinNGO);
router.post("/signin", signinNGO.signinNGO);


// Route to get NGO details
// router.get("/ngoinfo/:ngoId", ngoController.getNGOData);
router.get("/ngoinfo/:ngoId", getNGOData.getNGOData);


// Route to change password
// router.post("/password/:ngoId", ngoController.changePassword);
router.post("/password/:ngoId", changePassword.changePassword);

// Route to update NGO information
// router.put("/updateInfo/:ngoId", ngoController.updateNGOInfo);
router.put("/updateInfo/:ngoId",upload.single("profilePhoto"), updateNGOInfo.updateNGOInfo);

// Forgot password route
// router.post("/forgot-password", ngoController.forgotPassword);
router.post("/forgot-password", forgotPassword.forgotPassword);

router.get("/stats/:ngoId", getStats.getStats);

module.exports = router;