const mongoose = require('mongoose');
const User = require('../../models/User');
const Course = require('../../models/Course');
const Certificate = require('../../models/Certificate');
require('dotenv').config({ path: '../../.env' });

const forceComplete = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // 1. Get Admin User
        const user = await User.findOne({ email: 'admin@example.com' });
        if (!user) { console.log('User not found'); process.exit(1); }

        // 2. Get Target Course
        const course = await Course.findOne({ title: { $regex: 'Safety Protocols', $options: 'i' } });
        if (!course) { console.log('Course not found'); process.exit(1); }
        console.log(`Found Course: ${course.title}`);

        // 3. Complete All Modules
        const allModuleIds = course.modules.map(m => m._id.toString());
        
        let progressEntry = user.courseProgress.find(cp => cp.courseId.toString() === course._id.toString());
        if (!progressEntry) {
            user.courseProgress.push({
                courseId: course._id,
                completedModules: allModuleIds
            });
        } else {
            progressEntry.completedModules = allModuleIds;
        }

        await user.save();
        console.log('User Progress Updated: 100%');

        // 4. Generate Certificate
        const existingCert = await Certificate.findOne({ user: user._id, course: course._id });
        if (!existingCert) {
            await Certificate.create({
                user: user._id,
                course: course._id,
                issueDate: new Date(),
                code: `CERT-${Date.now()}-${Math.floor(Math.random() * 1000)}`
            });
            console.log('Certificate Generated');
        } else {
            console.log('Certificate Already Exists');
        }

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

forceComplete();
