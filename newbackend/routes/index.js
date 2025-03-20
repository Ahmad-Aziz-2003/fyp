// routes/index.js
const express = require("express");
const router = express.Router();

// Import specific resource routes
const ngoRoutes = require("./ngoRoutes");
const goodnessRoutes = require("./goodnessRoutes");
const campaignsRoutes=require("./campaignsRoutes");
const volunteerRoutes=require("./volunteerRoutes");
const projectRoutes=require("./projectRoutes");
const adminRoutes=require("./adminRoutes");
const donationRoutes=require("./donationRoutes");

// Use the resource routes
router.use("/ngos", ngoRoutes); // All NGO-related routes will be under /api/ngos

router.use("/goodness", goodnessRoutes); // All Goodness-related routes will be under /api/goodness

router.use("/campaigns",campaignsRoutes);

router.use("/volunteer", volunteerRoutes); 

router.use("/project",projectRoutes);

router.use("/admin",adminRoutes);

router.use("/donations",donationRoutes);

module.exports = router;
