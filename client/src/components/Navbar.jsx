import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="bg-white shadow">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="text-xl font-bold text-gray-800">Warehouse LMS</Link>
                        </div>
                    </div>
                    <div className="flex items-center">
                        {user ? (
                            <>
                                <span className="mr-4 text-gray-600">Welcome, {user.name}</span>
                                <button onClick={logout} className="text-red-600 hover:text-red-800 font-medium">Logout</button>
                            </>
                        ) : (
                            <div className="space-x-4">
                                <Link to="/login" className="text-blue-600 hover:text-blue-800">Login</Link>
                                <Link to="/register" className="text-blue-600 hover:text-blue-800">Register</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
