const express = require("express");
const router = express.Router();
const db = require("../db");

// Middleware to check if user is admin (pseudo, replace with real auth in production)
function isAdmin(req, res, next) {
  // For real apps, use JWT or session and check req.user.role === 'admin'
  // For now, you can skip or implement your own check
  next();
}

// GET /api/admin/appointments
router.get("/appointments", isAdmin, (req, res) => {
  const query = `
    SELECT 
      a.id,
      a.patient_name,
      a.date,
      a.time,
      a.status,
      d.name AS doctor_name,
      dept.name AS department_name
    FROM appointments a
    JOIN doctors d ON a.doctor_id = d.id
    JOIN departments dept ON a.department_id = dept.id
    ORDER BY a.date DESC, a.time DESC
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error("DB Error:", err);
      return res.status(500).json({ message: "Server error" });
    }
    res.json(results);
  });
});

module.exports = router;