const express = require("express");
const cors = require("cors");
const appointmentRoutes = require("./routes/appointment");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/appointment", require("./routes/appointment"));
app.use("/api/departments", require("./routes/departments"));
app.use("/api/doctors", require("./routes/doctors"));
app.use("/api/register", require("./routes/register"));
app.use("/api/login", require("./routes/login"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/doctor", require("./routes/doctor"));

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
