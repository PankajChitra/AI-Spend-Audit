const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const auditRoutes = require("./routes/auditRoutes");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "API running",
  });
});

app.use("/api/audit", auditRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});