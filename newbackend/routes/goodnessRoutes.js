//routes/goodnessRoutes.js file
const express = require("express");
const router = express.Router();
const multer = require("multer");
const goodnessControllers = require("../controllers/goodnessControllers");

// Multer setup for file handling
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
    "/create-goodness",
    upload.array("imagesgoodness", 5), // Allow up to 5 images
    goodnessControllers.createGoodness
  );
  
// routes/goodnessRoutes.js
router.get("/Allgoodness/:ngoId", goodnessControllers.getGoodnessForNgo);

router.get("/goodnessPost/:goodnessId", goodnessControllers.getGoodnessById);

router.delete("/goodness/:goodnessId",goodnessControllers.deleteGoodnessById)

router.put(
    '/update-goodness/:goodnessId',
    upload.array('imagesgoodness', 5), // Allow up to 5 images
    goodnessControllers.updateGoodness
  );
  

module.exports = router;
