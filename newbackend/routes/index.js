// routes/index.js
const express = require("express");
const router = express.Router();

// Import specific resource routes
const ngoRoutes = require("./ngoRoutes");
const goodnessRoutes = require("./goodnessRoutes");
const campaignsRoutes=require("./campaignsRoutes");
const volunteerRoutes=require("./volunteerRoutes");

// Use the resource routes
router.use("/ngos", ngoRoutes); // All NGO-related routes will be under /api/ngos

router.use("/goodness", goodnessRoutes); // All Goodness-related routes will be under /api/goodness

router.use("/campaigns",campaignsRoutes);

router.use("/volunteer", volunteerRoutes); 


module.exports = router;
