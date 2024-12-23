// server.js
const express = require("express");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware setup
app.use(express.json()); // to parse JSON bodies

// Use routes
app.use(userRoutes);

// Error handling for unmatched routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
