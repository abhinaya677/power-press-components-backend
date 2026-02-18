require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db"); // make sure this exports a working MySQL connection

const app = express();
app.use(cors({ origin: "*" })); // for production, replace "*" with your frontend URL
app.use(express.json());

// --- LOGIN endpoint ---
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "Missing fields" });

  try {
    // TABLE NAME CHANGE: use 'login' instead of 'users'
    const [results] = await db.query("SELECT * FROM login WHERE username = ?", [username]);

    if (results.length === 0) return res.status(401).json({ error: "User not found" });

    // WARNING: password is plain text — for real apps, use bcrypt
    if (results[0].password === password) return res.json({ success: true });
    return res.status(401).json({ error: "Wrong password" });

  } catch (err) {
    console.error("DB error:", err);
    return res.status(500).json({ error: "Database error" });
  }
});

// --- CONTACT endpoint ---
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: "All fields required" });

  try {
    // TABLE NAME CHANGE: use 'contact' instead of 'contacts'
    await db.query(
      "INSERT INTO contact (name, email, message) VALUES (?, ?, ?)",
      [name, email, message]
    );
    res.json({ success: true });

  } catch (err) {
    console.error("DB error:", err);
    return res.status(500).json({ error: "Database error" });
  }
  // --- REGISTER endpoint ---
// --- REGISTER endpoint ---
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Missing fields" });

  try {
    const [results] = await db.query("SELECT * FROM login WHERE username = ?", [username]);
    if (results.length > 0)
      return res.status(409).json({ error: "Username already registered" });

    await db.query("INSERT INTO login (username, password) VALUES (?, ?)", [username, password]);

    res.json({ success: true });
  } catch (err) {
    console.error("DB error:", err);
    return res.status(500).json({ error: "Database error" });
  }
});

// --- LOGIN endpoint ---
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Missing fields" });

  try {
    const [results] = await db.query("SELECT * FROM login WHERE username = ?", [username]);
    if (results.length === 0)
      return res.status(401).json({ error: "Invalid username or password" });

    if (results[0].password !== password)
      return res.status(401).json({ error: "Invalid username or password" });

    res.json({ success: true, username: results[0].username });
  } catch (err) {
    console.error("DB error:", err);
    return res.status(500).json({ error: "Database error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




