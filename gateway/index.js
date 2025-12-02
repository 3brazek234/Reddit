const express = require("express");
require("dotenv").config();
const authRoutes = require("./src/routes/authRoutes");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/auth", authRoutes);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
