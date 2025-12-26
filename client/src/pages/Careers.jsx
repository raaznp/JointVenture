import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Clock, ArrowRight, Users, Heart, Zap } from 'lucide-react';

const Careers = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Careers | Joint Venture Logistics';
    }, []);

    const jobs = [
        {
            id: 1,
            title: 'Senior Logistics Coordinator',
            department: 'Operations',
            location: 'New York, NY',
            type: 'Full-time',
            description: 'We are looking for an experienced Logistics Coordinator to oversee our daily supply chain operations and ensure timely deliveries.'
        },
        {
            id: 2,
            title: 'Warehouse Manager',
            department: 'Warehousing',
            location: 'Chicago, IL',
            type: 'Full-time',
            description: 'Lead our warehouse team in Chicago. Responsible for inventory management, safety compliance, and operational efficiency.'
        },
        {
            id: 3,
            title: 'Freight Forwarding Specialist',
            department: 'International',
            location: 'Los Angeles, CA',
            type: 'Full-time',
            description: 'Manage international shipments, handle customs documentation, and coordinate with global partners.'
        },
        {
            id: 4,
            title: 'Supply Chain Analyst',
            department: 'Analytics',
            location: 'Remote / Hybrid',
            type: 'Full-time',
            description: 'Analyze data to identify bottlenecks and opportunities for improvement in our global supply chain network.'
        },
        {
            id: 5,
            title: 'Customer Success Manager',
            department: 'Sales',
            location: 'Miami, FL',
            type: 'Full-time',
            description: 'Build and maintain relationships with our key enterprise clients, ensuring their logistics needs are met with excellence.'
        }
    ];

    return (
        <div className="animate-fade-in">
            {/* Hero Section */}
            <div className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-blue-900">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2084&q=80"
                        alt="Team meeting"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 to-blue-900/95" />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Join Our Journey</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
                        At Joint Venture, we're not just moving goods; we're moving the world forward. Build your career with a global leader in logistics innovation.
                    </p>
                </div>
            </div>

            {/* Culture Section */}
            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-3">Our Culture</h2>
                        <h3 className="text-4xl font-bold text-gray-900">Why Work With Us?</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                                <Users className="h-8 w-8" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3">Collaborative Team</h4>
                            <p className="text-gray-600">We believe in the power of teamwork. Our diverse workforce brings together unique perspectives to solve complex challenges.</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                                <Zap className="h-8 w-8" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3">Innovation First</h4>
                            <p className="text-gray-600">We embrace new technologies and ideas. You'll have the opportunity to work with cutting-edge logistics systems.</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                                <Heart className="h-8 w-8" />
                            </div>
                            <h4 className="text-xl font-bold text-gray-900 mb-3">Employee Wellbeing</h4>
                            <p className="text-gray-600">Your health and happiness matter. We offer competitive benefits, flexible work arrangements, and growth opportunities.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Open Positions */}
            <div className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-3">Open Positions</h2>
                        <h3 className="text-4xl font-bold text-gray-900">Find Your Next Role</h3>
                    </div>
                    <div className="space-y-6 max-w-4xl mx-auto">
                        {jobs.map((job) => (
                            <div key={job.id} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between items-start md:items-center">
                                <div className="mb-4 md:mb-0">
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h4>
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                                        <span className="flex items-center"><Briefcase className="h-4 w-4 mr-1" /> {job.department}</span>
                                        <span className="flex items-center"><MapPin className="h-4 w-4 mr-1" /> {job.location}</span>
                                        <span className="flex items-center"><Clock className="h-4 w-4 mr-1" /> {job.type}</span>
                                    </div>
                                    <p className="text-gray-600 max-w-xl">{job.description}</p>
                                </div>
                                <Link to={`/careers/apply/${job.id}`} className="flex-shrink-0 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center">
                                    Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Careers;
