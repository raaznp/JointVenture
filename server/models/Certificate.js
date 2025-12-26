const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    issueDate: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['Active', 'Revoked'],
        default: 'Active'
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Certificate', certificateSchema);
