const router = require('express').Router();
const User = require('../models/User');

// GET /api/dev/users - Check what users exist
router.get('/users', async (req, res) => {
    try {
        const users = await User.find({}, 'email role username');
        res.json(users);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

// GET /api/dev/fix-admin - Force reset admin
router.get('/fix-admin', async (req, res) => {
    try {
        // Remove existing admins to avoid conflicts
        await User.deleteMany({ role: 'admin' });
        
        // Create fresh admin
        const admin = new User({
            username: 'jointventure',
            email: 'admin@example.com',
            password: 'password123', // hooks will hash this
            role: 'admin',
            fullName: 'Joint Venture Admin',
            bio: 'System Administrator',
            socials: {},
            education: [],
            workHistory: []
        });
        
        await admin.save();
        res.json({ 
            status: 'SUCCESS', 
            message: 'Admin reset', 
            credentials: { email: 'admin@example.com', password: 'password123' } 
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;
