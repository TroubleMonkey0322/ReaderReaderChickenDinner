// Import express
const express = require('express');
const app = express();

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Basic route for home
app.get('/', (req, res) => {
  res.send('Welcome to the Express API!');
});

// Sample route for user
app.get('/user', (req, res) => {
  res.json({ name: 'John Doe', age: 30 });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

