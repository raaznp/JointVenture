import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';

const BLOG_POSTS = [
    {
        id: 1,
        title: "The Future of VR in Industrial Training",
        excerpt: "Virtual Reality is revolutionizing how we train employees in high-risk environments. Learn about the latest trends and safety improvements.",
        author: "Sarah Jenkins",
        date: "December 15, 2025",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Technology"
    },
    {
        id: 2,
        title: "Top 5 Safety Protocols for Warehouse Management",
        excerpt: "Ensuring safety in a busy warehouse is paramount. Here are the top 5 protocols every manager should implement immediately.",
        author: "Mike Ross",
        date: "December 10, 2025",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Safety"
    },
    {
        id: 3,
        title: "Sustainable Practices in Modern Logistics",
        excerpt: "Sustainability is no longer an option but a necessity. Explore how modern logistics companies are reducing their carbon footprint.",
        author: "Emily Chen",
        date: "November 28, 2025",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Sustainability"
    },
    {
        id: 4,
        title: "Navigating Global Supply Chain Challenges",
        excerpt: "Global supply chains are more complex than ever. Insights into navigating the current geopolitical and economic landscape.",
        author: "David Kim",
        date: "November 15, 2025",
        image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Supply Chain"
    },
    {
        id: 5,
        title: "Employee Wellness: Beyond the Paycheck",
        excerpt: "Attracting and retaining talent requires more than good pay. It requires a holistic approach to employee wellness and satisfaction.",
        author: "Lisa Patel",
        date: "November 05, 2025",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "HR"
    },
     {
        id: 6,
        title: "AI and Robotics: Partners, Not Replacements",
        excerpt: "There is a fear that AI will replace human workers. We believe in a future where AI and humans work side-by-side for greater efficiency.",
        author: "Robert Stone",
        date: "October 22, 2025",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "Technology"
    }
];

const Blog = () => {
    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Hero Section */}
            <div className="relative bg-blue-900 text-white py-24">
                <div className="absolute inset-0 overflow-hidden">
                    <img
                        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
                        alt="Blog Hero"
                        className="w-full h-full object-cover opacity-20"
                    />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                        Latest Insights & News
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Stay updated with the latest trends in logistics, safety, and technology from our expert team.
                    </p>
                </div>
            </div>

            {/* Blog Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {BLOG_POSTS.map((post) => (
                        <div key={post.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group flex flex-col h-full transform hover:-translate-y-1">
                            <div className="relative">
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                                    {post.category}
                                </div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                                    <span className="flex items-center">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        {post.date}
                                    </span>
                                    <span className="flex items-center">
                                        <User className="h-4 w-4 mr-1" />
                                        {post.author}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                                    <Link to={`/blog/${post.id}`}>
                                        {post.title}
                                    </Link>
                                </h3>
                                <p className="text-gray-600 mb-6 flex-1 line-clamp-3">
                                    {post.excerpt}
                                </p>
                                <Link
                                    to={`/blog/${post.id}`}
                                    className="inline-flex items-center font-bold text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                    Read Article <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
