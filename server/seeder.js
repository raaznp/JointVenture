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

        const courses = [
            {
                title: 'Warehouse Equipment Familiarisation',
                description: 'Learn about the various equipment used in a modern warehouse.',
                thumbnail: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80', // Warehouse Shelves
                modules: [
                    {
                        title: 'Forklift Safety',
                        description: 'Introduction to Forklift safety and operation.',
                        type: '360',
                        content: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/extra/Tonemapped%20JPG/empty_warehouse_01.jpg', // Real Warehouse 360
                        isLocked: false,
                        hotspots: [
                            { pitch: -5, yaw: 180, text: 'Main Aisle', type: 'info' },
                            { pitch: 10, yaw: 0, text: 'Roof Structure', type: 'info' },
                            { pitch: -15, yaw: 90, text: 'Loading Bay Area', type: 'warning' }
                        ]
                    },
                    {
                        title: 'Pallet Jack Basics',
                        description: 'How to operate a manual pallet jack.',
                        type: 'text',
                        content: 'https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&w=800&q=80', // Warehouse/Pallet context
                        isLocked: false
                    },
                    {
                        title: 'Hand Truck (Dolly)',
                        description: 'Moving boxes and small items efficiently.',
                        type: 'text',
                        content: 'https://plus.unsplash.com/premium_photo-1661963212517-830bbb7d76fc?auto=format&fit=crop&w=800&q=80', // Logistics/Boxes
                        isLocked: false
                    },
                    {
                        title: 'Industrial Shelving (Racking)',
                        description: 'Understanding storage systems.',
                        type: 'text',
                        content: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80', // Warehouse Racking
                        isLocked: false
                    },
                    {
                        title: 'Barcode Scanner',
                        description: 'Tracking inventory accurately.',
                        type: 'text',
                        content: 'https://images.unsplash.com/photo-1556740758-90de2929450a?auto=format&fit=crop&w=800&q=80', // Scanner context
                        isLocked: false
                    },
                    {
                        title: 'Conveyor Belt',
                        description: 'Automated material handling.',
                        type: 'text',
                        content: 'https://images.unsplash.com/photo-1530631673369-804ddd51971d?auto=format&fit=crop&w=800&q=80', // Conveyor
                        isLocked: false
                    },
                    {
                        title: 'Safety Vest (PPE)',
                        description: 'Personal Protective Equipment essentials.',
                        type: 'text',
                        content: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80', // Worker in Vest
                        isLocked: false
                    },
                    {
                        title: 'Final Exam Quiz',
                        description: 'Test your knowledge on warehouse equipment safety.',
                        type: 'quiz', // New type
                        content: 'quiz', // Placeholder content type
                        isLocked: false,
                        questions: [
                            {
                                question: 'What is the most important safety rule when operating a forklift?',
                                options: ['Drive fast', 'Wear a seatbelt and sound horn', 'Carry passengers', 'Listen to music'],
                                correct: 1
                            },
                            {
                                question: 'Which PPE is essential for visibility?',
                                options: ['Gloves', 'Safety Boots', 'High-Vis Vest', 'Hard Hat'],
                                correct: 2
                            },
                            {
                                question: 'What should you do before lifting a heavy object?',
                                options: ['Bend your back', 'Assess the weight and keep back straight', 'Lift quickly', 'Ask for no help'],
                                correct: 1
                            },
                            {
                                question: 'What is the purpose of a Lockout/Tagout (LOTO) procedure?',
                                options: ['To lock doors', 'To prevent accidental machine startup during maintenance', 'To tag inventory', 'To lock the breakroom'],
                                correct: 1
                            },
                            {
                                question: 'Where should you store flammable materials?',
                                options: ['Near the exit', 'In authorized safety cabinets', 'Under your desk', 'Next to the heater'],
                                correct: 1
                            },
                            {
                                question: 'What does the acronym PASS stand for in fire extinguisher use?',
                                options: ['Pull, Aim, Squeeze, Sweep', 'Push, Aim, Shake, Spray', 'Pull, Ask, Shout, Sprint', 'Put, Away, Safe, Sound'],
                                correct: 0
                            },
                            {
                                question: 'How high should you stack pallets?',
                                options: ['As high as possible', 'Till they wobble', 'According to maximum height regulations', 'Until the roof'],
                                correct: 2
                            },
                            {
                                question: 'What should you do if you spill a chemical?',
                                options: ['Walk away', 'Cover it with cardboard', 'Follow the SDS and clean up procedures', 'Wash it with water immediately'],
                                correct: 2
                            },
                            {
                                question: 'When is hearing protection required?',
                                options: ['When listening to music', 'In designated high-noise areas', 'During lunch', 'Only on Fridays'],
                                correct: 1
                            },
                            {
                                question: 'What is the primary cause of trips and falls in a warehouse?',
                                options: ['Ghosts', 'Cluttered aisles and wet floors', 'Running too fast', 'Bright lights'],
                                correct: 1
                            },
                            {
                                question: 'Who is authorized to operate heavy machinery?',
                                options: ['Anyone', 'Certified and trained personnel', 'Managers only', 'Interns'],
                                correct: 1
                            },
                            {
                                question: 'What is the safe speed limit in most warehouse aisles?',
                                options: ['20 mph', 'Walking speed / 5 mph', '10 mph', 'As fast as you can'],
                                correct: 1
                            },
                            {
                                question: 'Why should you check the load capacity of a rack?',
                                options: ['To see if it fits', 'To prevent collapse and injury', 'To calculate costs', 'No need to check'],
                                correct: 1
                            },
                            {
                                question: 'What should you do if you see a damaged rack leg?',
                                options: ['Ignore it', 'Paint over it', 'Report it immediately and unload if necessary', 'Kick it back in place'],
                                correct: 2
                            },
                            {
                                question: 'Which class of fire extinguisher is for electrical fires?',
                                options: ['Class A', 'Class B', 'Class C', 'Class D'],
                                correct: 2
                            },
                            {
                                question: 'What is the first step in first aid for a minor cut?',
                                options: ['Apply a tourniquet', 'Clean the wound', 'Call 911', 'Ignore it'],
                                correct: 1
                            },
                            {
                                question: 'How often should safety inspections be conducted?',
                                options: ['Once a year', 'Never', 'Regularly/Daily', 'When accidents happen'],
                                correct: 2
                            },
                            {
                                question: 'What is a "blind spot" involving a forklift?',
                                options: ['A spot on the floor', 'Area where the driver cannot see', 'A broken light', 'A dark room'],
                                correct: 1
                            },
                            {
                                question: 'Why are dock plates used?',
                                options: ['For decoration', 'To bridge the gap between truck and dock', 'To stop the truck', 'To weigh cargo'],
                                correct: 1
                            },
                            {
                                question: 'What is proper hydration practice?',
                                options: ['Drink soda only', 'Drink water frequently throughout the day', 'Drink only at lunch', 'Don\'t drink'],
                                correct: 1
                            },
                            {
                                question: 'What should you do in case of a fire alarm?',
                                options: ['Keep working', 'Evacuate to the designated assembly point', 'Hide in the bathroom', 'Run around'],
                                correct: 1
                            },
                            {
                                question: 'What is the best way to prevent back injury?',
                                options: ['Use lifting equipment or team lifts', 'Lift with your back', 'Twist while lifting', 'Lift quickly'],
                                correct: 0
                            },
                            {
                                question: 'What does SDS stand for?',
                                options: ['Safety Data Sheet', 'Safe Driving Standard', 'System Data Storage', 'Staff Daily Schedule'],
                                correct: 0
                            },
                            {
                                question: 'When should you replace your safety shoes?',
                                options: ['Every week', 'When they are damaged or worn out', 'Every 5 years', 'Never'],
                                correct: 1
                            },
                            {
                                question: 'What is the "Three Points of Contact" rule for?',
                                options: ['Socializing', 'Climbing ladders or mounting equipment', 'Stacking boxes', 'Using a phone'],
                                correct: 1
                            }
                        ]
                    }
                ]
            },
            {
                title: 'Inventory Management',
                description: 'Master the art of inventory control.',
                thumbnail: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80', // Inventory
                modules: [], // Coming Soon
            },
            {
                title: 'Safety Protocols',
                description: 'Essential safety protocols for warehouse staff.',
                thumbnail: 'https://images.unsplash.com/photo-1625232789852-c3222238426e?auto=format&fit=crop&w=800&q=80', // Safety
                modules: [], // Coming Soon
            }
        ];

        await Course.insertMany(courses);
        console.log('Courses Seeded!');

        // Seed Jobs
        const jobs = [
            {
                title: 'Senior Logistics Coordinator',
                department: 'Operations',
                location: 'New York, NY',
                type: 'Full-time',
                description: 'We are looking for an experienced Logistics Coordinator to oversee our daily supply chain operations and ensure timely deliveries.'
            },
            {
                title: 'Warehouse Manager',
                department: 'Warehousing',
                location: 'Chicago, IL',
                type: 'Full-time',
                description: 'Lead our warehouse team in Chicago. Responsible for inventory management, safety compliance, and operational efficiency.'
            },
            {
                title: 'Freight Forwarding Specialist',
                department: 'International',
                location: 'Los Angeles, CA',
                type: 'Full-time',
                description: 'Manage international shipments, handle customs documentation, and coordinate with global partners.'
            },
            {
                title: 'Supply Chain Analyst',
                department: 'Analytics',
                location: 'Remote / Hybrid',
                type: 'Full-time',
                description: 'Analyze data to identify bottlenecks and opportunities for improvement in our global supply chain network.'
            },
            {
                title: 'Customer Success Manager',
                department: 'Sales',
                location: 'Miami, FL',
                type: 'Full-time',
                description: 'Build and maintain relationships with our key enterprise clients, ensuring their logistics needs are met with excellence.'
            }
        ];
        await Job.insertMany(jobs);
        console.log('Jobs Seeded!');

        // Seed Blogs
        const blogs = [
            {
                title: "The Future of VR in Industrial Training",
                excerpt: "Virtual Reality is revolutionizing how we train employees in high-risk environments. Learn about the latest trends and safety improvements.",
                author: "Sarah Jenkins",
                date: "December 15, 2025",
                image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                category: "Technology",
                content: `
            <p class="mb-6 text-lg leading-relaxed text-gray-700">
                Virtual Reality (VR) is no longer just for gaming. It is rapidly transforming how industries train their workforce, especially in high-risk environments like construction, manufacturing, and logistics. The ability to simulate dangerous scenarios without real-world consequences is a game-changer for safety training.
            </p>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Why VR Training?</h2>
            <p class="mb-6 text-lg leading-relaxed text-gray-700">
                Traditional training methods often rely on manuals, videos, or classroom lectures. While effective to a degree, they lack the immersive experience that truly prepares a worker for the field. VR bridges this gap by providing realistic simulations.
            </p>
            <ul class="list-disc pl-6 mb-6 text-lg text-gray-700 space-y-2">
                <li><strong>Risk-Free Learning:</strong> Trainees can practice handling hazardous materials or operating heavy machinery without any physical risk.</li>
                <li><strong>Retain More Information:</strong> Studies show that learning through doing (experiential learning) leads to higher retention rates compared to passive learning.</li>
                <li><strong>Cost-Effective:</strong> While the initial investment might be higher, VR reduces the need for physical equipment, travel, and downtime associated with traditional training.</li>
            </ul>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">The Impact on Safety</h2>
            <p class="mb-6 text-lg leading-relaxed text-gray-700">
                At Joint Venture, we've seen a measurable decrease in workplace accidents since implementing VR modules for our new hires. By allowing them to experience "near-misses" in a virtual world, they are more alert and prepared when they step onto the actual warehouse floor.
            </p>
            <blockquote class="border-l-4 border-blue-600 pl-4 italic text-xl text-gray-600 mb-6">
                "VR training has revolutionized our safety onboarding process. It's engaging, effective, and most importantly, it saves lives."
            </blockquote>
            <p class="mb-6 text-lg leading-relaxed text-gray-700">
                As technology continues to evolve, we expect VR hardware to become lighter, more affordable, and even more realistic. The future of industrial training is virtually limitless.
            </p>
        `
            },
            {
                title: "Top 5 Safety Protocols for Warehouse Management",
                excerpt: "Ensuring safety in a busy warehouse is paramount. Here are the top 5 protocols every manager should implement immediately.",
                author: "Mike Ross",
                date: "December 10, 2025",
                image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                category: "Safety",
                content: "<p>Sample content for Safety Protocols...</p>"
            },
            {
                title: "Sustainable Practices in Modern Logistics",
                excerpt: "Sustainability is no longer an option but a necessity. Explore how modern logistics companies are reducing their carbon footprint.",
                author: "Emily Chen",
                date: "November 28, 2025",
                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                category: "Sustainability",
                 content: "<p>Sample content for Sustainability...</p>"
            },
            {
                title: "Navigating Global Supply Chain Challenges",
                excerpt: "Global supply chains are more complex than ever. Insights into navigating the current geopolitical and economic landscape.",
                author: "David Kim",
                date: "November 15, 2025",
                image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                category: "Supply Chain",
                 content: "<p>Sample content for Supply Chain...</p>"
            },
            {
                title: "Employee Wellness: Beyond the Paycheck",
                excerpt: "Attracting and retaining talent requires more than good pay. It requires a holistic approach to employee wellness and satisfaction.",
                author: "Lisa Patel",
                date: "November 05, 2025",
                image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                category: "HR",
                 content: "<p>Sample content for Employee Wellness...</p>"
            },
             {
                title: "AI and Robotics: Partners, Not Replacements",
                excerpt: "There is a fear that AI will replace human workers. We believe in a future where AI and humans work side-by-side for greater efficiency.",
                author: "Robert Stone",
                date: "October 22, 2025",
                image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                category: "Technology",
                 content: "<p>Sample content for AI and Robotics...</p>"
            }
        ];
        await Blog.insertMany(blogs);
        console.log('Blogs Seeded!');

        const users = [
            {
                name: 'Demo Admin',
                email: 'admin@example.com',
                password: '123456', // Plain text, handled by pre-save hook
                role: 'admin'
            },
            {
                name: 'Demo User',
                email: 'user@example.com',
                password: '123456', // Plain text, handled by pre-save hook
                role: 'user'
            },
            {
                name: 'John Smith',
                email: 'john@example.com',
                password: '123456',
                role: 'user'
            },
            {
                name: 'Sarah Wilson',
                email: 'sarah@example.com',
                password: '123456',
                role: 'user'
            },
            {
                name: 'Michael Brown',
                email: 'michael@example.com',
                password: '123456',
                role: 'user'
            },
            {
                name: 'Emily Davis',
                email: 'emily@example.com',
                password: '123456',
                role: 'user'
            },
            {
                name: 'David Lee',
                email: 'david@example.com',
                password: '123456',
                role: 'user'
            }
        ];

        // Use create instead of insertMany to trigger save middleware (password hashing)
        const createdUsers = [];
        for (const user of users) {
             const createdUser = await User.create(user);
             createdUsers.push(createdUser);
        }
        console.log('Users Seeded!');

        // Seed Certificates
        const normalUser = createdUsers.find(u => u.role === 'user');
        const demoCourse = await Course.findOne({ title: 'Warehouse Equipment Familiarisation' });

        if (normalUser && demoCourse) {
            const certificates = [
                {
                    user: normalUser._id,
                    course: demoCourse._id,
                    code: 'JV-CERT-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
                    issueDate: new Date('2025-11-15')
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
