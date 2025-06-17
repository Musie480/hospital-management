// routes/appointment.js
const express = require("express");
const router = express.Router();
const db = require("../db"); // make sure this is your DB connection

// POST /api/appointment
router.post("/", (req, res) => {
  const { patient_name, patient_phone, patient_email, department_id, doctor_id, date, time } = req.body;
  if (!patient_name || !patient_phone || !patient_email || !department_id || !doctor_id || !date || !time) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  const query = `
    INSERT INTO appointments (patient_name, patient_phone, patient_email, department_id, doctor_id, date, time)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [patient_name, patient_phone, patient_email, department_id, doctor_id, date, time];
  db.query(query, values, (err, result) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ message: "Server error" });
    }
    return res.status(201).json({ message: "Appointment submitted successfully" });
  });
});

module.exports = router;
