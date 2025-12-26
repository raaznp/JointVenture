import { useEffect } from 'react';
import { Package, Truck, Shield, Globe, Clock, Users, ArrowRight, ShoppingBag, Wrench, Heart, Cpu, Coffee, Car, Smartphone, BarChart } from 'lucide-react';

const Services = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Our Services | Joint Venture Logistics';
    }, []);

    const services = [
        { icon: Package, title: 'Warehousing', desc: 'Secure, climate-controlled storage solutions with real-time inventory tracking. Our facilities are designed to handle goods of all types, ensuring they remain in pristine condition.' },
        { icon: Truck, title: 'Distribution', desc: 'Efficient fleet management and route optimization for timely, cost-effective deliveries. We use advanced algorithms to plan the most efficient routes.' },
        { icon: Shield, title: 'Safety Training', desc: 'Industry-leading safety protocols and continuous staff education powered by Safe 360. We prioritize the well-being of our team and the security of your cargo.' },
        { icon: Globe, title: 'Freight Forwarding', desc: 'Seamless international shipping via air, sea, and land with customs expertise. We navigate complex regulations so you don\'t have to.' },
        { icon: Clock, title: 'Just-in-Time', desc: 'Precision delivery schedules to minimize inventory costs and maximize flow. Keep your production lines running without excess stock.' },
        { icon: Users, title: 'Consulting', desc: 'Expert analysis of your supply chain to identify improvements and savings. Our consultants bring decades of industry experience to the table.' },
    ];

    return (
        <div className="animate-fade-in">
            {/* Hero Banner */}
            <div className="bg-blue-900 py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img
                        src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                        alt="Services Background"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Services</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Comprehensive supply chain solutions tailored to your business needs.
                    </p>
                </div>
            </div>

            <div className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:-translate-y-1">
                                <div className="h-14 w-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                                    <service.icon className="h-7 w-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                                <p className="text-gray-600 leading-relaxed mb-6">{service.desc}</p>
                                <a href="#" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800">
                                    Learn more <ArrowRight className="ml-2 h-4 w-4" />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Industries We Serve */}
            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-3">Industries</h2>
                        <h3 className="text-4xl font-bold text-gray-900">Sectors We Power</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                        {[
                            { icon: ShoppingBag, name: 'Retail' },
                            { icon: Car, name: 'Automotive' },
                            { icon: Heart, name: 'Healthcare' },
                            { icon: Cpu, name: 'Technology' },
                            { icon: Coffee, name: 'Food & Bev' },
                            { icon: Wrench, name: 'Manufacturing' },
                        ].map((industry, index) => (
                            <div key={index} className="flex flex-col items-center p-6 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors group cursor-pointer">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                                    <industry.icon className="h-8 w-8 text-gray-600 group-hover:text-blue-600 transition-colors" />
                                </div>
                                <span className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{industry.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Technology Section */}
            <div className="py-24 bg-gray-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                        alt="Technology"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gray-900/90" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="lg:grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-blue-400 font-bold tracking-wide uppercase text-sm mb-3">Innovation</h2>
                            <h3 className="text-4xl font-bold mb-6">Powered by Advanced Technology</h3>
                            <p className="text-gray-300 text-lg leading-relaxed mb-8">
                                We leverage cutting-edge technology to provide you with complete visibility and control over your supply chain. From real-time tracking to predictive analytics, our digital solutions drive efficiency.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    'Real-time GPS Tracking & Telematics',
                                    'AI-Driven Route Optimization',
                                    'Cloud-Based Inventory Management',
                                    'Automated Warehousing Systems',
                                    'Blockchain for Secure Documentation'
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center text-gray-300">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="mt-12 lg:mt-0 bg-gray-800 p-8 rounded-2xl border border-gray-700 shadow-2xl">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <p className="text-sm text-gray-400">System Status</p>
                                    <p className="text-green-400 font-bold flex items-center"><span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" /> Operational</p>
                                </div>
                                <BarChart className="h-8 w-8 text-blue-500" />
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-300">On-Time Delivery Rate</span>
                                        <span className="text-white font-bold">99.8%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '99.8%' }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-300">Warehouse Capacity</span>
                                        <span className="text-white font-bold">85%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '85%' }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-gray-300">Fleet Utilization</span>
                                        <span className="text-white font-bold">94%</span>
                                    </div>
                                    <div className="w-full bg-gray-700 rounded-full h-2">
                                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: '94%' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-blue-600 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-4">Need a Custom Solution?</h2>
                    <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                        Our experts are ready to design a logistics strategy tailored to your specific business requirements.
                    </p>
                    <a href="/contact" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors shadow-lg">
                        Get a Free Consultation
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Services;
