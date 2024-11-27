//routes/goodnessRoutes.js file
const express = require("express");
const router = express.Router();
const multer = require("multer");
const goodnessControllers = require("../controllers/goodnessControllers");

// Multer setup for file handling
const storage = multer.memoryStorage();
const upload = multer({ storage });
// Multer setup for file handling
// const storage = multer.memoryStorage(); // Temporarily store files in memory
// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
//     if (allowedTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error("Only JPG, JPEG, and PNG formats are allowed"));
//     }
//   },
// });

// Route to create a goodness
// router.post(
//   "/create-goodness",
//   upload.single("imagesgoodness"), // Max 5 images
//   goodnessControllers.createGoodness
// );
router.post(
    "/create-goodness",
    upload.array("imagesgoodness", 5), // Allow up to 5 images
    goodnessControllers.createGoodness
  );
  
// routes/goodnessRoutes.js
router.get("/Allgoodness/:ngoId", goodnessControllers.getGoodnessForNgo);

router.get("/goodnessPost/:goodnessId", goodnessControllers.getGoodnessById);

router.delete("/goodness/:goodnessId",goodnessControllers.deleteGoodnessById)
// // Route to register a new NGO
// router.post("/register", ngoController.registerNGO);

// // Route to complete NGO profile
// router.post("/completeProfile/:ngoId", upload.single("profilePhoto"), ngoController.completeProfile);
module.exports = router;
