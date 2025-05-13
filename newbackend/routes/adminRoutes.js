// routes/ngoRoutes.js file
const express = require("express");
const router = express.Router();
const multer = require("multer");
// const ngoController = require("../controllers/ngoController");

const registerAdmin=require("../controllers/adminControllers/adminAuthControllers/registerAdmin");
const adminSignin=require("../controllers/adminControllers/adminAuthControllers/signinAdmin");
const getAllNGOs=require("../controllers/adminControllers/adminNGOControllers/getAllNGOs")
const getUnverifiedNGOs=require("../controllers/adminControllers/adminNGOControllers/getUnverifiedNGOs");
const getAllUsers  = require("../controllers/adminControllers/adminUserControllers/getAllUser");
const toggleUserBlockStatus  = require("../controllers/adminControllers/adminUserControllers/toggleUserBlockStatus");
const toggleNGOStatus  = require("../controllers/adminControllers/adminNGOControllers/toggleNGOStatus");
const getNgoDetail  = require("../controllers/adminControllers/adminNGOControllers/getNgoDetail");
const verifyNGO  = require("../controllers/adminControllers/adminNGOControllers/verifyNGO");
const adminInfo  = require("../controllers/adminControllers/adminAuthControllers/adminInfo");
const getPlatformStats=require("../controllers/adminControllers/adminAuthControllers/getPlatformStats");
const { rejectNGO } = require("../controllers/adminControllers/adminNGOControllers/rejectNGO");
// Multer setup for file handling
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to register a new NGO
router.post("/register", registerAdmin.registerAdmin);

router.post("/signin", adminSignin.adminSignin);

router.get("/info/:adminId",adminInfo.getAdminInfo)

router.get("/platform-stats/:adminId",getPlatformStats.getPlatformStats);

router.get("/ngos",getAllNGOs.getAllNGOs)

router.get("/unverify-ngos",getUnverifiedNGOs.getUnverifiedNGOs)

router.get("/users",getAllUsers.getAllUsers)

router.post("/change-Status",toggleUserBlockStatus.toggleUserBlockStatus)

router.put("/ngos/toggle-status/:ngoId", toggleNGOStatus.toggleNGOStatus);

router.get("/ngo/detail-profile/:ngoId",getNgoDetail.getNgoDetail)

router.post("/verify-ngo/:ngoId",verifyNGO.verifyNGO);

router.delete('/reject/:ngoId', rejectNGO);

module.exports = router;