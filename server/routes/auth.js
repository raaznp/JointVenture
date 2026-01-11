const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res) => {
    res.status(403).json({ message: 'Public registration is disabled. Please contact admin.' });
});

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Check for user email
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        // Streak Logic
        const today = new Date();
        const lastLogin = user.lastLogin ? new Date(user.lastLogin) : null;
        
        let newStreak = user.streak || 0;

        if (lastLogin) {
            const diffTime = Math.abs(today - lastLogin);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

            // If last login was yesterday (1 day difference roughly), increment
            // Actually better to check if it's the same day
            const isSameDay = today.getDate() === lastLogin.getDate() && 
                              today.getMonth() === lastLogin.getMonth() && 
                              today.getFullYear() === lastLogin.getFullYear();

            if (!isSameDay) {
                // Check if it was yesterday
                const yesterday = new Date(today);
                yesterday.setDate(yesterday.getDate() - 1);
                
                const isYesterday = yesterday.getDate() === lastLogin.getDate() &&
                                    yesterday.getMonth() === lastLogin.getMonth() &&
                                    yesterday.getFullYear() === lastLogin.getFullYear();
                
                if (isYesterday) {
                    newStreak += 1;
                } else {
                    newStreak = 1; // Reset if missed a day
                }
            }
        } else {
            newStreak = 1; // First login ever
        }

        user.streak = newStreak;
        user.lastLogin = today;
        await user.save();

        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            streak: newStreak,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({ message: 'Invalid credentials' });
    }
});

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
router.get('/me', require('../middleware/authMiddleware').protect, async (req, res) => {
    res.status(200).json(req.user);
});

module.exports = router;
