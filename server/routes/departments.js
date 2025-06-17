const express = require("express");
const router = express.Router();
const db = require("../db");

// GET /api/departments
router.get("/", (req, res) => {
  db.query("SELECT * FROM departments", (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });
    res.json(results);
  });
});

module.exports = router;