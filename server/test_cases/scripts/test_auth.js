require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const testAuth = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        const email = 'admin@example.com';
        const password = 'password123';

        console.log(`Checking user: ${email}`);
        const user = await User.findOne({ email });

        if (!user) {
            console.log('User NOT FOUND in database.');
        } else {
            console.log('User FOUND.');
            console.log(`Role: ${user.role}`);
            console.log(`Stored Password Hash: ${user.password}`);
            console.log(`Testing matchPassword('${password}')...`);
            
            const isMatch = await user.matchPassword(password);
            
            if (isMatch) {
                console.log('SUCCESS: Password matches! Login should work.');
            } else {
                console.log('FAILURE: Password DOES NOT match.');
                
                // Debugging: Try creating a fresh hash and comparing
                const bcrypt = require('bcryptjs');
                const salt = await bcrypt.genSalt(10);
                const newHash = await bcrypt.hash(password, salt);
                console.log(`Test Hash of '${password}': ${newHash}`);
            }
        }
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

testAuth();
