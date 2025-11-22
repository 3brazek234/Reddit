
const { Pool } = require("pg");
require("dotenv").config();

const db = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432", 10),
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

db.on("connect", () => {
  console.log("Connected to the PostgreSQL database!");
});

db.on("error", (err) => {
  console.error("Error connecting to the PostgreSQL database:", err.message);
});

module.exports = db;