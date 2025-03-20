//routes/goodnessRoutes.js file
const express = require("express");
const router = express.Router();
const multer = require("multer");

const getNgoMonetaryDonations=require("../controllers/DonationControllers/getNgoMonetaryDonations");
const getNGOItemBasedDonations=require("../controllers/DonationControllers/getNgoItemBasedDonations")

// Multer setup for file handling
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get("/monetary/:ngoId",getNgoMonetaryDonations.getNgoMonetaryDonations);

router.get("/item-based/:ngoId",getNGOItemBasedDonations.getNGOItemBasedDonations);

module.exports = router;
