import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { LayoutDashboard, BookOpen, Users, Settings, LogOut, Mail, HelpCircle, Award, Image as ImageIcon, FileText } from 'lucide-react';
import jvLogo from '../assets/jv-logo.png';

const Sidebar = () => {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Courses', path: '/dashboard/courses', icon: BookOpen },
        { name: 'Certifications', path: '/dashboard/certificates', icon: Award },
        
        // Admin Only
        ...(user?.role === 'admin' ? [
            { name: 'Users', path: '/dashboard/users', icon: Users },
            { name: 'Messages', path: '/dashboard/messages', icon: Mail },
            { name: 'Support', path: '/dashboard/admin/support', icon: HelpCircle }
        ] : []),

        // Admin & Editor (Content Management)
        ...((user?.role === 'admin' || user?.role === 'editor') ? [
            { name: 'Blogs', path: '/dashboard/blogs', icon: BookOpen },
            { name: 'Media', path: '/dashboard/media', icon: ImageIcon },
            { name: 'Files', path: '/dashboard/files', icon: FileText },
        ] : []),

        // Staff/User Support (if not admin)
        ...(user?.role !== 'admin' ? [
             { name: 'Support', path: '/dashboard/support', icon: HelpCircle }
        ] : []),

        { name: 'Settings', path: '/dashboard/settings', icon: Settings },
    ];

    return (
        <div className="flex flex-col h-screen w-64 bg-gray-200 text-gray-900 border-r border-gray-300">
            <div className="flex items-center justify-center h-20 border-b border-gray-300 p-4">
                <img src={jvLogo} alt="Joint Venture" className="h-full object-contain" />
            </div>
            <div className="flex-1 overflow-y-auto py-4">
                <nav className="px-2 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${isActive(item.path)
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                                }`}
                        >
                            <item.icon className="mr-3 h-5 w-5" />
                            {item.name}
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="p-4 border-t border-gray-300">
                <div className="flex items-center mb-4">
                    <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                        <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors mb-4"
                >
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                </button>
                <div className="text-center">
                    <p className="text-xs text-gray-500">Powered by</p>
                    <p className="text-xs font-semibold text-gray-400">SAFE 360</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
