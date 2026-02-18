require('dotenv').config();  // load .env
const mysql = require("mysql2");


// create a connection pool
const db = mysql.createPool(process.env.MYSQL_URL);

// test connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("✅ Connected to MySQL!");
  connection.release();
});

module.exports = db;  // export for use in other files




