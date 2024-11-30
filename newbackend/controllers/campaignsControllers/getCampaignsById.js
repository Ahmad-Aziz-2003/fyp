const admin = require("../../config/firebaseConfig");
const db = admin.database();

async function getCampaignsById(req,res){

    try{
        const { campaignId } = req.params;
  
        if (!campaignId) {
          return res.status(400).json({ error: "campaign ID is required." });
        }
        const campaignsRef = db.ref("campaigns").child(campaignId);
        const snapshot = await campaignsRef.once("value");
  
        if (!snapshot.exists()) {
            return res.status(404).json({ error: "campaign  not found." });
        }
        
        res.status(200).json(snapshot.val());

    }catch(error){
        console.error("Error fetching campaigns by ID:", error);
        res.status(500).json({ error: "Internal server error." });
    }

}


module.exports={getCampaignsById}