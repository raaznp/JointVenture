import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Clock, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';

const BLOG_CONTENT = {
    1: {
        title: "The Future of VR in Industrial Training",
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
    // Adding a default fallback for other IDs for the demo
    "default": {
        title: "Sample Blog Post Title",
        author: "Joint Venture Team",
        date: "December 20, 2025",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        category: "General",
        content: `
            <p class="mb-6 text-lg leading-relaxed text-gray-700">
                This is a sample blog post content to demonstrate the layout of the Blog Details page. In a real application, this content would be fetched from a backend API based on the blog post ID.
            </p>
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Section Heading</h2>
            <p class="mb-6 text-lg leading-relaxed text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p class="mb-6 text-lg leading-relaxed text-gray-700">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        `
    }
};

const BlogDetails = () => {
    const { id } = useParams();
    const post = BLOG_CONTENT[id] || BLOG_CONTENT["default"];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white min-h-screen pb-20">
            {/* Header Image */}
            <div className="relative h-[60vh] w-full">
                <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white max-w-7xl mx-auto">
                    <Link to="/blog" className="inline-flex items-center text-blue-300 hover:text-white mb-6 uppercase tracking-wider font-bold text-sm transition-colors">
                        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog
                    </Link>
                    <div className="flex items-center space-x-4 mb-4 text-sm md:text-base">
                        <span className="bg-blue-600 px-3 py-1 rounded-full font-bold">{post.category}</span>
                        <span className="flex items-center"><Calendar className="h-4 w-4 mr-1" /> {post.date}</span>
                        <span className="flex items-center"><Clock className="h-4 w-4 mr-1" /> 5 min read</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-extrabold leading-tight shadow-sm">
                        {post.title}
                    </h1>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
                <div className="bg-white rounded-t-3xl p-8 md:p-12 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-8 mb-8">
                        <div className="flex items-center space-x-4">
                            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                <User className="h-6 w-6 text-gray-500" />
                            </div>
                            <div>
                                <p className="text-gray-900 font-bold">{post.author}</p>
                                <p className="text-gray-500 text-sm">Author</p>
                            </div>
                        </div>
                        <div className="flex space-x-4 text-gray-400">
                            <button className="hover:text-blue-600 transition-colors"><Facebook className="h-5 w-5" /></button>
                            <button className="hover:text-blue-400 transition-colors"><Twitter className="h-5 w-5" /></button>
                            <button className="hover:text-blue-700 transition-colors"><Linkedin className="h-5 w-5" /></button>
                            <button className="hover:text-gray-600 transition-colors"><Share2 className="h-5 w-5" /></button>
                        </div>
                    </div>

                    {/* Content */}
                    <div 
                        className="prose prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 prose-a:text-blue-600"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>
            </div>
            
            {/* Related/Nav Area (Placeholder) */}
            <div className="max-w-4xl mx-auto px-4 mt-12 text-center">
                 <Link to="/blog" className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 transition-colors">
                    <ArrowLeft className="mr-2 h-5 w-5" /> View All Articles
                 </Link>
            </div>
        </div>
    );
};

export default BlogDetails;
