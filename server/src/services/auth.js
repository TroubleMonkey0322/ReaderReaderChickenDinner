const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');  // Assuming you have a User model
require('dotenv').config(); // For loading environment variables

// Middleware to verify JWT token
exports.authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied, token missing' });
  }

  try {
    // Verify the token using JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user information to the request object
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Helper function to create JWT token
exports.generateToken = (user) => {
  // Payload can contain user ID or any other info you want to include
  const payload = {
    id: user._id,
    username: user.username,
  };

  // Sign the JWT token with a secret key and set the expiration time
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Middleware to hash password before saving to DB
exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Middleware to compare plain password with hashed password
exports.comparePassword = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};
