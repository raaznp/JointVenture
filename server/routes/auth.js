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

    try {
        // Check for user email
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            // Streak Logic - Wrapped to prevent blocking
            try {
                const today = new Date();
                const lastLogin = user.lastLogin ? new Date(user.lastLogin) : null;
                
                let newStreak = user.streak || 0;

                if (lastLogin) {
                    const diffTime = Math.abs(today - lastLogin);
                    const isSameDay = today.getDate() === lastLogin.getDate() && 
                                      today.getMonth() === lastLogin.getMonth() && 
                                      today.getFullYear() === lastLogin.getFullYear();

                    if (!isSameDay) {
                        const yesterday = new Date(today);
                        yesterday.setDate(yesterday.getDate() - 1);
                        const isYesterday = yesterday.getDate() === lastLogin.getDate() &&
                                            yesterday.getMonth() === lastLogin.getMonth() &&
                                            yesterday.getFullYear() === lastLogin.getFullYear();
                        
                        if (isYesterday) {
                            newStreak += 1;
                        } else {
                            newStreak = 1;
                        }
                    }
                } else {
                    newStreak = 1;
                }

                user.streak = newStreak;
                user.lastLogin = today;
                await user.save();
            } catch (streakError) {
                console.error('Streak update failed (non-fatal):', streakError.message);
            }

            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                streak: user.streak, // Use the actual user object streak
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ message: 'Server error during login', error: error.message });
    }
});

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
router.get('/me', require('../middleware/authMiddleware').protect, async (req, res) => {
    res.status(200).json(req.user);
});

module.exports = router;
