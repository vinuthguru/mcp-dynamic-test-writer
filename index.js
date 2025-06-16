// index.js
require('dotenv').config();
const express = require('express');
const app = express();
const apiRoutes = require('./routes/api');
const mockRoutes = require('./routes/mock');

app.use(express.json());
// Main API routes for generation
app.use('/api', apiRoutes);

// Mock Jira simulation route
app.use('/api', mockRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`MCP Server running on port ${PORT}`));

