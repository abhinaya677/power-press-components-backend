// db.js
const mysql = require('mysql2');
require('dotenv').config();

// Option 1: Use individual connection parameters (recommended)
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'yamabiko.proxy.rlwy.net',
  port: process.env.DB_PORT || 14202,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'tOPHAsWnsVnfNzUIyHAjChYxhFHTPEfz',
  database: process.env.DB_NAME || 'railway',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Option 2: Use connection string (needs mysql2 >= 2.3.0)
const poolFromUrl = mysql.createPool(
  process.env.DATABASE_URL || 
  'mysql://root:tOPHAsWnsVnfNzUIyHAjChYxhFHTPEfz@yamabiko.proxy.rlwy.net:14202/railway'
);

// Export promise-based pool
module.exports = pool.promise();  // or poolFromUrl.promise() if using URL
