const express = require("express");
const router = express.Router();
const db = require("../db");

// Get doctors with education
router.get("/", (req, res) => {
  const query = `
    SELECT doc.id as doctor_id, doc.name, doc.specialization, doc.bio,
           edu.degree, edu.institution, edu.year
    FROM doctors doc
    LEFT JOIN doctor_education edu ON doc.id = edu.doctor_id
    ORDER BY doc.name, edu.year DESC;
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });

    const doctorsMap = new Map();

    results.forEach(row => {
      if (!doctorsMap.has(row.doctor_id)) {
        doctorsMap.set(row.doctor_id, {
          id: row.doctor_id,
          name: row.name,
          specialization: row.specialization,
          bio: row.bio,
          education: []
        });
      }
      if (row.degree) {
        doctorsMap.get(row.doctor_id).education.push({
          degree: row.degree,
          institution: row.institution,
          year: row.year,
        });
      }
    });

    res.json(Array.from(doctorsMap.values()));
  });
});

module.exports = router;
