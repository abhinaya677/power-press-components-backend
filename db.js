// db.js
const mysql = require('mysql2');
require('dotenv').config();

// Use your Railway connection string
const DB_URL = process.env.DATABASE_URL || 
    'mysql://root:tOPHAsWnsVnfNzUIyHAjChYxhFHTPEfz@yamabiko.proxy.rlwy.net:14202/railway';

// Create a pool
const pool = mysql.createPool(DB_URL);

// Export promise-based pool for async/await
module.exports = pool.promise();
