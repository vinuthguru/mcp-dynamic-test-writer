// app.js
const express = require('express');
const app = express();

app.use(express.json());

// Middleware to simulate auth check
function authenticate(req, res, next) {
  const authHeader = req.header('Authorization');

  if (!authHeader || authHeader !== 'Bearer validtoken') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
}

// Protected route
app.get('/api/profile', authenticate, (req, res) => {
  res.status(200).json({
    username: 'john_doe',
    email: 'john@example.com',
  });
});

module.exports = app;
