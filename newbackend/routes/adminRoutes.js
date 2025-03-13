// routes/ngoRoutes.js file
const express = require("express");
const router = express.Router();
const multer = require("multer");
// const ngoController = require("../controllers/ngoController");

const registerAdmin=require("../controllers/adminControllers/registerAdmin");
const adminSignin=require("../controllers/adminControllers/signinAdmin")
// Multer setup for file handling
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to register a new NGO
router.post("/register", registerAdmin.registerAdmin);

router.post("/signin", adminSignin.adminSignin);

module.exports = router;