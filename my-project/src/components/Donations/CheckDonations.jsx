import React, { useEffect, useState } from "react";
import { CircularProgress, Typography, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const CheckDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalDonations, setTotalDonations] = useState(0);

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
          `http://localhost:5000/api/donations/monetary/${storedNgoId}`
        );
        setDonations(response.data);
        
        // Calculate total donation amount
        const total = response.data.reduce((sum, donation) => sum + donation.donationAmount, 0);
        setTotalDonations(total);
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
    { field: "donationAmount", headerName: "Amount", flex: 1, filterable: true },
    { field: "paymentMethod", headerName: "Payment Method", flex: 1, filterable: true },
    { field: "transactionID", headerName: "Transaction ID", flex: 1, filterable: true },
    { field: "createdAt", headerName: "Date", flex: 1, filterable: true },
  ];

  return (
    <div className="mt-[5.5rem] mx-auto p-6">
      {/* Heading with Total Donations in Flex */}
      <Box sx={{ backgroundColor: "#225738", py: 2, mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center", px: 3 }}>
        <Typography variant="h5" fontWeight="bold" color="white">
          Monetary Donations Received
        </Typography>
        <Typography variant="h6" fontWeight="bold" color="white">
          Total: Rs.{totalDonations.toLocaleString()}
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

export default CheckDonations;
