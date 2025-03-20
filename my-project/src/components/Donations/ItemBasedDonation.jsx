import React, { useEffect, useState } from "react";
import { CircularProgress, Typography, Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import ChatIcon from "@mui/icons-material/Chat";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CancelIcon from "@mui/icons-material/Cancel";

const ItemBasedDonation = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const storedNgoId = localStorage.getItem("ngoId"); // Get ngoId from local storage
        if (!storedNgoId) {
          console.error("No NGO ID found in local storage");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/donations/item-based/${storedNgoId}`
        );
        setDonations(response.data);
      } catch (error) {
        console.error("Error fetching donations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  // Define columns for the DataGrid
  const columns = [
    { field: "name", headerName: "Donor Name", flex: 1, filterable: true },
    { field: "email", headerName: "Email", flex: 1, filterable: true },
    { field: "phoneNumber", headerName: "Phone Number", flex: 1, filterable: true },
    { field: "status", headerName: "Status", flex: 1, filterable: true },
    { field: "createdAt", headerName: "Date", flex: 1, filterable: true },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton color="primary" title="Chat">
            <ChatIcon />
          </IconButton>
          <IconButton color="warning" title="Processing">
            <HourglassEmptyIcon />
          </IconButton>
          <IconButton color="error" title="Reject">
            <CancelIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div className="mt-[5.5rem] mx-auto p-6">
      {/* Heading with background color */}
      <Box sx={{ backgroundColor: "#225738", py: 2, mb: 2 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" color="white">
          Item-Based Donations Received
        </Typography>
      </Box>

      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />
      ) : (
        <DataGrid
          rows={donations.map((donation, index) => ({ id: index, ...donation }))}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          filterMode="server"
          sx={{
            borderRadius: 2,
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#225738",
              color: "black",
              fontSize: "16px",
              fontWeight: "bold",
            },
          }}
        />
      )}
    </div>
  );
};

export default ItemBasedDonation;
