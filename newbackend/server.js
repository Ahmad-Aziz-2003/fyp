//server.js file
const express = require("express");
const cors = require("cors"); // Import CORS middleware
const routes = require("./routes/index.js");

const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Enable CORS
app.use(cors()); // Allow requests from any origin

// Use all routes with a base path of /api
app.use("/api", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
   console.log(`Server running on port ${PORT}`);
});
