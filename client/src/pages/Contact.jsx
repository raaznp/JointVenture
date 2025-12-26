import { useEffect } from 'react';
import { Phone, Mail, MapPin, MessageSquare, Clock, HelpCircle, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const Contact = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Contact Us | Joint Venture Logistics';
    }, []);

    return (
        <div className="animate-fade-in">
            {/* Hero Banner */}
            <div className="bg-blue-900 py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img
                        src="https://images.unsplash.com/photo-1516387938699-a93567ec168e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80"
                        alt="Contact Background"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        We're here to help. Reach out to us for any inquiries or support.
                    </p>
                </div>
            </div>

            <div className="py-24 bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-16">
                        <div>
                            <h2 className="text-blue-400 font-bold tracking-wide uppercase text-sm mb-3">Get in Touch</h2>
                            <h3 className="text-4xl font-bold mb-8">Let's Start a Conversation</h3>
                            <p className="text-gray-400 mb-10 text-lg leading-relaxed">
                                Whether you have a question about our services, pricing, or need a custom solution, our team is ready to answer all your questions.
                            </p>
                            <div className="space-y-8">
                                <div className="flex items-start space-x-6">
                                    <div className="flex-shrink-0 bg-gray-800 p-4 rounded-lg">
                                        <Phone className="h-6 w-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 uppercase tracking-wide font-semibold">Phone</p>
                                        <p className="text-lg text-white">+44 20 7123 4567</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-6">
                                    <div className="flex-shrink-0 bg-gray-800 p-4 rounded-lg">
                                        <Mail className="h-6 w-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 uppercase tracking-wide font-semibold">Email</p>
                                        <p className="text-lg text-white">contact@jointventure.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-6">
                                    <div className="flex-shrink-0 bg-gray-800 p-4 rounded-lg">
                                        <MapPin className="h-6 w-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 uppercase tracking-wide font-semibold">Headquarters</p>
                                        <p className="text-lg text-white">123 Logistics Way, London, UK</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-700">
                            <form className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                                        <input type="text" className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white transition-colors" placeholder="John" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                                        <input type="text" className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white transition-colors" placeholder="Doe" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                                    <input type="email" className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white transition-colors" placeholder="john@example.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                                    <textarea rows="4" className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-white transition-colors" placeholder="How can we help you?"></textarea>
                                </div>
                                <button className="w-full bg-blue-600 py-4 rounded-lg font-bold text-white hover:bg-blue-700 transition-all transform hover:-translate-y-1 shadow-lg">
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Department Directory */}
            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-3">Direct Lines</h2>
                        <h3 className="text-4xl font-bold text-gray-900">Department Directory</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { dept: 'Sales & Partnerships', email: 'sales@jointventure.com', phone: '+44 20 7123 4568', desc: 'For quotes, new accounts, and partnership opportunities.' },
                            { dept: 'Customer Support', email: 'support@jointventure.com', phone: '+44 20 7123 4569', desc: 'For tracking, claims, and existing account assistance.' },
                            { dept: 'Media Relations', email: 'media@jointventure.com', phone: '+44 20 7123 4570', desc: 'For press inquiries, brand assets, and official statements.' },
                        ].map((item, index) => (
                            <div key={index} className="bg-gray-50 p-8 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors">
                                <h4 className="text-xl font-bold text-gray-900 mb-4">{item.dept}</h4>
                                <p className="text-gray-600 mb-6 text-sm">{item.desc}</p>
                                <div className="space-y-3">
                                    <div className="flex items-center text-gray-700">
                                        <Mail className="h-4 w-4 text-blue-600 mr-3" />
                                        {item.email}
                                    </div>
                                    <div className="flex items-center text-gray-700">
                                        <Phone className="h-4 w-4 text-blue-600 mr-3" />
                                        {item.phone}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Support FAQ */}
            <div className="py-24 bg-gray-50">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-3">Common Questions</h2>
                        <h3 className="text-4xl font-bold text-gray-900">Support FAQ</h3>
                    </div>
                    <div className="space-y-4">
                        {[
                            { q: 'What are your customer support hours?', a: 'Our general support team is available 24/7. Specialized department support is available Mon-Fri, 9 AM - 6 PM EST.' },
                            { q: 'How do I file a claim for damaged goods?', a: 'Claims can be filed directly through your client portal or by emailing claims@jointventure.com with your tracking number and photos of the damage.' },
                            { q: 'Can I change the delivery address after shipment?', a: 'Address changes are possible for a fee, provided the shipment has not yet reached the final delivery hub. Contact support immediately.' },
                            { q: 'Where can I find my invoices?', a: 'All invoices are automatically generated and stored in your client portal under the "Billing" section.' },
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
        </div>
    );
};

export default Contact;
