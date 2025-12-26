const mongoose = require('mongoose');

const moduleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    type: { type: String, enum: ['video', 'text', '360', 'quiz'], default: 'text' },
    content: { type: String }, // URL or text content
    isLocked: { type: Boolean, default: true },
    hotspots: [{
        pitch: Number,
        yaw: Number,
        text: String,
        type: { type: String, default: 'info' }
    }],
    // Add Questions for Quiz
    questions: [{
        question: String,
        options: [String],
        correct: Number
    }]
});

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
    },
    modules: [moduleSchema],
}, {
    timestamps: true,
});

module.exports = mongoose.model('Course', courseSchema);
