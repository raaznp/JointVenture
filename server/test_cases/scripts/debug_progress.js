const mongoose = require('mongoose');
const User = require('../../models/User'); // Adjust path
const Course = require('../../models/Course'); // Adjust path
require('dotenv').config({ path: '../../.env' }); // Adjust path to root .env

const debugProgress = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // 1. Get a test user (admin)
        const user = await User.findOne({ email: 'admin@example.com' });
        if (!user) {
            console.log('User not found');
            process.exit(1);
        }
        console.log('User found:', user.email);

        // 2. Get a course
        const course = await Course.findOne({ title: 'Warehouse Equipment Familiarisation' });
        if (!course) {
            console.log('Course not found');
            process.exit(1);
        }
        console.log('Course found:', course.title);

        const moduleId = course.modules[0]._id.toString();
        const courseId = course._id.toString();

        console.log(`Testing Progress Update for Course: ${courseId}, Module: ${moduleId}`);

        // 3. Simulate Logic from users.js
        console.log('--- Simulating Backend Logic ---');
        
        let courseProgressIndex = user.courseProgress.findIndex(cp => cp.courseId.toString() === courseId);
        
        if (courseProgressIndex > -1) {
            console.log('Entry exists. Current modules:', user.courseProgress[courseProgressIndex].completedModules);
            if (!user.courseProgress[courseProgressIndex].completedModules.includes(moduleId)) {
                user.courseProgress[courseProgressIndex].completedModules.push(moduleId);
                console.log('Added module.');
            } else {
                console.log('Module already in list.');
            }
        } else {
            console.log('Create new entry.');
            user.courseProgress.push({
                courseId: courseId,
                completedModules: [moduleId]
            });
        }

        await user.save();
        console.log('User Saved.');

        // 4. Verify Persistence
        const updatedUser = await User.findById(user._id);
        const savedEntry = updatedUser.courseProgress.find(cp => cp.courseId.toString() === courseId);
        
        console.log('--- Verification ---');
        if (savedEntry && savedEntry.completedModules.includes(moduleId)) {
            console.log('SUCCESS: Progress saved to database.');
        } else {
            console.log('FAILURE: Progress NOT saved.');
        }

        process.exit();

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

debugProgress();
