const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const usersPath = path.join(__dirname, '..', 'data', 'users.json');

// Helper to read users
function getUsers() {
  try {
    const data = fs.readFileSync(usersPath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return {};
  }
}

// ✅ GET /api/user/:username
router.get('/user/:username', (req, res) => {
  const users = getUsers();
  const username = req.params.username;
  const userData = users[username];

  if (!userData) return res.json({ score: 0 });


  res.json({ score: userData.score || 0 });
});

// ✅ POST /api/user/:username to update score
router.post('/user/:username', (req, res) => {
  const users = getUsers();
  const username = req.params.username;
  const { score } = req.body;
  console.log("📩 POST called for", username, "with score", score);
  users[username] = { ...users[username], score };

  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
  res.json({ message: 'Score updated' });
});

module.exports = router;
