import React, { useEffect, useState } from "react";
import { Paper, CircularProgress, Typography, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const VolunteerInfo = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const storedNgoId = localStorage.getItem("ngoId"); // Get ngoId from local storage
        if (!storedNgoId) {
          console.error("No NGO ID found in local storage");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/volunteer/applied-volunteers/${storedNgoId}`
        );
        setVolunteers(response.data.volunteers);
      } catch (error) {
        console.error("Error fetching volunteers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVolunteers();
  }, []);

  // Define columns for the DataGrid
  const columns = [
    { field: "name", headerName: "Name", flex: 1, filterable: true },
    { field: "email", headerName: "Email", flex: 1, filterable: true },
    { field: "phone", headerName: "Phone", flex: 1, filterable: true },
    { field: "address", headerName: "Address", flex: 1, filterable: true },
    { field: "start_date", headerName: "Start Date", flex: 1, filterable: true },
    { field: "end_date", headerName: "End Date", flex: 1, filterable: true },
  ];

  return (
    <div className="mt-[5.5rem]  mx-auto p-6 ">
      {/* Heading with background color */}
      <Box sx={{ backgroundColor: "#225738", py: 2, mb: 2 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" color="white">
          Volunteers Details – Applied for Cause
        </Typography>
      </Box>

      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />
      ) : (
        <DataGrid
          rows={volunteers.map((volunteer, index) => ({ id: index, ...volunteer }))}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          filterMode="server"
          sx={{ borderRadius: 2, boxShadow: 3 }}
        />
      )}
    </div>
  );
};

export default VolunteerInfo;