require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db"); // use pool from db.js

const app = express();
app.use(cors());
app.use(express.json());

// --- LOGIN endpoint ---
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ error: "Missing fields" });

  try {
    const [results] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
    if (results.length === 0) return res.status(401).json({ error: "User not found" });

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
  if (!name || !email || !message) return res.status(400).json({ error: "All fields are required" });

  try {
    await db.query(
      "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)",
      [name, email, message]
    );
    res.json({ success: true });
  } catch (err) {
    console.error("DB error:", err);
    return res.status(500).json({ error: "Database error" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
