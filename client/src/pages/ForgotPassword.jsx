import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import jvLogo from '../assets/jv-logo.png';
import safe360Logo from '../assets/safe360-logo.png';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        document.title = 'Forgot Password | Joint Venture Logistics';
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitted(true);
            setIsLoading(false);
        }, 1500);
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
                            <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
                            <p className="mt-2 text-sm text-gray-600">
                                {!isSubmitted
                                    ? "Enter your email to receive reset instructions"
                                    : "Check your email for further instructions"
                                }
                            </p>
                        </div>

                        {!isSubmitted ? (
                            <form className="space-y-6" onSubmit={handleSubmit}>
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

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-900 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 shadow-lg hover:shadow-xl"
                                >
                                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                                    {!isLoading && <ArrowRight className="ml-2 h-5 w-5" />}
                                </button>
                            </form>
                        ) : (
                            <div className="rounded-md bg-green-50 p-4 mb-6">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <Mail className="h-5 w-5 text-green-400" aria-hidden="true" />
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-green-800">Request Sent</h3>
                                        <div className="mt-2 text-sm text-green-700">
                                            <p>If an account exists for {email}, you will receive password reset instructions.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mt-6 text-center">
                            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 flex items-center justify-center">
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                Back to Login
                            </Link>
                        </div>
                    </div>

                    <div className="bg-gray-50 px-8 py-4 border-t border-gray-100 flex justify-center items-center space-x-2">
                        <span className="text-xs text-gray-500">Powered by</span>
                        <img src={safe360Logo} alt="Safe 360" className="h-6 object-contain" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
