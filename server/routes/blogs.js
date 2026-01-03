const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { protect, admin, editor, staff } = require('../middleware/authMiddleware');

// @desc    Get all published blogs (Public)
// @route   GET /api/blogs
router.get('/', async (req, res) => {
    try {
        // Public only sees published
        const blogs = await Blog.find({ status: 'published', published: true }).sort({ createdAt: -1 });
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get all blogs for Admin/Editor (Internal)
// @route   GET /api/blogs/all
router.get('/all', protect, editor, async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({ createdAt: -1 }).populate('author', 'username fullName');
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get single blog (Public: Published only, Staff/Editor: Any if author or role allows)
// @route   GET /api/blogs/:slug
router.get('/:slug', async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug }).populate('author', 'username fullName bio avatar');
        
        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        // If public, only show if published
        // If logged in (not implemented here fully without token parsing in public route, assuming this is public view)
        // For simplicity: this public route usually returns only published. 
        // Admin dashboard should use a separate ID-based route or client should handle Auth check.
        
        // Strict Check for Public API
        if (blog.status !== 'published') {
             return res.status(404).json({ message: 'Blog not found or not published' });
        }

        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Get single blog by ID (For Editor/Admin/Staff editing)
// @route   GET /api/blogs/manage/:id
router.get('/manage/:id', protect, staff, async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if(blog) {
             // Staff can only see their own drafts/pending? Or all? 
             // Usually editors need to see all. Staff might just see own. 
             // Letting staff see all for collaboration for now.
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
// @access  Private (Staff/Editor/Admin)
router.post('/', protect, staff, async (req, res) => {
    try {
        const { title, slug, content, image, categories, tags, status } = req.body;

        // Staff forced to 'pending' or 'draft'
        let initialStatus = status || 'draft';
        if (req.user.role === 'staff' && initialStatus === 'published') {
            initialStatus = 'pending';
        }

        const blog = new Blog({
            title,
            slug,
            content,
            image,
            categories,
            tags,
            author: req.user._id,
            status: initialStatus,
            published: initialStatus === 'published',
            approvalLog: [{
                status: initialStatus,
                by: req.user._id,
                comment: 'Initial creation'
            }]
        });

        const createdBlog = await blog.save();
        res.status(201).json(createdBlog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private
router.put('/:id', protect, staff, async (req, res) => {
    try {
        const { title, slug, content, image, categories, tags, status, comment } = req.body;
        const blog = await Blog.findById(req.params.id);

        if (blog) {
            // Permission Check: Staff can only edit own posts
            if (req.user.role === 'staff' && blog.author.toString() !== req.user._id.toString()) {
                return res.status(403).json({ message: 'Not authorized to edit this post' });
            }

            blog.title = title || blog.title;
            blog.slug = slug || blog.slug;
            blog.content = content || blog.content;
            blog.image = image !== undefined ? image : blog.image;
            blog.categories = categories || blog.categories;
            blog.tags = tags || blog.tags;

            // Stats Logic
            if (status) {
                // If staff tries to publish, force pending
                if (req.user.role === 'staff' && status === 'published') {
                    blog.status = 'pending';
                } else {
                    blog.status = status;
                }
                
                // Update boolean for backward compat or easy query
                blog.published = (blog.status === 'published');

                // Log change
                blog.approvalLog.push({
                    status: blog.status,
                    by: req.user._id,
                    comment: comment || `Status changed to ${blog.status}`
                });
            }

            const updatedBlog = await blog.save();
            res.json(updatedBlog);
        } else {
            res.status(404).json({ message: 'Blog not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private (Admin/Editor only, or owner?)
router.delete('/:id', protect, editor, async (req, res) => {
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
