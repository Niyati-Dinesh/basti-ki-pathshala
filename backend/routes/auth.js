// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

// For this assignment, we're hardcoding admin credentials from .env
// In a real application, these would come from a database, securely hashed.
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD_BACKEND = process.env.ADMIN_PASSWORD_BACKEND;

// Validation rules for login
const loginValidationRules = [
  check('username').notEmpty().withMessage('Username is required'),
  check('password').notEmpty().withMessage('Password is required')
];

// POST /api/auth/admin/login
router.post('/admin/login',
  loginValidationRules,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { username, password } = req.body;

    // Basic credential check (replace with database lookup and password hashing in real app)
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD_BACKEND) {
      // In a real app, you'd generate a JWT here and send it to the client.
      res.status(200).json({ success: true, message: 'Login successful!' });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password.' });
    }
  }
);

module.exports = router;