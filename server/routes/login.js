const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcryptjs");

// POST /api/login
router.post("/", (req, res) => {
  const { card_number, password } = req.body;
  if (!card_number || !password) {
    return res.status(400).json({ message: "Card number and password are required." });
  }
  db.query("SELECT * FROM users WHERE card_number = ?", [card_number], async (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (results.length === 0) return res.status(400).json({ message: "Invalid card number or password." });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid card number or password." });

    // Don't send password back
    const { password: _, ...userData } = user;
    res.json({ message: "Login successful", user: userData });
  });
});

module.exports = router;