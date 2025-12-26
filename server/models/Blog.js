const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: String, required: true }, // Keeping as string for simplicity to match frontend 'December 15, 2025'
    image: { type: String, required: true },
    category: { type: String, required: true },
    content: { type: String }, // HTML content
}, {
    timestamps: true,
});

module.exports = mongoose.model('Blog', blogSchema);
