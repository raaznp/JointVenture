import { useState, useEffect } from 'react';
import { Save, Globe, Mail, Bell, Shield, Lock } from 'lucide-react';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    
    // Placeholder settings state - in a real app, fetch from backend if available
    const [settings, setSettings] = useState({
        siteName: 'Joint Venture Logistics',
        supportEmail: 'support@jvlogistics.com',
        maintenanceMode: false,
        emailNotifications: true,
    });

    const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

    useEffect(() => {
        document.title = 'Settings';
    }, []);

    const handleSave = () => {
        // Just simulation for now as requested "exact same" behavior except 2FA
        setMessage('Settings saved (Simulation)');
        setTimeout(() => setMessage(''), 3000);
    };

    const handleUpdatePassword = (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (passwords.new !== passwords.confirm) {
            setError('New passwords do not match');
            return;
        }
        // In a real implementation, we would call an API here.
        // For now, mirroring the "Simulation" behavior of Safe360
        setMessage('Password updated successfully (Simulation).');
        setPasswords({ current: '', new: '', confirm: '' });
        setTimeout(() => setMessage(''), 3000);
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

            {/* Main Container - Flexbox Layout matching Safe360 */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden min-h-[500px] flex flex-col md:flex-row">
                
                {/* Settings Sidebar - Fixed width on desktop */}
                <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-gray-200 bg-gray-50 flex-shrink-0">
                    <nav className="p-4 space-y-2">
                        <button
                            onClick={() => setActiveTab('general')}
                            className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                                activeTab === 'general' 
                                ? 'bg-blue-600 text-white' 
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                            }`}
                        >
                            <Globe className="w-4 h-4 mr-3" />
                            General
                        </button>
                        <button
                            onClick={() => setActiveTab('notifications')}
                            className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                                activeTab === 'notifications' 
                                ? 'bg-blue-600 text-white' 
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                            }`}
                        >
                            <Bell className="w-4 h-4 mr-3" />
                            Notifications
                        </button>
                        <button
                            onClick={() => setActiveTab('security')}
                            className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                                activeTab === 'security' 
                                ? 'bg-blue-600 text-white' 
                                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                            }`}
                        >
                            <Shield className="w-4 h-4 mr-3" />
                            Security
                        </button>
                    </nav>
                </div>

                {/* Settings Content - Takes remaining space */}
                <div className="flex-1 p-8">
                    {activeTab === 'general' && (
                        <div className="max-w-xl space-y-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">General Settings</h2>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Site Name</label>
                                <input
                                    type="text"
                                    value={settings.siteName}
                                    onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-600 outline-none transition-colors"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                    <input
                                        type="email"
                                        value={settings.supportEmail}
                                        onChange={(e) => setSettings({...settings, supportEmail: e.target.value})}
                                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-600 outline-none transition-colors"
                                    />
                                </div>
                            </div>
                            
                            <div className="flex items-center justify-between pt-4">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">Maintenance Mode</h3>
                                    <p className="text-xs text-gray-500">Put the site in maintenance mode</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={settings.maintenanceMode} 
                                        onChange={(e) => setSettings({...settings, maintenanceMode: e.target.checked})}
                                        className="sr-only peer" 
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                             <div className="mt-8 pt-6 border-t border-gray-200">
                                <button 
                                    onClick={handleSave}
                                    className="flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="max-w-xl space-y-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Notification Settings</h2>
                             <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900">Email Notifications</h3>
                                    <p className="text-xs text-gray-500">Receive emails about new messages and system alerts</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={settings.emailNotifications} 
                                        onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                                        className="sr-only peer" 
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                            </div>
                             <div className="mt-8 pt-6 border-t border-gray-200">
                                <button 
                                    onClick={handleSave}
                                    className="flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                >
                                    <Save className="w-4 h-4 mr-2" />
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'security' && (
                        <div className="max-w-xl space-y-8">
                            {/* Two-Factor Authentication REMOVED as per request */}

                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                                    <Lock className="w-5 h-5 mr-2 text-blue-600" />
                                    Change Password
                                </h2>
                                <form onSubmit={handleUpdatePassword} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                                        <input
                                            type="password"
                                            value={passwords.current}
                                            onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-600 outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                        <input
                                            type="password"
                                            value={passwords.new}
                                            onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-600 outline-none transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                        <input
                                            type="password"
                                            value={passwords.confirm}
                                            onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-600 outline-none transition-colors"
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <button type="submit" className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                                            <Save className="w-4 h-4 mr-2" />
                                            Update Password
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>

             {(message || error) && (
                <div className={`mt-6 p-4 rounded-lg bg-white shadow-sm border-l-4 ${error ? 'border-red-500 text-red-500' : 'border-green-500 text-green-500'}`}>
                    <div className="flex items-center">
                        <div className="ml-3">
                            <p className="text-sm font-medium">{error || message}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;
