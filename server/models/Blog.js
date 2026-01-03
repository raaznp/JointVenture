const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    metaDescription: { type: String },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    categories: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    image: { type: String, default: '' }, // Featured Image URL
    imageAlt: { type: String, default: '' }, // Alt text for the image
    
    // Workflow Fields
    status: { 
        type: String, 
        enum: ['draft', 'pending', 'published', 'rejected'], 
        default: 'draft' 
    },
    approvalLog: [{
        status: { type: String },
        by: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        date: { type: Date, default: Date.now },
        comment: { type: String }
    }],

    published: { type: Boolean, default: false }, // Dependent on status='published'
    visibility: { type: String, enum: ['public', 'private'], default: 'public' },
    publishedAt: { type: Date },
    readingTime: { type: Number, default: 0 }, // in minutes
    commentsEnabled: { type: Boolean, default: true }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Blog', blogSchema);
