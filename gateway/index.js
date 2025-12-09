const express = require("express");
require("dotenv").config();

const authRoutes = require("./src/routes/authRoutes");
const cors = require("cors");
const imgUploadRoute = require("./src/routes/uploadRoute");
const postRoutes = require("./src/routes/postRoutes");
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/api", imgUploadRoute);
app.use("/api", postRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
