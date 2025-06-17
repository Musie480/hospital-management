const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all departments with services
router.get("/", (req, res) => {
  const query = `
    SELECT d.id as department_id, d.name as department_name, d.description as department_desc,
           s.id as service_id, s.name as service_name, s.description as service_desc
    FROM departments d
    LEFT JOIN services s ON d.id = s.department_id
    ORDER BY d.name, s.name;
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: "Server error" });

    // Transform to hierarchical JSON
    const departments = [];
    let currentDept = null;

    results.forEach(row => {
      if (!currentDept || currentDept.id !== row.department_id) {
        currentDept = {
          id: row.department_id,
          name: row.department_name,
          description: row.department_desc,
          services: []
        };
        departments.push(currentDept);
      }
      if (row.service_id) {
        currentDept.services.push({
          id: row.service_id,
          name: row.service_name,
          description: row.service_desc
        });
      }
    });

    res.json(departments);
  });
});

module.exports = router;
