const express = require("express");
const router = express.Router();
const db = require("../db");

// GET /api/doctor/appointments?doctor_id=...
router.get("/appointments", (req, res) => {
  const { doctor_id } = req.query;
  if (!doctor_id) {
    return res.status(400).json({ message: "Missing doctor_id" });
  }
  const query = `
    SELECT 
      a.id,
      a.patient_name,
      a.patient_phone,
      a.patient_email,
      a.date,
      a.time,
      a.status
    FROM appointments a
    WHERE a.doctor_id = ?
    ORDER BY a.date DESC, a.time DESC
  `;
  db.query(query, [doctor_id], (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ message: "Server error" });
    }
    res.json(results);
  });
});

router.get("/user/:user_id", (req, res) => {
  const { user_id } = req.params;
  db.query("SELECT * FROM doctors WHERE user_id = ?", [user_id], (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (results.length === 0) return res.status(404).json({ message: "Doctor not found" });
    res.json(results[0]);
  });
});

// PATCH /api/doctor/appointments/:id/status
router.patch("/appointments/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const allowed = ["pending", "confirmed", "completed", "cancelled"];
  if (!allowed.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }
  db.query(
    "UPDATE appointments SET status = ? WHERE id = ?",
    [status, id],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Server error" });
      res.json({ message: "Status updated" });
    }
  );
});

module.exports = router;