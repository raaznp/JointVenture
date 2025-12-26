import { Link, useLocation } from 'react-router-dom';
import jvLogo from '../assets/jv-logo.png';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const PublicNavbar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Services', path: '/services' },
        { name: 'Locations', path: '/locations' },
        { name: 'Blog', path: '/blog' },
        { name: 'Careers', path: '/careers' },
        { name: 'Contact', path: '/contact' },
    ];

    const isActive = (path) => {
        if (path === '/' && location.pathname !== '/') return false;
        return location.pathname.startsWith(path);
    };

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-white/90 backdrop-blur-sm py-4'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Link to="/">
                            <img src={jvLogo} alt="Joint Venture" className="h-10 object-contain" />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`text-sm font-medium uppercase tracking-wider transition-colors ${isActive(item.path) ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-900'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            to="/login"
                            className="px-6 py-2 rounded-full font-medium transition-all bg-blue-900 text-white hover:bg-blue-800 shadow-md hover:shadow-lg"
                        >
                            Employee Portal
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-blue-600 focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(item.path) ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-900'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            to="/login"
                            onClick={() => setIsOpen(false)}
                            className="block w-full text-center mt-4 px-6 py-3 rounded-lg font-medium bg-blue-900 text-white hover:bg-blue-800"
                        >
                            Employee Portal
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default PublicNavbar;
