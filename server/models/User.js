const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'editor', 'staff', 'user'], // Kept 'user' for backward compatibility if needed, but default is staff/user?
        default: 'staff',
    },
    // Profile Fields (Ported from Safe360)
    fullName: { type: String, default: '' },
    phone: { type: String, default: '' },
    address: { type: String, default: '' },
    bio: { type: String, default: '' },
    avatar: { type: String, default: '' },
    
    // Social Media
    socials: {
        linkedin: { type: String, default: '' },
        github: { type: String, default: '' },
        twitter: { type: String, default: '' },
        website: { type: String, default: '' }
    },

    // Education
    education: [{
        school: { type: String },
        degree: { type: String },
        year: { type: String }
    }],

    // Work History
    workHistory: [{
        company: { type: String },
        role: { type: String },
        location: { type: String },
        duration: { type: String },
        description: { type: String }
    }]
}, {
    timestamps: true,
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await require('bcryptjs').genSalt(10);
    var hash = await require('bcryptjs').hash(this.password, salt);
    this.password = hash; 
    // Fixed: previous code had `this.password = await ...` which is fine but sometimes `await` inside pre-save needs care. 
    // Actually the original code was clean. I'm just ensuring it matches.
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await require('bcryptjs').compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
