import { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import jvLogo from '../assets/jv-logo.png';
import safe360Logo from '../assets/safe360-logo.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState('');

    useEffect(() => {
        document.title = 'Login | Joint Venture Logistics';
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (error) {
            setError('Invalid email or password. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background Image & Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                    alt="Warehouse"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm" />
            </div>

            {/* Centered Card */}
            <div className="relative z-10 w-full max-w-md p-4">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all">
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <img src={jvLogo} alt="Joint Venture" className="h-16 mx-auto mb-4 object-contain" />
                            <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
                            <p className="mt-2 text-sm text-gray-600">
                                Sign in to access your training dashboard
                            </p>
                        </div>

                        {error && (
                            <div className="mb-4 p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm flex items-center">
                                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {error}
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email Address
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-3"
                                            placeholder="you@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            autoComplete="current-password"
                                            required
                                            className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-10 sm:text-sm border-gray-300 rounded-lg py-3"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5" />
                                            ) : (
                                                <Eye className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm">
                                    <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg ${isLoading
                                    ? 'bg-blue-800 cursor-not-allowed opacity-80'
                                    : 'bg-blue-900 hover:bg-blue-800 hover:shadow-xl'
                                    }`}
                            >
                                {isLoading ? 'Signing in...' : 'Sign in'}
                                {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
                            </button>
                        </form>
                    </div>

                    <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
                        <div className="flex justify-center items-center space-x-2 mb-4">
                            <span className="text-xs text-gray-500">Powered by</span>
                            <img src={safe360Logo} alt="Safe 360" className="h-6 object-contain" />
                        </div>
                        <div className="text-center">
                            <Link to="/" className="font-medium text-blue-600 hover:text-blue-500 flex items-center justify-center text-sm">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
