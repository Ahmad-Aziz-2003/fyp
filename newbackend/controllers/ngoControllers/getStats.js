 const admin = require("../../config/firebaseConfig");

const db = admin.database();

async function getStats(req, res) {
  try {
    const { ngoId } = req.params; // Get NGO ID from request params

    if (!ngoId) {
      return res.status(400).json({ error: "NGO ID is required." });
    }

    // Check if NGO exists
    const ngoRef = db.ref(`NGOs/${ngoId}`);
    const ngoSnapshot = await ngoRef.once("value");

    if (!ngoSnapshot.exists()) {
      return res.status(404).json({ error: "NGO not found." });
    }

    // Define database references
    const monetaryDonationsRef = db.ref("Donations/Ngo_Monetary_Donation");
    const volunteersRef = db.ref("Volunteers");
    const goodnessRef = db.ref("goodness");
    const campaignsRef = db.ref("campaigns");
    const projectsRef = db.ref("projects");

    // Fetch data snapshots in parallel
    const [monetaryDonationsSnap, volunteersSnap, goodnessSnap, campaignsSnap, projectsSnap] =
      await Promise.all([
        monetaryDonationsRef.once("value"),
        volunteersRef.once("value"),
        goodnessRef.once("value"),
        campaignsRef.once("value"),
        projectsRef.once("value"),
      ]);

    // Count records related to the given NGO
     // Counters
    let totalDonations = 0;
    let totalDonationAmount = 0;
    let totalVolunteerApplications = 0;
    let totalGoodnessPosts = 0;
    let totalCampaigns = 0;
    let totalProjects = 0;

    // Projects by status
    let ongoingProjects = 0;
    let completedProjects = 0;
    let futureProjects = 0;

    // Monetary Donations
    monetaryDonationsSnap.forEach((snap) => {
      const donation = snap.val();
      if (donation.ngoId === ngoId) {
        totalDonations++;
        totalDonationAmount += Number(donation.donationAmount || 0);
      }
    });

    volunteersSnap.forEach((snap) => {
      if (snap.val().ngoId === ngoId) {
        totalVolunteerApplications++;
      }
    });

    goodnessSnap.forEach((snap) => {
      if (snap.val().ngoId === ngoId) {
        totalGoodnessPosts++;
      }
    });

    campaignsSnap.forEach((snap) => {
      if (snap.val().ngoId === ngoId) {
        totalCampaigns++;
      }
    });

    projectsSnap.forEach((snap) => {
      const project = snap.val();
      if (project.ngoId === ngoId) {
        totalProjects++;

        const status = project.status?.toLowerCase();
        if (status === "ongoing") ongoingProjects++;
        else if (status === "completed") completedProjects++;
        else if (status === "future") futureProjects++;
      }
    });

    // Send response
    res.status(200).json({
      totalDonations,
      totalDonationAmount,
      totalVolunteerApplications,
      totalGoodnessPosts,
      totalCampaigns,
      totalProjects,
      ongoingProjects,
      completedProjects,
      futureProjects,
    });
  } catch (error) {
    console.error("Error fetching NGO stats:", error);
    res.status(500).json({ error: "Failed to fetch NGO statistics." });
  }
}

module.exports = { getStats };
