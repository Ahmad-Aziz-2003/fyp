const admin = require("../../config/firebaseConfig");
const db = admin.database();
const storage = admin.storage().bucket(); // Access Firebase Storage
const DOMPurify = require("isomorphic-dompurify");

async function getCampaignsForNgo(req, res) {
    try {
      const { ngoId } = req.params;
  
      // Fetch all goodness posts related to the specific NGO
      const campaignsRef = db.ref("campaigns");
      const snapshot = await campaignsRef.orderByChild("ngoId").equalTo(ngoId).once("value");
      
      const campaignsData = snapshot.val();
  
      if (!campaignsData) {
        return res.status(404).json({ error: "No campaigns  found for this NGO." });
      }
  
      res.status(200).json(campaignsData);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  }

module.exports={getCampaignsForNgo}