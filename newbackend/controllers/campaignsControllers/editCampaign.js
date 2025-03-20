const admin = require("../../config/firebaseConfig");
const db = admin.database();

/**
 * Edit campaign: only allows updating endDate and targetAmount.
 */
async function editCampaign(req, res) {
  try {
    const { campaignId } = req.params;
    const { endDate, targetAmount } = req.body;

    if (!campaignId) {
      return res.status(400).json({ error: "Campaign ID is required." });
    }

    if (!endDate && targetAmount === undefined) {
      return res.status(400).json({ error: "At least one field (endDate or targetAmount) is required." });
    }

    // Reference to the campaign in the database
    const campaignRef = db.ref(`campaigns/${campaignId}`);
    const snapshot = await campaignRef.once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({ error: "Campaign not found." });
    }

    // Prepare updated data
    const updates = { isEdited: true };
    if (endDate) updates.endDate = endDate;
    if (targetAmount !== undefined) updates.targetAmount = parseFloat(targetAmount);

    // Update the campaign in the database
    await campaignRef.update(updates);

    res.status(200).json({ message: "Campaign updated successfully!" });
  } catch (error) {
    console.error("Error updating campaign:", error);
    res.status(500).json({ error: "Internal server error." });
  }
}

module.exports = { editCampaign };
