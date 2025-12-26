import { useEffect } from 'react';
import { MapPin, Phone, Globe, Shield, Thermometer, Truck, Printer } from 'lucide-react';

const Locations = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
        document.title = 'Locations | Joint Venture Logistics';
    }, []);

    return (
        <div className="animate-fade-in">
            {/* Hero Banner */}
            <div className="bg-blue-900 py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img
                        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                        alt="Locations Background"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Locations</h1>
                    <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                        Strategically positioned to serve your global logistics needs.
                    </p>
                </div>
            </div>

            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg h-[600px] relative">
                        {/* Placeholder for Map - In a real app, use Google Maps API or Leaflet */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968482413!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1622222222222!5m2!1sen!2sus"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            title="Joint Venture Locations"
                            className="grayscale hover:grayscale-0 transition-all duration-500"
                        ></iframe>

                        <div className="absolute top-8 left-8 bg-white p-6 rounded-xl shadow-xl max-w-xs">
                            <h4 className="font-bold text-gray-900 mb-2">Headquarters</h4>
                            <div className="flex items-start space-x-3 text-sm text-gray-600 mb-4">
                                <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0" />
                                <span>123 Logistics Way,<br />London, UK SW1A 1AA</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm text-gray-600">
                                <Phone className="h-5 w-5 text-blue-600 flex-shrink-0" />
                                <span>+44 20 7123 4567</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm text-gray-600 mt-2">
                                <Printer className="h-5 w-5 text-blue-600 flex-shrink-0" />
                                <span>+44 20 7987 6543</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Global Hubs Grid */}
            <div className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-3">Global Network</h2>
                        <h3 className="text-4xl font-bold text-gray-900">Key Regional Hubs</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { city: 'London', country: 'UK', type: 'Global HQ', address: '123 Logistics Way, London' },
                            { city: 'New York', country: 'USA', type: 'North American Hub', address: '45 Broadway, NY' },
                            { city: 'Singapore', country: 'Singapore', type: 'Asia-Pacific Hub', address: '88 Marina Bay, Singapore' },
                            { city: 'Dubai', country: 'UAE', type: 'Middle East Logistics Center', address: '12 Desert Road, Dubai' },
                            { city: 'Sydney', country: 'Australia', type: 'Oceania Distribution', address: '99 Harbor View, Sydney' },
                            { city: 'Sao Paulo', country: 'Brazil', type: 'South America Hub', address: '55 Amazonia St, Sao Paulo' },
                        ].map((hub, index) => (
                            <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                                <div className="flex items-center justify-between mb-4">
                                    <h4 className="text-xl font-bold text-gray-900">{hub.city}</h4>
                                    <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{hub.country}</span>
                                </div>
                                <p className="text-blue-600 font-medium text-sm mb-4">{hub.type}</p>
                                <div className="flex items-start text-gray-500 text-sm">
                                    <MapPin className="h-4 w-4 mr-2 mt-1 flex-shrink-0 group-hover:text-blue-600 transition-colors" />
                                    {hub.address}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Facility Features */}
            <div className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 gap-16 items-center">
                        <div className="order-2 lg:order-1">
                            <h2 className="text-blue-600 font-bold tracking-wide uppercase text-sm mb-3">Infrastructure</h2>
                            <h3 className="text-4xl font-bold text-gray-900 mb-6">World-Class Facilities</h3>
                            <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                Our warehouses are more than just storage spaces. They are advanced logistics centers designed for efficiency, security, and scalability.
                            </p>
                            <div className="space-y-6">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
                                            <Shield className="h-6 w-6" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium text-gray-900">24/7 Security</h4>
                                        <p className="mt-2 text-base text-gray-500">Advanced surveillance, biometric access control, and round-the-clock security personnel.</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
                                            <Thermometer className="h-6 w-6" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium text-gray-900">Climate Control</h4>
                                        <p className="mt-2 text-base text-gray-500">Temperature and humidity-controlled zones for sensitive pharmaceuticals, food, and electronics.</p>
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 text-blue-600">
                                            <Truck className="h-6 w-6" />
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-lg font-medium text-gray-900">Cross-Docking Capable</h4>
                                        <p className="mt-2 text-base text-gray-500">Optimized for rapid transfer of goods with minimal storage time to speed up your supply chain.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 mb-12 lg:mb-0 relative">
                            <div className="absolute -top-4 -right-4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
                            <img
                                src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80"
                                alt="Modern Warehouse"
                                className="relative rounded-2xl shadow-2xl z-10"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Locations;
