const express = require('express');
const router = express.Router();
const TeamMember = require('../models/TeamMember');
const { protect, admin } = require('../middleware/authMiddleware');

// @route GET /api/team
// @desc Get all team members (Public - Active only)
router.get('/', async (req, res) => {
    try {
        const members = await TeamMember.find({ active: true }).sort({ order: 1 });
        res.json(members);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route GET /api/team/id/:id
// @desc Get single team member
router.get('/id/:id', async (req, res) => {
    try {
        const member = await TeamMember.findById(req.params.id);
        if (member) {
            res.json(member);
        } else {
            res.status(404).json({ message: 'Member not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route GET /api/team/all
// @desc Get all team members (Admin only - includes inactive)
router.get('/all', protect, admin, async (req, res) => {
    try {
        const members = await TeamMember.find().sort({ order: 1 });
        res.json(members);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route POST /api/team
// @desc Add a team member (Admin only)
router.post('/', protect, admin, async (req, res) => {
    try {
        const { name, role, bio, social, active, order, image } = req.body;
        
        const member = new TeamMember({
            name,
            role,
            bio,
            image, // Assuming URL passed directly for now (simplified vs multer)
            social: social ? social : {},
            active: active === 'true' || active === true,
            order: order ? parseInt(order) : 0
        });

        await member.save();
        res.status(201).json(member);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @route PUT /api/team/:id
// @desc Update team member (Admin only)
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const { name, role, bio, social, active, order, image } = req.body;
        const member = await TeamMember.findById(req.params.id);

        if (!member) return res.status(404).json({ message: 'Member not found' });

        if (name) member.name = name;
        if (role) member.role = role;
        if (bio) member.bio = bio;
        if (image) member.image = image;
        if (social) member.social = social;
        if (active !== undefined) member.active = active;
        if (order !== undefined) member.order = parseInt(order);

        await member.save();
        res.json(member);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @route DELETE /api/team/:id
// @desc Delete team member (Admin only)
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        await TeamMember.findByIdAndDelete(req.params.id);
        res.json({ message: 'Member removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
