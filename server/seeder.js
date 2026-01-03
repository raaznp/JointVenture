require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('./models/Course');
const User = require('./models/User');
const Job = require('./models/Job');
const Blog = require('./models/Blog');
const Certificate = require('./models/Certificate');
const bcrypt = require('bcryptjs');

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        await Course.deleteMany({});
        await User.deleteMany({});
        await Job.deleteMany({});
        await Blog.deleteMany({});
        await Certificate.deleteMany({});

        // Seed Users
        const users = [
            {
                username: 'admin',
                fullName: 'Super Admin',
                email: 'admin@example.com',
                password: 'password123',
                role: 'admin',
                bio: 'Managing the entire platform.'
            },
            {
                username: 'editor_jane',
                fullName: 'Jane Editor',
                email: 'editor@example.com',
                password: 'password123',
                role: 'editor',
                bio: 'Content supervisor.'
            },
            {
                username: 'staff_bob',
                fullName: 'Bob Staff',
                email: 'staff@example.com',
                password: 'password123',
                role: 'staff',
                bio: 'Content creator.'
            },
            {
                username: 'jointventure',
                fullName: 'Joint Venture Admin',
                email: 'jv@example.com',
                password: 'password123',
                role: 'admin',
                bio: 'System Administrator'
            },
            {
                username: 'demo_user',
                fullName: 'Demo User',
                email: 'user@example.com',
                password: 'password123',
                role: 'user', // Basic learner
                bio: 'Just learning.'
            }
        ];

        const createdUsers = [];
        for (const user of users) {
             const createdUser = await User.create(user);
             createdUsers.push(createdUser);
        }
        console.log('Users Seeded!');

        // Get IDs
        const adminUser = createdUsers.find(u => u.role === 'admin');
        const editorUser = createdUsers.find(u => u.role === 'editor');
        const staffUser = createdUsers.find(u => u.role === 'staff');

        // Seed Blogs
        const blogs = [
            {
                title: "The Future of VR in Industrial Training",
                slug: "future-of-vr-industrial-training",
                metaDescription: "Explore how VR is revolutionizing safety training.",
                content: "<p>Virtual Reality (VR) is no longer just for gaming...</p>",
                author: adminUser._id,
                status: 'published',
                published: true,
                visibility: 'public',
                image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                categories: ["Technology"],
                tags: ["VR", "Safety"],
                approvalLog: [{ status: 'published', by: adminUser._id, date: new Date(), comment: 'Auto published by seed' }]
            },
            {
                title: "Top 5 Safety Protocols",
                slug: "top-5-safety-protocols",
                metaDescription: "Essential safety protocols for warehouses.",
                content: "<p>Ensuring safety in a busy warehouse is paramount...</p>",
                author: editorUser._id,
                status: 'published',
                published: true,
                visibility: 'public',
                image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                categories: ["Safety"],
                tags: ["Protocols", "Management"],
                approvalLog: [{ status: 'published', by: adminUser._id, date: new Date(), comment: 'Approved by Admin' }]
            },
            {
                title: "Draft Post by Staff",
                slug: "draft-post-staff",
                metaDescription: "A post waiting for review.",
                content: "<p>This is a draft post created by a staff member...</p>",
                author: staffUser._id,
                status: 'pending',
                published: false,
                visibility: 'public',
                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                categories: ["Drafts"],
                tags: ["Pending"],
                approvalLog: []
            }
        ];
        
        await Blog.insertMany(blogs);
        console.log('Blogs Seeded!');

        // Seed Courses (Kept mostly same, just ensuring no ref errors if any)
        const courses = [
            {
                title: 'Warehouse Equipment Familiarisation',
                description: 'Learn about the various equipment used in a modern warehouse.',
                thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
                modules: [
                    {
                        title: 'Forklift Safety',
                        description: 'Introduction to Forklift safety and operation.',
                        type: '360',
                        content: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/extra/Tonemapped%20JPG/empty_warehouse_01.jpg',
                        isLocked: false,
                        hotspots: [
                            { pitch: -5, yaw: 180, text: 'Main Aisle', type: 'info' },
                            { pitch: 10, yaw: 0, text: 'Roof Structure', type: 'info' }
                        ]
                    }
                ]
            }
        ];

        const createdCourses = await Course.insertMany(courses); // Capture for certs
        console.log('Courses Seeded!');

        // Seed Jobs
        const jobs = [
            {
                title: 'Senior Logistics Coordinator',
                department: 'Operations',
                location: 'New York, NY',
                type: 'Full-time',
                description: 'We are looking for an experienced Logistics Coordinator...'
            }
        ];
        await Job.insertMany(jobs);
        console.log('Jobs Seeded!');

        // Seed Certificates
        // Using the 'demo_user' created above
        const learner = createdUsers.find(u => u.username === 'demo_user');
        const demoCourse = createdCourses[0]; 

        if (learner && demoCourse) {
            const certificates = [
                {
                    user: learner._id,
                    course: demoCourse._id,
                    code: 'JV-CERT-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
                    issueDate: new Date()
                }
            ];
            await Certificate.insertMany(certificates);
            console.log('Certificates Seeded!');
        }

        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

seedData();
