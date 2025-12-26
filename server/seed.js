const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const adminExists = await User.findOne({ email: 'admin@example.com' });

        if (adminExists) {
            console.log('Admin user exists, updating password...');
            adminExists.password = '123456';
            await adminExists.save();
            console.log('Admin password updated to 123456');
            process.exit();
        }

        const admin = new User({
            name: 'Admin User',
            email: 'admin@example.com',
            password: '123456', // Will be hashed by pre-save hook
            role: 'admin',
        });

        await admin.save();
        console.log('Admin user created successfully');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedUsers();
