require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Blog = require('./models/Blog');

const manualFix = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const usersToFix = ['admin@example.com', 'editor@example.com', 'staff@example.com', 'user@example.com'];
        const fixedUsers = [];

        // 1. Fix Users
        console.log('Fixing Users...');
        for (const email of usersToFix) {
            const user = await User.findOne({ email });
            if (user) {
                user.password = 'password123'; // Triggers pre-save hash
                await user.save();
                fixedUsers.push(user.username);
                console.log(`- Fixed password for: ${user.username}`);
            } else {
                console.log(`- User not found: ${email}`);
            }
        }

        // 2. Fix Duplicate Blogs
        console.log('Fixing Duplicate Blogs...');
        const blogs = await Blog.find({});
        const seenSlugs = new Set();
        let deletedBlogs = 0;
        for (const blog of blogs) {
            if (seenSlugs.has(blog.slug)) {
                await Blog.findByIdAndDelete(blog._id);
                deletedBlogs++;
                console.log(`- Deleted duplicate blog: ${blog.title} (${blog.slug})`);
            } else {
                seenSlugs.add(blog.slug);
            }
        }

        console.log('--- Summary ---');
        console.log(`Fixed Users: ${fixedUsers.join(', ')}`);
        console.log(`Deleted Duplicate Blogs: ${deletedBlogs}`);
        console.log('Done.');

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

manualFix();
