const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const { protect } = require('../middleware/authMiddleware');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Private
router.get('/', protect, async (req, res) => {
    try {
        const courses = await Course.find({});
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get course by ID
// @route   GET /api/courses/:id
// @access  Private
router.get('/:id', protect, async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (course) {
            res.json(course);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Create a course (Admin only - simplified for now)
// @route   POST /api/courses
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const { title, description, thumbnail, modules } = req.body;
        const course = new Course({
            title,
            description,
            thumbnail,
            modules,
        });
        const createdCourse = await course.save();
        res.status(201).json(createdCourse);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
