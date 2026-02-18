// testDb.js
const db = require('./db');

async function testConnection() {
  try {
    const [rows] = await db.query('SELECT NOW() AS now'); // simple query
    console.log('✅ DB connected! Current time:', rows[0].now);
  } catch (err) {
    console.error('❌ DB connection error:', err);
  } finally {
    db.end(); // close the pool after testing
  }
}

testConnection();
