// routes/index.js
const express = require("express");
const router = express.Router();

// Import specific resource routes
const ngoRoutes = require("./ngoRoutes");

// Use the resource routes
router.use("/ngos", ngoRoutes); // All NGO-related routes will be under /api/ngos

module.exports = router;
