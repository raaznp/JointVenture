const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Blog = require('../models/Blog');
const Job = require('../models/Job');
const Course = require('../models/Course');
const Certificate = require('../models/Certificate');

// @desc    Fix Passwords and Data on Production
// @route   GET /api/dev/fix-passwords
// @access  Public (Temporary)
router.get('/fix-passwords', async (req, res) => {
    try {
        const usersToFix = ['admin@example.com', 'editor@example.com', 'staff@example.com', 'user@example.com'];
        const fixedUsers = [];

        // 1. Fix Users
        for (const email of usersToFix) {
            const user = await User.findOne({ email });
            if (user) {
                user.password = 'password123'; // Triggers pre-save hash
                await user.save();
                fixedUsers.push(user.username);
            }
        }

        // 2. Fix Duplicate Blogs
        const blogs = await Blog.find({});
        const seenSlugs = new Set();
        let deletedBlogs = 0;
        for (const blog of blogs) {
            if (seenSlugs.has(blog.slug)) {
                await Blog.findByIdAndDelete(blog._id);
                deletedBlogs++;
            } else {
                seenSlugs.add(blog.slug);
            }
        }

        res.json({
            message: 'Data Repair Complete',
            fixedUsers,
            deletedDuplicateBlogs: deletedBlogs,
            note: 'Passwords reset to password123'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
