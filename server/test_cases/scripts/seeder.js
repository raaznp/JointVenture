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

        // NOTE: We are NOT deleting all data blindly anymore to preserve user modifications.
        // await User.deleteMany({}); 
        // await Job.deleteMany({});
        // await Blog.deleteMany({});
        // await Certificate.deleteMany({});
        
        // However, for Course Content, we often want the latest structure.
        // Strategy: Update existing courses or insert if missing.
        // For development simplicity requested by user, we will focus on updating specific seeded content.

        // Seed Users
        const users = [
            /* 
            {
                username: 'admin',
                fullName: 'Super Admin',
                email: 'admin@example.com',
                password: 'password123',
                role: 'admin',
                bio: 'Managing the entire platform.'
            }, 
            */
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
                email: 'admin@example.com', 
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
             // Check if user exists
             let userDoc = await User.findOne({ email: user.email });
             
             if (userDoc) {
                 // REPAIR: Reset password to trigger hashing (fix for plain text issue)
                 userDoc.password = 'password123';
                 // Preserve other fields if needed, but ensure role is correct for seed users
                 userDoc.role = user.role;
                 await userDoc.save(); 
                 console.log(`User ${user.username} updated (password re-hashed).`);
                 createdUsers.push(userDoc);
             } else {
                 userDoc = await User.create(user);
                 console.log(`User ${user.username} created.`);
                 createdUsers.push(userDoc);
             }
        }
        console.log('Users Sync Complete!');

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
        
        for (const blog of blogs) {
            const existingBlog = await Blog.findOne({ slug: blog.slug });
            if (!existingBlog) {
                await Blog.create(blog);
                console.log(`Blog '${blog.title}' created.`);
            } else {
                console.log(`Blog '${blog.title}' already exists.`);
            }
        }
        // await Blog.insertMany(blogs);
        console.log('Blogs Sync Complete!');

        // Seed Courses (Kept mostly same, just ensuring no ref errors if any)
        // Seed Courses
        const courses = [
            {
                title: 'Warehouse Equipment Familiarisation',
                description: 'Comprehensive training on modern warehouse machinery and safety standards. This is our core curriculum for all logistics personnel.',
                thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
                modules: [
                    {
                        title: 'Entrance & Security Checkpoint',
                        description: 'Mandatory entry point for all personnel. Security protocols strictly enforced.',
                        type: '360',
                        content: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/extra/Tonemapped%20JPG/parking_garage.jpg', // "Parking Garage" is the correct filename
                        isLocked: false,
                        hotspots: [
                            { pitch: -5, yaw: 180, text: 'ID Badge Scanner (Required for Entry)', type: 'info' },
                            { pitch: 0, yaw: 0, text: 'Visitor Logbook Station', type: 'info' },
                            { pitch: 10, yaw: 90, text: 'Mandatory PPE Signage', type: 'info' }
                        ]
                    },
                    {
                        title: 'Main Loading Dock',
                        description: 'Primary shipping and receiving zone. High traffic area.',
                        type: '360',
                        content: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/extra/Tonemapped%20JPG/empty_warehouse_01.jpg',
                        isLocked: false,
                        hotspots: [
                            { pitch: -10, yaw: 0, text: 'Dock Leveler Controls', type: 'info' },
                            { pitch: -15, yaw: 45, text: 'Wheel Chocks (Must be applied before loading)', type: 'info' },
                            { pitch: 20, yaw: 0, text: 'Overhead Door Controls (Next to Door)', type: 'info' }
                        ]
                    },
                     {
                        title: 'Forklift Charging Station',
                        description: 'Designated area for recharging electric material handling equipment.',
                        type: '360',
                        content: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/extra/Tonemapped%20JPG/machine_shop_02.jpg',

                        isLocked: false,
                        hotspots: [
                            { pitch: 0, yaw: 180, text: 'Battery Charger Unit (Turn off before connecting)', type: 'info' },
                            { pitch: 5, yaw: 90, text: 'Emergency Eye Wash Station', type: 'info' },
                            { pitch: -10, yaw: -45, text: 'Acid Spill Response Kit', type: 'info' }
                        ]
                    },
                    {
                        title: 'High-Bay Storage Aisles',
                        description: 'Dense storage area. Pedestrians must use mirrors at intersections.',
                        type: '360',
                        content: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/extra/Tonemapped%20JPG/empty_warehouse_01.jpg',
                        isLocked: false,
                        hotspots: [
                            { pitch: 15, yaw: 0, text: 'Rack Load Capacity Labels', type: 'info' },
                            { pitch: 0, yaw: 180, text: 'Aisle Mirrors (Check before crossing)', type: 'info' },
                            { pitch: -5, yaw: 45, text: 'Pallet Stacking Limits', type: 'info' }
                        ]
                    },
                    {
                        title: 'Packing & Sortation Area',
                        description: 'Final prep for outbound shipments. ergonomic mats provided.',
                        type: '360',
                        content: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/extra/Tonemapped%20JPG/autoshop_01.jpg', // Verified filename "autoshop_01"
                        isLocked: false,
                        hotspots: [
                            { pitch: 0, yaw: 0, text: 'Emergency Stop Button (Halts Conveyor)', type: 'info' },
                            { pitch: -10, yaw: 90, text: 'Barcode Scanner (Track Goods)', type: 'info' },
                            { pitch: -15, yaw: 180, text: 'Anti-Fatigue Mat (Stand here)', type: 'info' }
                        ]
                    },
                    {
                        title: 'Cold Storage / Freezer',
                        description: 'Temperature sensitive zone. Thermal curtains must remain closed.',
                        type: '360',
                        content: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/extra/Tonemapped%20JPG/carpentry_shop_01.jpg',
                        isLocked: false,
                        hotspots: [
                            { pitch: 10, yaw: 0, text: 'Temperature Gauge (Monitor Hourly)', type: 'info' },
                            { pitch: 20, yaw: 180, text: 'Thermal Curtain (Keep Closed)', type: 'info' },
                            { pitch: -10, yaw: 45, text: 'Ice Buildup Check', type: 'info' }
                        ]
                    },
                    {
                        title: 'Hazardous Materials Cage',
                        description: 'Secure storage for flammable and corrosive materials.',
                        type: '360',
                        content: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/extra/Tonemapped%20JPG/large_corridor.jpg',
                        isLocked: false,
                        hotspots: [
                            { pitch: 5, yaw: 0, text: 'NFPA Diamond Placard (Hazard ID)', type: 'info' },
                            { pitch: 25, yaw: 0, text: 'Ventilation Intake', type: 'info' },
                            { pitch: 0, yaw: 180, text: 'Locked Access Gate', type: 'info' }
                        ]
                    },
                    {
                        title: 'Maintenance Workshop',
                        description: 'Repair zone. Lockout/Tagout procedures apply to all machinery.',
                        type: '360',
                        content: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/extra/Tonemapped%20JPG/machine_shop_01.jpg',
                        isLocked: false,
                        hotspots: [
                            { pitch: 0, yaw: 0, text: 'Lockout/Tagout Station', type: 'info' },
                            { pitch: -5, yaw: 90, text: 'Grinder Guard', type: 'info' },
                            { pitch: -10, yaw: -90, text: 'Fire Extinguisher (Class B/C)', type: 'info' }
                        ]
                    },
                    {
                        title: 'Admin & Dispatch Office',
                        description: 'Coordination center. Emergency communication hub.',
                        type: '360',
                        content: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/extra/Tonemapped%20JPG/autoshop_01.jpg', // Reusing autoshop for now as it looks industrial enough
                        isLocked: false,
                        hotspots: [
                            { pitch: 0, yaw: 0, text: 'Radio Dispatch Desk', type: 'info' },
                            { pitch: -5, yaw: 180, text: 'Inventory Terminal', type: 'info' },
                            { pitch: 10, yaw: 90, text: 'Evacuation Map', type: 'info' }
                        ]
                    },
                    {
                        title: 'Waste Management Zone',
                        description: 'Disposal area. Separate balers for cardboard and plastic.',
                        type: '360',
                        content: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/extra/Tonemapped%20JPG/construction_yard.jpg', // "construction_yard" is correct
                        isLocked: false,
                        hotspots: [
                            { pitch: 0, yaw: 0, text: 'Cardboard Baler (Only Cardboard)', type: 'info' },
                            { pitch: -10, yaw: 90, text: 'Color-Coded Bins', type: 'info' },
                            { pitch: -5, yaw: 180, text: 'Biohazard Disposal', type: 'info' }
                        ]
                    },
                    {
                        title: 'Emergency Assembly Point',
                        description: 'Designated Muster Point for all staff during evacuations.',
                        type: '360',
                        content: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/extra/Tonemapped%20JPG/driving_school.jpg', // "driving_school" is correct
                        isLocked: false,
                        hotspots: [
                            { pitch: 0, yaw: 0, text: 'Muster Point Sign', type: 'info' },
                            { pitch: -5, yaw: 45, text: 'First Aid Kit (Mobile)', type: 'info' },
                            { pitch: 0, yaw: -45, text: 'Headcount Clipboard', type: 'info' }
                        ]
                    },

                    {
                        title: 'Final Certification Exam',
                        description: 'Comprehensive assessment covering all warehouse zones.',
                        type: 'quiz',
                        questions: [
                            { question: 'What must be scanned at the security checkpoint?', options: ['ID Badge', 'Drivers License', 'Lunch Box', 'None of the above'], correct: 0 },
                            { question: 'Where should visitors sign in?', options: ['Loading Dock', 'Visitor Logbook', 'Cafeteria', 'Security Guard Personal Notebook'], correct: 1 },
                            { question: 'What signage is mandatory at the entrance?', options: ['Welcome', 'No Smoking', 'PPE Required', 'Open Hours'], correct: 2 },
                            { question: 'What device prevents trucks from moving at the dock?', options: ['Wheel Chocks', 'Red Light', 'Yield Sign', 'Cone'], correct: 0 },
                            { question: 'Where are the overhead door controls located?', options: ['Outside', 'Next to the door', 'In the office', 'On the forklift'], correct: 1 },
                            { question: 'What is the first step in connecting a battery charger?', options: ['Turn it on', 'Check for water', 'Wear gloves & Connect properly', 'Call for help'], correct: 2 },
                            { question: 'Where is the Eye Wash Station typically found?', options: ['Restroom', 'Charging Station', 'Office', 'Loading Dock'], correct: 1 },
                            { question: 'What should be used for an acid spill?', options: ['Water Hose', 'Paper Towels', 'Acid Spill Kit', 'Broom'], correct: 2 },
                            { question: 'Where do you find rack weight limits?', options: ['On the floor', 'Rack Load Labels', 'Ask a manager', 'Guess'], correct: 1 },
                            { question: 'How can you see around blind spots in aisles?', options: ['Yell loudly', 'Use Aisle Mirrors', 'Walk fast', 'Honk horn only'], correct: 1 },
                            { question: 'What ensures pallets are stacked safely?', options: ['Stacking Limits', 'Unlimited height', 'Leaning them', 'Using tape'], correct: 0 },
                            { question: 'What button halts the conveyor belt immediately?', options: ['Pause', 'Slow Down', 'Emergency Stop', 'Off'], correct: 2 },
                            { question: 'What is used to track goods at packing stations?', options: ['Pen and Paper', 'Barcode Scanner', 'Camera', 'Memory'], correct: 1 },
                            { question: 'What reduces fatigue at standing stations?', options: ['Chair', 'Anti-Fatigue Mat', 'Music', 'Breaks only'], correct: 1 },
                            { question: 'What instrument monitors cold storage temp?', options: ['Thermometer', 'Temperature Gauge', 'Phone App', 'Hand feel'], correct: 1 },
                            { question: 'What helps retain cold air in freezers?', options: ['Wood Door', 'Thermal Curtain', 'Fan', 'Heater'], correct: 1 },
                            { question: 'What indicates a chemical hazard?', options: ['Smiley Face', 'NFPA Diamond', 'Red Circle', 'Blue Square'], correct: 1 },
                            { question: 'What prevents unauthorized access to HazMat?', options: ['Sign', 'Locked Gate', 'Curtain', 'Camera'], correct: 1 },
                            { question: 'What safety procedure isolates energy during repair?', options: ['Unplugging', 'Lockout/Tagout', 'Turning off switch', 'Tape'], correct: 1 },
                            { question: 'What protects you from grinder debris?', options: ['Sunglasses', 'Grinder Guard', 'Nothing', 'Hat'], correct: 1 },
                            { question: 'Which extinguisher is for general fires?', options: ['Class A', 'Class B/C', 'Water', 'Sand'], correct: 1 },
                            { question: 'What is used to coordinate emergency communication?', options: ['Yelling', 'Radio Dispatch', 'Whistle', 'Running'], correct: 1 },
                            { question: 'Where do you throw cardboard waste?', options: ['Trash Can', 'Cardboard Baler', 'Floor', 'River'], correct: 1 },
                            { question: 'Where do staff gather during an evacuation?', options: ['Cafeteria', 'Restroom', 'Muster Point / Assembly Area', 'Car'], correct: 2 },
                            { question: 'What is used to verify all staff are safe?', options: ['Phone Call', 'Headcount Clipboard', 'Guessing', 'Looking around'], correct: 1 }
                        ],
                        isLocked: true
                    }
                ]
            },
            {
                title: 'Safety Protocols 101',
                description: 'Essential safety guidelines for all staff. Covers fire safety, evacuation, and first aid basics.',
                thumbnail: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
                modules: [
                    {
                        title: 'Fire Safety Basics',
                        description: 'Understanding fire classes and extinguisher types.',
                        type: 'video',
                        content: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                        isLocked: false
                    },
                    {
                        title: 'Emergency Evacuation',
                        description: 'Procedures for safe and orderly evacuation.',
                        type: 'text',
                        content: 'Proceed to the nearest exit immediately upon hearing the alarm.',
                        isLocked: false
                    }
                ]
            },
               {
                title: 'Security Guard 101',
                description: 'Foundational training for security personnel. Access control, patrols, and incident reporting.',
                thumbnail: 'https://images.unsplash.com/photo-1555529733-0e670560f7e1?auto=format&fit=crop&w=800&q=80',
                modules: [
                    {
                        title: 'Access Control',
                        description: 'Verifying credentials and managing visitors.',
                        type: 'text',
                        content: 'All visitors must sign in at the front desk.',
                        isLocked: false
                    },
                    {
                        title: 'Patrol Strategies',
                        description: 'Effective perimeter and internal patrol techniques.',
                        type: '360',
                         content: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/extra/Tonemapped%20JPG/leadenhall_market_02.jpg',
                        isLocked: false,
                         hotspots: [
                            { pitch: 0, yaw: 0, text: 'Entry Point', type: 'info' }
                        ]
                    }
                ]
            }
        ];

        // Seed Courses - Upsert Logic
        // We delete the seeded courses first to ensure fresh content structure, but try to preserve other ID links if possible.
        // Actually, simplest is to finding by title and updating.
        
        const createdCourses = [];
        for (const courseData of courses) {
            // Delete existing version of this specific course to allow clean rewrite of modules (hard to sync nested arrays)
            await Course.deleteOne({ title: courseData.title });
            
            const newCourse = await Course.create(courseData);
            createdCourses.push(newCourse);
            console.log(`Course '${courseData.title}' updated/seeded.`);
        }
        // const createdCourses = await Course.insertMany(courses); // OLD
        console.log('Courses Content Updated!');

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
        for (const job of jobs) {
            const existingJob = await Job.findOne({ title: job.title, department: job.department });
            if (!existingJob) {
                await Job.create(job);
                console.log(`Job '${job.title}' created.`);
            } else {
                console.log(`Job '${job.title}' already exists.`);
            }
        }
        // await Job.insertMany(jobs);
        console.log('Jobs Sync Complete!');

        // Seed Certificates
        // Using the 'demo_user' created above
        const learner = createdUsers.find(u => u.username === 'demo_user');
        
        // Find 'Safety Protocols 101'
        // createdCourses now contains the updated/seeded courses (from local variable)
        // If course wasn't recreated (e.g. error), we might need to find it by title
        let safetyCourse = createdCourses.find(c => c.title === 'Safety Protocols 101');
        if (!safetyCourse) {
           safetyCourse = await Course.findOne({ title: 'Safety Protocols 101' });
        }

        if (learner && safetyCourse) {
             const existingCert = await Certificate.findOne({ user: learner._id, course: safetyCourse._id });
             if (!existingCert) {
                const certificates = [
                    {
                        user: learner._id,
                        course: safetyCourse._id,
                        code: 'JV-CERT-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
                        issueDate: new Date()
                    }
                ];
                await Certificate.insertMany(certificates);
                console.log('Certificates Seeded for Safety Protocols 101!');
             } else {
                 console.log('Certificate for Safety Protocols 101 already exists.');
             }
        }

        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

seedData();
