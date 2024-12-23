// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const { validateHeader } = require("../middleware/authMiddleware");

let users = []; // In-memory data store

// Create a new user
router.post("/users", validateHeader, (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: Date.now().toString(), name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

// Get all users
router.get("/users", validateHeader, (req, res) => {
  res.status(200).json(users);
});

// Get a user by ID
router.get("/users/:id", validateHeader, (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
});

// Update a user by ID
router.put("/users/:id", validateHeader, (req, res) => {
  const { name, email } = req.body;
  const userIndex = users.findIndex((u) => u.id === req.params.id);
  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[userIndex] = { ...users[userIndex], name, email };
  res.status(200).json(users[userIndex]);
});

// Delete a user by ID
router.delete("/users/:id", validateHeader, (req, res) => {
  const userIndex = users.findIndex((u) => u.id === req.params.id);
  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users.splice(userIndex, 1);
  res.status(204).send();
});

module.exports = router;
