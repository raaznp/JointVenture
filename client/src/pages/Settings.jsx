import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { User, Lock, Bell, Moon, Globe, Save } from 'lucide-react';

const Settings = () => {
    const { user } = useContext(AuthContext);

    // Local state for form fields (mocking functionality)
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        updates: true,
    });

    const handleSaveProfile = (e) => {
        e.preventDefault();
        alert('Profile updated! (Demo)');
    };

    const handleSaveSecurity = (e) => {
        e.preventDefault();
        alert('Password updated! (Demo)');
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">Account Settings</h2>

            <div className="space-y-6">

                {/* Profile Section */}
                <div className="bg-white shadow rounded-lg p-6">
                    <div className="flex items-center mb-4">
                        <User className="h-6 w-6 text-blue-500 mr-2" />
                        <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
                    </div>
                    <form onSubmit={handleSaveProfile} className="space-y-4">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    disabled
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-50 text-gray-500 sm:text-sm cursor-not-allowed"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <Save className="h-4 w-4 mr-2" />
                                Save Profile
                            </button>
                        </div>
                    </form>
                </div>

                {/* Security Section */}
                <div className="bg-white shadow rounded-lg p-6">
                    <div className="flex items-center mb-4">
                        <Lock className="h-6 w-6 text-red-500 mr-2" />
                        <h3 className="text-lg font-medium text-gray-900">Security</h3>
                    </div>
                    <form onSubmit={handleSaveSecurity} className="space-y-4">
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Current Password</label>
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">New Password</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <Save className="h-4 w-4 mr-2" />
                                Update Password
                            </button>
                        </div>
                    </form>
                </div>

                {/* Preferences Section */}
                <div className="bg-white shadow rounded-lg p-6">
                    <div className="flex items-center mb-4">
                        <Bell className="h-6 w-6 text-yellow-500 mr-2" />
                        <h3 className="text-lg font-medium text-gray-900">Notifications & Preferences</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="flex-grow flex flex-col">
                                <span className="text-sm font-medium text-gray-900">Email Notifications</span>
                                <span className="text-sm text-gray-500">Receive emails about course updates.</span>
                            </span>
                            <button
                                type="button"
                                onClick={() => setNotifications(prev => ({ ...prev, email: !prev.email }))}
                                className={`${notifications.email ? 'bg-blue-600' : 'bg-gray-200'
                                    } relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                            >
                                <span
                                    className={`${notifications.email ? 'translate-x-5' : 'translate-x-0'
                                        } pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}
                                />
                            </button>
                        </div>
                        <hr className="border-gray-200" />
                        <div className="flex items-center justify-between">
                            <span className="flex-grow flex flex-col">
                                <span className="text-sm font-medium text-gray-900">Dark Mode</span>
                                <span className="text-sm text-gray-500">Toggle dark theme for the dashboard.</span>
                            </span>
                            <button
                                type="button"
                                className="bg-gray-200 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <span className="translate-x-0 pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200" />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Settings;
