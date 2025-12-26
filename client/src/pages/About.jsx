import { useEffect } from 'react';
import { Award, Globe, Users, Zap, Heart } from 'lucide-react';

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'About Us | Joint Venture Logistics';
    }, []);

    return (
        <div className="animate-fade-in">
            {/* Hero Banner */}
            <div className="bg-blue-900 py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img
                        src="https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1035&q=80"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Joint Venture</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Building the future of global supply chains with precision, integrity, and innovation.
                    </p>
                </div>
            </div>

            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-center">
                        <div className="relative">
                            <div className="absolute -top-4 -left-4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
                            <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-cyan-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
                            <img
                                src="https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1035&q=80"
                                alt="Logistics Team"
                                className="relative rounded-2xl shadow-2xl z-10"
                            />
                            <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-xl shadow-xl z-20 hidden md:block border-l-4 border-blue-600">
                                <div className="flex items-center space-x-4">
                                    <Award className="h-12 w-12 text-blue-600" />
                                    <div>
                                        <p className="text-sm text-gray-500 uppercase tracking-wide">Award Winning</p>
                                        <p className="text-xl font-bold text-gray-900">Top Logistics Provider 2024</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-16 lg:mt-0">
                            <h2 className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-3">Our Story</h2>
                            <h3 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">Setting the Standard in <br />Global Logistics</h3>
                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                At Joint Venture, we believe that a strong supply chain is the backbone of any successful business. With state-of-the-art facilities and a dedicated team, we ensure your products are handled with the utmost care and precision.
                            </p>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                Our commitment to safety is unwavering. We partner with industry leaders like Safe 360 to provide comprehensive training and ensure a secure environment for our workforce and your assets.
                            </p>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
                                            <Globe className="h-6 w-6" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium text-gray-900">Global Reach</h4>
                                        <p className="mt-2 text-base text-gray-500">Connecting markets across continents.</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
                                            <Users className="h-6 w-6" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium text-gray-900">Expert Team</h4>
                                        <p className="mt-2 text-base text-gray-500">Dedicated professionals at your service.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mission & Vision */}
            <div className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-3">Our Purpose</h2>
                        <h3 className="text-4xl font-bold text-gray-900">Mission & Vision</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="bg-white p-10 rounded-2xl shadow-sm border-t-4 border-blue-600">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 text-blue-600">
                                <Globe className="h-8 w-8" />
                            </div>
                            <h4 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h4>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                To empower businesses globally by providing seamless, reliable, and innovative logistics solutions. We strive to bridge the gap between markets, ensuring that goods move efficiently and safely across borders.
                            </p>
                        </div>
                        <div className="bg-white p-10 rounded-2xl shadow-sm border-t-4 border-cyan-500">
                            <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-6 text-cyan-600">
                                <Award className="h-8 w-8" />
                            </div>
                            <h4 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h4>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                To be the world's most trusted partner in supply chain management, recognized for our commitment to sustainability, technological advancement, and customer-centric excellence.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Core Values */}
            <div className="py-24 bg-blue-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pattern-grid-lg" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-blue-300 font-bold tracking-wide uppercase text-sm mb-3">Our DNA</h2>
                        <h3 className="text-4xl font-bold">Core Values</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Award, title: 'Integrity', desc: 'We conduct our business with the highest standards of honesty and transparency.' },
                            { icon: Zap, title: 'Innovation', desc: 'We constantly seek new ways to improve efficiency and add value to our clients.' },
                            { icon: Heart, title: 'Customer First', desc: 'Your success is our priority. We go above and beyond to meet your needs.' },
                            { icon: Users, title: 'Collaboration', desc: 'We believe in the power of partnership and teamwork to achieve great results.' },
                            { icon: Globe, title: 'Sustainability', desc: 'We are committed to reducing our environmental impact and promoting green logistics.' },
                            { icon: Award, title: 'Excellence', desc: 'We strive for perfection in every shipment, every interaction, every time.' },
                        ].map((value, index) => (
                            <div key={index} className="bg-blue-800/50 backdrop-blur-sm p-8 rounded-xl border border-blue-700 hover:bg-blue-800 transition-colors">
                                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                                    <value.icon className="h-6 w-6 text-white" />
                                </div>
                                <h4 className="text-xl font-bold mb-3">{value.title}</h4>
                                <p className="text-blue-100">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* History Timeline */}
            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-3">Our Journey</h2>
                        <h3 className="text-4xl font-bold text-gray-900">Milestones</h3>
                    </div>
                    <div className="relative">
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 hidden md:block" />
                        <div className="space-y-12">
                            {[
                                { year: '1999', title: 'Founded', desc: 'Joint Venture Logistics was established in New York with a single warehouse.' },
                                { year: '2005', title: 'Global Expansion', desc: 'Opened our first international office in London, marking the start of our global network.' },
                                { year: '2012', title: 'Tech Integration', desc: 'Launched our proprietary tracking system, revolutionizing real-time visibility for clients.' },
                                { year: '2018', title: 'Sustainability Initiative', desc: 'Committed to a 50% reduction in carbon emissions by 2030.' },
                                { year: '2024', title: 'Industry Leader', desc: 'Recognized as a Top Logistics Provider with over 50 locations worldwide.' },
                            ].map((item, index) => (
                                <div key={index} className={`flex flex-col md:flex-row items-center justify-between ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                    <div className="w-full md:w-5/12" />
                                    <div className="z-10 flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full border-4 border-white shadow-lg mb-4 md:mb-0">
                                        <Award className="h-5 w-5 text-white" />
                                    </div>
                                    <div className="w-full md:w-5/12 bg-gray-50 p-6 rounded-xl shadow-sm border border-gray-100 text-center md:text-left">
                                        <span className="text-blue-600 font-bold text-xl block mb-2">{item.year}</span>
                                        <h4 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h4>
                                        <p className="text-gray-600">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Leadership Team */}
            <div className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-3">Leadership</h2>
                        <h3 className="text-4xl font-bold text-gray-900">Meet Our Team</h3>
                    </div>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { name: 'James Carter', role: 'CEO & Founder', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                            { name: 'Elena Rodriguez', role: 'Chief Operations Officer', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                            { name: 'David Kim', role: 'Head of Technology', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                            { name: 'Sarah Jenkins', role: 'VP of Global Sales', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
                        ].map((leader, index) => (
                            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                                <img src={leader.img} alt={leader.name} className="w-full h-64 object-cover" />
                                <div className="p-6 text-center">
                                    <h4 className="text-xl font-bold text-gray-900 mb-1">{leader.name}</h4>
                                    <p className="text-blue-600 font-medium text-sm">{leader.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
