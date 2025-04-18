const express = require('express');
const cors = require('cors');
require('dotenv').config();

const gameRoutes = require('./routes/gameRoutes');
const userRoutes = require('./routes/userRoutes'); // ✅ Import this

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/game', gameRoutes);
app.use('/api', userRoutes);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
