// routes/appointment.js
const express = require("express");
const router = express.Router();
const db = require("../db"); // make sure this is your DB connection

router.post("/", (req, res) => {
  const { name, age, physician_or_treatment, phone, email } = req.body;

  if (!name || !age || !phone || !email) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const query = `
    INSERT INTO appointments (name, age, physician_or_treatment, phone, email)
    VALUES (?, ?, ?, ?, ?)
  `;
  const values = [name, age, physician_or_treatment, phone, email];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ message: "Server error" });
    }

    return res.status(201).json({ message: "Appointment submitted successfully" });
  });
});

module.exports = router;
