const admin = require("../../config/firebaseConfig");
const db = admin.database();

async function requestVolunteer(req, res) {
    try {
        const { ngoId } = req.params;
        const { isRequestingVolunteers, volunteerDetails } = req.body;

        console.log("hit");

        // Validate input
        if (!ngoId || typeof isRequestingVolunteers !== "boolean") {
            return res.status(400).json({
                success: false,
                message: "Invalid input. 'ngoId' and 'isRequestingVolunteers' are required."
            });
        }

        if (isRequestingVolunteers) {
            if (
                !volunteerDetails ||
                !volunteerDetails.purpose ||
                !volunteerDetails.location ||
                !volunteerDetails.noOfvolunteer ||
                !volunteerDetails.timeofstarting ||
                !volunteerDetails.endoftime
            ) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid input. All fields in 'volunteerDetails' except 'desc' are mandatory."
                });
            }
        }

        // Fetch NGO data from Realtime Database
        const ngoRef = db.ref(`NGOs/${ngoId}`);
        const snapshot = await ngoRef.once("value");
        const ngoData = snapshot.val();

        if (!ngoData) {
            return res.status(404).json({ error: "NGO not found." });
        }

        // Prepare the data to update
        const updateData = {
            isRequestingVolunteers,
            volunteerDetails: isRequestingVolunteers ? {
                purpose: volunteerDetails.purpose,
                location: volunteerDetails.location,
                noOfvolunteer: volunteerDetails.noOfvolunteer,
                timeofstarting: volunteerDetails.timeofstarting,
                endoftime: volunteerDetails.endoftime,
                desc: volunteerDetails.desc || "" // Optional field
            } : {}
        };

        // Update the NGO data in the database
        await ngoRef.update(updateData);

        console.log("ends");

        return res.status(200).json({
            success: true,
            message: `NGO volunteer request updated successfully.`,
            data: updateData
        });
    } catch (error) {
        console.error("Error updating NGO volunteer request:", error);

        return res.status(500).json({
            success: false,
            message: "An error occurred while processing your request.",
            error: error.message
        });
    }
}

module.exports = { requestVolunteer };
