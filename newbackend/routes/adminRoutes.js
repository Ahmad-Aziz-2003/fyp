// routes/ngoRoutes.js file
const express = require("express");
const router = express.Router();
const multer = require("multer");
// const ngoController = require("../controllers/ngoController");

const registerAdmin=require("../controllers/adminControllers/adminAuthControllers/registerAdmin");
const adminSignin=require("../controllers/adminControllers/adminAuthControllers/signinAdmin");
const getAllNGOs=require("../controllers/adminControllers/adminNGOControllers/getAllNGOs")
const getUnverifiedNGOs=require("../controllers/adminControllers/adminNGOControllers/getUnverifiedNGOs")

// Multer setup for file handling
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to register a new NGO
router.post("/register", registerAdmin.registerAdmin);

router.post("/signin", adminSignin.adminSignin);

router.get("/ngos",getAllNGOs.getAllNGOs)

router.get("/unverify-ngos",getUnverifiedNGOs.getUnverifiedNGOs)


module.exports = router;