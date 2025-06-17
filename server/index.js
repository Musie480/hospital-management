const express = require("express");
const cors = require("cors");
const appointmentRoutes = require("./routes/appointment");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/appointment", appointmentRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
