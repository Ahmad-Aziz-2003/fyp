const admin = require("../../config/firebaseConfig");
const db = admin.database();
const storage = admin.storage().bucket(); // Access Firebase Storage


async function deleteCampaignById(req, res) {
    try {
      const { campaignId } = req.params;
      console.log("hitt the delette");
      if (!campaignId) {
        return res.status(400).json({ error: "campaign ID is required." });
      }
  
      const campaignRef = db.ref("campaigns").child(campaignId);
      const snapshot = await campaignRef.once("value");
  
      if (!snapshot.exists()) {
        return res.status(404).json({ error: "campaign not found." });
      }
  
      const campaignData = snapshot.val();
      const imageUrls = campaignData.imageUrls || [];
  
      // Delete the campaign from the database
      await campaignRef.remove();
  
      // Delete images from Firebase Storage
      for (const imageUrl of imageUrls) {
        try {
          const fileName = decodeURIComponent(imageUrl.split("/").pop().split("?")[0]); // Handle query strings
          const fileRef = storage.file(`campaign_images/${fileName}`);
          await fileRef.delete();
        } catch (error) {
          console.error(`Error deleting image: ${imageUrl}`, error);
        }
      }
      

      res.status(200).json({ message: "campaign deleted successfully." });
      console.log("complete delete ");
    } catch (error) {
      console.error("Error deleting campaign:", error);
      res.status(500).json({ error: "Internal server error." });
      console.log("complete dfffffffffelete ");
    }
  }
  

module.exports={deleteCampaignById};