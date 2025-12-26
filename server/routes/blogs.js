const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ date: -1 }); // Sort by date descending
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get single blog
// @route   GET /api/blogs/:id
// @access  Public
router.get('/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog) {
            res.json(blog);
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Create a blog
// @route   POST /api/blogs
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
    try {
        const { title, excerpt, content, author, date, image, category } = req.body;

        const blog = new Blog({
            title,
            excerpt,
            content,
            author,
            date,
            image,
            category
        });

        const createdBlog = await blog.save();
        res.status(201).json(createdBlog);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const { title, excerpt, content, author, date, image, category } = req.body;
        const blog = await Blog.findById(req.params.id);

        if (blog) {
            blog.title = title || blog.title;
            blog.excerpt = excerpt || blog.excerpt;
            blog.content = content || blog.content;
            blog.author = author || blog.author;
            blog.date = date || blog.date;
            blog.image = image || blog.image;
            blog.category = category || blog.category;

            const updatedBlog = await blog.save();
            res.json(updatedBlog);
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (blog) {
            await blog.deleteOne();
            res.json({ message: 'Blog removed' });
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
