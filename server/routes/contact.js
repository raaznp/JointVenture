const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { protect, admin, editor } = require('../middleware/authMiddleware');

// @route POST /api/contact
// @desc Submit contact form (Public)
router.post('/', async (req, res) => {
    const { firstName, lastName, email, message } = req.body;
    try {
        const contact = new Contact({ firstName, lastName, email, message });
        await contact.save();
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @route GET /api/contact
// @desc View all messages (Admin or Editor)
router.get('/', protect, editor, async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
