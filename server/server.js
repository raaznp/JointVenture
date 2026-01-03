require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Database Connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/team', require('./routes/team'));
app.use('/api/pages', require('./routes/pages'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/media', require('./routes/media'));
app.use('/api/files', require('./routes/files'));
app.use('/uploads', express.static('uploads'));
app.use('/api/dev', require('./routes/dev'));

app.get('/', (req, res) => {
    res.send('API is running...');
});

// Start Server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
