import { Link } from 'react-router-dom';
import jvLogo from '../assets/jv-logo.png';

const PublicFooter = () => {
    return (
        <footer className="bg-gray-200 py-12 border-t border-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <img src={jvLogo} alt="Joint Venture Logistics" className="h-12 mb-4" />
                        <h4 className="text-gray-900 text-lg font-bold mb-4">Joint Venture</h4>
                        <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                            Your trusted partner in global logistics and supply chain management. Delivering excellence since 1999.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-gray-900 text-sm font-bold uppercase tracking-wider mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            {['Home', 'About', 'Services', 'Locations', 'Careers', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link
                                        to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                        className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link to="/login" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">Employee Portal</Link>
                            </li>
                            <li>
                                <Link to="/verify" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">Verify Certificate</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-gray-900 text-sm font-bold uppercase tracking-wider mb-4">Legal</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-blue-600 text-sm transition-colors">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-300 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm">© 2024 Joint Venture Logistics. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default PublicFooter;
