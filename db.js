const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createPool(process.env.MYSQL_URL);

db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    console.log("✅ Connected to Railway MySQL");
    connection.release();
  }
});

module.exports = db;
