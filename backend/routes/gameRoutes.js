const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'destinations.json');
let data = [];

try {
  data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
} catch (err) {
  console.error("❌ Error reading destinations.json:", err.message);
  data = [];
}

router.get('/random', (req, res) => {
  if (data.length === 0) {
    return res.status(500).json({ error: "No destination data available" });
  }

  const randomIndex = Math.floor(Math.random() * data.length);
  const correct = data[randomIndex];

  // Avoid duplicate answers
  const wrongOptions = data
    .filter((d, i) => i !== randomIndex && d.answer !== correct.answer)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
    .map((d) => d.answer);

  // Ensure options are unique
  const optionsSet = new Set([...wrongOptions, correct.answer]);
  const options = Array.from(optionsSet).sort(() => 0.5 - Math.random());

  res.json({
    clues: correct.clues.slice(0, 2),
    options,
    answer: correct.answer,
    funFacts: correct.funFacts
  });
});

module.exports = router;
