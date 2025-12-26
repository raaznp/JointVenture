import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowRight, Shield, ChevronDown, Star, HelpCircle, Globe, Clock, Award, Zap, Quote, Leaf, Mail, CheckCircle
} from 'lucide-react';

const Home = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Home | Joint Venture Logistics';
    }, []);

    return (
        <div className="animate-fade-in">
            {/* Hero Section */}
            <div id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                        alt="Warehouse"
                        className="w-full h-full object-cover scale-105 animate-slow-zoom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/80 to-blue-900/40" />
                </div>
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="max-w-4xl animate-fade-in-up">
                        <div className="inline-flex items-center px-4 py-2 mb-8 border border-blue-400/30 rounded-full bg-blue-900/40 backdrop-blur-md shadow-lg">
                            <span className="w-2 h-2 bg-blue-400 rounded-full mr-3 animate-pulse"></span>
                            <span className="text-blue-100 text-sm font-semibold tracking-wide uppercase">Global Logistics Partner</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 leading-tight tracking-tight">
                            Moving the World, <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-200 animate-gradient-x">One Shipment at a Time</span>
                        </h1>
                        <p className="text-xl text-gray-200 mb-10 max-w-2xl leading-relaxed font-light">
                            Joint Venture delivers precision supply chain solutions. We combine cutting-edge technology with decades of expertise to ensure your business never stops moving.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5">
                            <Link to="/contact" className="bg-blue-600 text-white px-10 py-4 rounded-full hover:bg-blue-700 transition-all transform hover:-translate-y-1 shadow-lg shadow-blue-600/30 font-bold text-lg text-center flex items-center justify-center">
                                Get a Quote
                            </Link>
                            <Link to="/services" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-full hover:bg-white/20 transition-all font-bold text-lg text-center flex items-center justify-center group">
                                Explore Services <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50">
                    <ChevronDown className="h-10 w-10" />
                </div>
            </div>

            {/* Trusted Partners Section */}
            <div className="py-12 bg-white border-b border-gray-100 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-sm font-bold uppercase text-gray-400 tracking-widest mb-8">Trusted by Industry Leaders</p>
                    <div className="flex justify-center gap-12 md:gap-24 opacity-80 grayscale-0 hover:grayscale hover:opacity-50 transition-all duration-500">
                        {['Global Tech', 'FastMove Inc.', 'EcoSupply', 'BuildRight', 'FoodChain'].map((partner) => (
                            <div key={partner} className="text-2xl font-black text-blue-500 flex items-center hover:text-gray-400 transition-colors cursor-default">
                                <Shield className="h-8 w-8 mr-3" /> {partner}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-blue-900 py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pattern-grid-lg text-white" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { number: '25+', label: 'Years Experience', icon: Clock },
                            { number: '1M+', label: 'Packages Delivered', icon: Globe },
                            { number: '50+', label: 'Global Warehouses', icon: Shield },
                            { number: '100%', label: 'Safety Record', icon: Award },
                        ].map((stat, index) => (
                            <div key={index} className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
                                <stat.icon className="h-8 w-8 text-blue-300 mx-auto mb-4" />
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                                <div className="text-blue-200 font-medium uppercase tracking-wider text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-3">Our Advantage</h2>
                        <h3 className="text-4xl font-bold text-gray-900">Why Choose Joint Venture?</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { title: 'Global Network', desc: 'Access to over 50 warehouses and distribution centers worldwide.', icon: Globe },
                            { title: 'Real-Time Tracking', desc: 'Monitor your shipments 24/7 with our advanced GPS and IoT technology.', icon: Clock },
                            { title: 'Secure Handling', desc: 'Industry-leading security protocols to ensure your cargo arrives safely.', icon: Shield },
                            { title: 'Cost Efficiency', desc: 'Optimized routes and consolidated shipping to reduce your logistics costs.', icon: Award },
                            { title: 'Expert Support', desc: 'Dedicated account managers available to assist you at every step.', icon: Zap },
                            { title: 'Scalable Solutions', desc: 'Flexible services that grow with your business needs.', icon: Star },
                        ].map((feature, index) => (
                            <div key={index} className="flex flex-col items-start p-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6 text-blue-600">
                                    <feature.icon className="h-6 w-6" />
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
                                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sustainability Section */}
            <div className="py-24 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="lg:grid lg:grid-cols-2 gap-16 items-center">
                        <div className="mb-12 lg:mb-0">
                            <div className="inline-flex items-center px-4 py-2 mb-6 border border-green-200 rounded-full bg-green-50">
                                <Leaf className="h-4 w-4 text-green-600 mr-2" />
                                <span className="text-green-700 text-sm font-bold uppercase tracking-wide">Sustainability Commitment</span>
                            </div>
                            <h3 className="text-4xl font-bold text-gray-900 mb-6">Green Logistics for a Better Future</h3>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                We are dedicated to reducing our environmental impact. From electric delivery fleets to solar-powered warehouses, we are paving the way for sustainable supply chains.
                            </p>
                            <ul className="space-y-4 mb-8">
                                {[
                                    'Carbon-neutral shipping options',
                                    'Electric vehicle fleet integration',
                                    'Paperless digital documentation',
                                    'Eco-friendly packaging materials'
                                ].map((item, index) => (
                                    <li key={index} className="flex items-center text-gray-700">
                                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Link to="/about" className="text-green-600 font-bold hover:text-green-700 inline-flex items-center">
                                Learn about our green initiatives <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-4 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
                            <img
                                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=2013&q=80"
                                alt="Green Logistics"
                                className="relative rounded-2xl shadow-2xl z-10"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Process Section */}
            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-3">How It Works</h2>
                        <h3 className="text-4xl font-bold text-gray-900">Streamlined Logistics Process</h3>
                    </div>
                    <div className="relative">
                        {/* Connection Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>

                        <div className="grid md:grid-cols-4 gap-8 relative z-10">
                            {[
                                { step: '01', title: 'Consultation', desc: 'We analyze your supply chain needs.' },
                                { step: '02', title: 'Strategy', desc: 'Custom logistics plan development.' },
                                { step: '03', title: 'Execution', desc: 'Seamless implementation of services.' },
                                { step: '04', title: 'Delivery', desc: 'On-time, safe delivery of goods.' },
                            ].map((item, index) => (
                                <div key={index} className="bg-white p-6 rounded-xl border border-gray-100 shadow-lg text-center">
                                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-md">
                                        {item.step}
                                    </div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h4>
                                    <p className="text-gray-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="py-24 bg-gray-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img src="https://images.unsplash.com/photo-1494412574643-35d324698420?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" alt="Background" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gray-900/95" />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-blue-400 font-bold tracking-wide uppercase text-sm mb-3">Testimonials</h2>
                        <h3 className="text-4xl font-bold text-white">What Our Clients Say</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { name: 'Sarah Johnson', role: 'Supply Chain Director, TechCorp', quote: 'Joint Venture transformed our logistics. Their real-time tracking and dedicated support are unmatched.' },
                            { name: 'Michael Chen', role: 'Operations Manager, BuildRight', quote: 'Reliability is key in our industry, and Joint Venture delivers every single time. Highly recommended.' },
                            { name: 'Emily Davis', role: 'CEO, EcoGoods', quote: 'Their commitment to sustainability and efficiency aligns perfectly with our values. A true partnership.' },
                        ].map((testimonial, index) => (
                            <div key={index} className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700 relative group hover:-translate-y-2 transition-transform duration-300">
                                <Quote className="absolute top-6 right-6 h-10 w-10 text-gray-700 group-hover:text-blue-500 transition-colors opacity-50" />
                                <div className="flex text-yellow-400 mb-6">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
                                </div>
                                <p className="text-gray-300 mb-8 italic leading-relaxed">"{testimonial.quote}"</p>
                                <div className="flex items-center">
                                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                        {testimonial.name.charAt(0)}
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-base font-bold text-white">{testimonial.name}</p>
                                        <p className="text-sm text-gray-400">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-3">FAQ</h2>
                        <h3 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h3>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { q: 'Do you offer international shipping?', a: 'Yes, we provide comprehensive freight forwarding services via air, sea, and land to over 100 countries.' },
                            { q: 'How can I track my shipment?', a: 'We offer a real-time tracking portal where you can monitor your shipment\'s status 24/7 using your tracking number.' },
                            { q: 'What industries do you serve?', a: 'We serve a wide range of industries including retail, manufacturing, healthcare, technology, and automotive.' },
                            { q: 'Are your warehouses secure?', a: 'Absolutely. Our facilities are equipped with 24/7 surveillance, climate control, and strict access protocols.' },
                            { q: 'Do you handle customs clearance?', a: 'Yes, our team of experts handles all customs documentation and compliance to ensure smooth border crossings.' },
                            { q: 'What are your shipping rates?', a: 'Rates vary based on weight, dimensions, and destination. Contact us for a personalized quote tailored to your needs.' },
                            { q: 'Do you offer cargo insurance?', a: 'Yes, we provide comprehensive cargo insurance options to protect your goods against loss or damage during transit.' },
                            { q: 'Can you handle hazardous materials?', a: 'We are certified to handle and transport hazardous materials in compliance with all international safety regulations.' },
                            { q: 'What are your typical delivery times?', a: 'Delivery times depend on the service level chosen. Express air freight can take 1-3 days, while ocean freight may take 2-4 weeks.' },
                            { q: 'Do you offer returns management?', a: 'Yes, we offer efficient reverse logistics solutions to handle returns, repairs, and recycling for your business.' },
                            { q: 'Can I integrate your system with my store?', a: 'Our robust API allows for seamless integration with major e-commerce platforms and ERP systems for automated order processing.' },
                            { q: 'What sustainable practices do you follow?', a: 'We are committed to reducing our carbon footprint through route optimization, eco-friendly packaging, and green fleet initiatives.' },
                        ].map((faq, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none hover:bg-gray-50 transition-colors"
                                >
                                    <span className="text-lg font-bold text-gray-900 flex items-center">
                                        <HelpCircle className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                                        {faq.q}
                                    </span>
                                    <ChevronDown className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${openFaq === index ? 'transform rotate-180' : ''}`} />
                                </button>
                                <div className={`px-6 transition-all duration-300 ease-in-out overflow-hidden ${openFaq === index ? 'max-h-40 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'}`}>
                                    <p className="text-gray-600 ml-8">{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Newsletter Section */}
            <div className="py-20 bg-blue-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
                        <Mail className="h-8 w-8" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Ahead of the Curve</h2>
                    <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                        Subscribe to our newsletter for the latest industry insights, logistics trends, and company updates delivered straight to your inbox.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-grow px-6 py-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        />
                        <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg">
                            Subscribe
                        </button>
                    </form>
                    <p className="text-xs text-gray-400 mt-4">
                        We respect your privacy. Unsubscribe at any time.
                    </p>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-blue-900 py-20 relative overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1516937941344-00b4ec7330f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                        alt="Shipping Container"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-blue-900/80" />
                </div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">Ready to Streamline Your Supply Chain?</h2>
                    <p className="text-xl text-blue-100 mb-10">
                        Join hundreds of satisfied clients who trust Joint Venture for their logistics needs. Let's build a partnership that drives growth.
                    </p>
                    <Link to="/contact" className="inline-block bg-white text-blue-900 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
                        Start the Conversation
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
