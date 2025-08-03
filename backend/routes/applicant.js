// backend/routes/applicant.js
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator'); // Import check and validationResult
const Applicant = require('../models/applicantSchema');

// Validation rules for applicant registration
const registerValidationRules = [
    check('fullName')
        .notEmpty().withMessage('Full name is required')
        .isLength({ min: 3 }).withMessage('Full name must be at least 3 characters long'),
    check('email')
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Please enter a valid email address')
        .normalizeEmail(), // Sanitize email (e.g., converts to lowercase)
    check('phone')
        .notEmpty().withMessage('Phone number is required')
        .isMobilePhone().withMessage('Please enter a valid phone number'), // Adjust locale if needed, e.g., 'en-IN'
    check('interest')
        .notEmpty().withMessage('Interest (Intern/Volunteer) is required')
        .isIn(['Intern', 'Volunteer']).withMessage('Interest must be either "Intern" or "Volunteer"'),
    check('resume')
        .notEmpty().withMessage('Resume URL is required')
        .isURL().withMessage('Resume must be a valid URL'), // Validating as a URL now
    check('whythisjob')
        .optional() // This field is optional
        .isLength({ max: 500 }).withMessage('Why this job? message can be at most 500 characters long')
];

// Route to handle new applicant registration
// POST /api/routes/register
router.post('/register',
    registerValidationRules, // Apply validation rules here
    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const newApplicant = new Applicant(req.body);
            await newApplicant.save();
            res.status(201).json({ message: 'Registration successful!', applicant: newApplicant });
        } catch (error) {
            if (error.code === 11000) { // Duplicate key error (e.g., email already exists)
                return res.status(400).json({ message: 'An applicant with this email already exists.' });
            }
            console.error('Registration error:', error);
            res.status(500).json({ message: 'Server error during registration.', error: error.message });
        }
    }
);

// Route to get all applicants (for admin view)
// GET /api/routes/applicants
router.get('/applicants', async (req, res) => {
    try {
        const applicants = await Applicant.find({});
        res.status(200).json(applicants);
    } catch (error) {
        console.error('Fetch applicants error:', error);
        res.status(500).json({ message: 'Server error fetching applicants.', error: error.message });
    }
});

module.exports = router;