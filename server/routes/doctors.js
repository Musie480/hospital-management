const express = require("express");
const router = express.Router();
const db = require("../db");

// GET /api/doctors?department_id=...
router.get("/", (req, res) => {
  const { department_id } = req.query;
  if (!department_id) return res.status(400).json({ message: "Missing department_id" });
  db.query("SELECT * FROM doctors WHERE department_id = ?", [department_id], (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.json(results);
  });
});

// GET /api/doctors/:id
router.get("/:id", (req, res) => {
  db.query("SELECT * FROM doctors WHERE id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.json(results[0]);
  });
});

// GET /api/doctors/:id/education
router.get("/:id/education", (req, res) => {
  db.query("SELECT * FROM doctor_education WHERE doctor_id = ?", [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.json(results);
  });
});

// GET /api/doctors/user/:user_id
router.get("/user/:user_id", (req, res) => {
  const { user_id } = req.params;
  db.query("SELECT * FROM doctors WHERE user_id = ?", [user_id], (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });
    if (results.length === 0) return res.status(404).json({ message: "Doctor not found" });
    res.json(results[0]);
  });
});

// Update doctor profile
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, bio, department_id } = req.body;
  db.query(
    "UPDATE doctors SET name = ?, bio = ?, department_id = ? WHERE id = ?",
    [name, bio, department_id, id],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Server error" });
      res.json({ message: "Profile updated" });
    }
  );
});

module.exports = router;