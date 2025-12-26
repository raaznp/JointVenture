require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const debugLogin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected to:', process.env.MONGO_URI);

        const email = 'admin@example.com';
        const password = '123456';

        const count = await User.countDocuments();
        console.log(`Total Users in DB: ${count}`);

        const user = await User.findOne({ email });

        if (!user) {
            console.log('❌ User not found:', email);
        } else {
            console.log('✅ User found:', user.email);
            console.log('   Stored Hash:', user.password);
            
            const isMatch = await user.matchPassword(password);
            const manualMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                console.log('✅ matchPassword() succeeded');
            } else {
                console.log('❌ matchPassword() failed');
            }

            if (manualMatch) {
                console.log('✅ Manual bcrypt.compare() succeeded');
            } else {
                console.log('❌ Manual bcrypt.compare() failed');
            }
        }
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

debugLogin();
