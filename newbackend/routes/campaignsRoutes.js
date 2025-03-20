//routes/goodnessRoutes.js file
const express = require("express");
const router = express.Router();
const multer = require("multer");

const createCampaigns = require("../controllers/campaignsControllers/createCampaigns");
const getCampaignsForNgo=require("../controllers/campaignsControllers/getCampaignsForNgo");
const getCampaignsById=require("../controllers/campaignsControllers/getCampaignsById");
const deleteCampaignById=require("../controllers/campaignsControllers/deleteCampaignById");
const editCampaign  = require("../controllers/campaignsControllers/editCampaign");

// Multer setup for file handling
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
    "/create-campaigns",
    upload.array("imagesCampeigns", 5), // Allow up to 5 images
    createCampaigns.createCampaigns
  );

router.get("/All-Campaigns/:ngoId", getCampaignsForNgo.getCampaignsForNgo);

router.get("/campaign-post/:campaignId", getCampaignsById.getCampaignsById);

router.delete("/campaign-delete/:campaignId",deleteCampaignById.deleteCampaignById)

router.put("/update-campaign/:campaignId",editCampaign.editCampaign)

module.exports = router;
