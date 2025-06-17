// db.js
const mysql = require("mysql");

// ⚠️ Replace with your real credentials
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234@hav", // or your MySQL password
  database: "hospital_db", // make sure this database exists
});

// Connect and log status
db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
    process.exit(1);
  }
  console.log("✅ MySQL connected successfully.");
});

module.exports = db;
