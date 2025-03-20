//routes/goodnessRoutes.js file
const express = require("express");
const router = express.Router();
const multer = require("multer");

const requestVolunteer=require("../controllers/volunteerControllers/requestVolunteer");
const getVolunteerRequestStatus=require("../controllers/volunteerControllers/getVolunteerRequestStatus");
const getAppliedVolunteer = require("../controllers/volunteerControllers/getAppliedVolunteer");

// Multer setup for file handling
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/request-volunteer/:ngoId",requestVolunteer.requestVolunteer);
router.get("/volunteerStatus/:ngoId",getVolunteerRequestStatus.getVolunteerRequestStatus);
router.get("/applied-volunteers/:ngoId",getAppliedVolunteer.getAppliedVolunteer);
module.exports = router;
