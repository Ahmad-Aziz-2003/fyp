import React, { useEffect, useState } from "react";
import { CircularProgress, Typography, Box, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const HistoryItembaseDonation = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const fetchDonations = async () => {
    try {
      const storedNgoId = localStorage.getItem("ngoId");
      if (!storedNgoId) {
        console.error("No NGO ID found in local storage");
        setLoading(false);
        return;
      }

      const response = await axios.get(`http://localhost:5000/api/donations/item-based/${storedNgoId}`);
      const donationList = response.data;

      const filteredList = donationList.filter(
        (donation) => donation.status === "Accepted" || donation.status === "Rejected"
      );

      setDonations(filteredList);
      setFilteredDonations(filteredList);
    } catch (error) {
      console.error("Error fetching donations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  useEffect(() => {
    if (filter === "All") {
      setFilteredDonations(donations);
    } else {
      setFilteredDonations(donations.filter((d) => d.status === filter));
    }
  }, [filter, donations]);

  const columns = [
    { field: "name", headerName: "Donor Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phoneNumber", headerName: "Phone Number", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    { field: "createdAt", headerName: "Date", flex: 1 },
  ];

  const acceptedCount = donations.filter((d) => d.status === "Accepted").length;
  const rejectedCount = donations.filter((d) => d.status === "Rejected").length;

  return (
    <div className="mt-[5.5rem] mx-auto p-6">
      <Box sx={{ backgroundColor: "#225738", py: 2, mb: 2 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center" color="white">
          Donation History
        </Typography>
      </Box>

      <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={(e, value) => value && setFilter(value)}
          aria-label="status filter"
        >
          <ToggleButton value="All">All</ToggleButton>
          <ToggleButton value="Accepted">Accepted ({acceptedCount})</ToggleButton>
          <ToggleButton value="Rejected">Rejected ({rejectedCount})</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {loading ? (
        <CircularProgress sx={{ display: "block", margin: "auto", mt: 5 }} />
      ) : (
        <DataGrid
          rows={filteredDonations.map((donation, index) => ({ id: index, ...donation }))}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
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

export default HistoryItembaseDonation;
