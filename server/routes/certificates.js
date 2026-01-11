const express = require('express');
const router = express.Router();
const Certificate = require('../models/Certificate');
const Course = require('../models/Course');
const { protect } = require('../middleware/auth');

// @route   POST /api/certificates
// @desc    Issue a new certificate
// @access  Private
router.post('/', protect, async (req, res) => {
    const { courseId } = req.body;

    if (!courseId) {
        return res.status(400).json({ message: 'Course ID is required' });
    }

    try {
        // Check if course exists
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Check if certificate already exists
        const existingCert = await Certificate.findOne({
            user: req.user._id,
            course: courseId
        });

        if (existingCert) {
            return res.status(200).json(existingCert); // Return existing if found
        }

        // Create new certificate
        const certificate = await Certificate.create({
            user: req.user._id,
            course: courseId,
            code: 'JV-CERT-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
            issueDate: new Date()
        });

        res.status(201).json(certificate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/certificates
// @desc    Get logged in user's certificates
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const certificates = await Certificate.find({ user: req.user._id })
            .populate('course', 'title thumbnail')
            .sort('-issueDate');
        res.json(certificates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @route   GET /api/certificates/:id
// @desc    Get certificate by ID
// @access  Private (or Public if sharing is allowed? Keeping private/protect for now)
router.get('/:id', protect, async (req, res) => {
    try {
        const certificate = await Certificate.findById(req.params.id)
            .populate('course', 'title')
            .populate('user', 'fullName');

        if (!certificate) {
            return res.status(404).json({ message: 'Certificate not found' });
        }

        // Optional: specific authorization check? 
        // For now, if you have the ID and are logged in, you can view it (e.g. valid for verification)
        
        res.json(certificate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
