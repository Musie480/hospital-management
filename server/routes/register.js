const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcryptjs");

// Helper to generate a unique card number
function generateCardNumber() {
  const date = new Date();
  return `MC-${date.getFullYear()}${(date.getMonth()+1).toString().padStart(2,'0')}${date.getDate().toString().padStart(2,'0')}-${Math.floor(1000 + Math.random() * 9000)}`;
}

// POST /api/register
router.post("/", async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }
  try {
    // Check if email already exists
    db.query("SELECT id FROM users WHERE email = ?", [email], async (err, results) => {
      if (err) return res.status(500).json({ message: "Server error" });
      if (results.length > 0) return res.status(400).json({ message: "Email already registered." });

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      const card_number = generateCardNumber();

      db.query(
        "INSERT INTO users (name, card_number, email, phone, password) VALUES (?, ?, ?, ?, ?)",
        [name, card_number, email, phone, hashedPassword],
        (err, result) => {
          if (err) {
            if (err.code === "ER_DUP_ENTRY") {
              return res.status(400).json({ message: "Email or phone already registered." });
            }
            return res.status(500).json({ message: "Server error" });
          }
          res.status(201).json({ message: "Registered successfully", card_number });
        }
      );
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;