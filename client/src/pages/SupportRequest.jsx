import React, { useState } from 'react';
import { HelpCircle, Send, FileText, AlertCircle } from 'lucide-react';

const SupportRequest = () => {
    const [formData, setFormData] = useState({
        subject: '',
        priority: 'Normal',
        description: '',
        category: 'Technical'
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
        }, 1500);
    };

    if (submitted) {
        return (
            <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-md text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                    <Send className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Ticket Submitted!</h2>
                <p className="text-gray-600 mb-8">
                    Your support request has been received. Our team will get back to you shortly.
                    Your ticket ID is <strong>#TR-8821</strong>.
                </p>
                <button
                    onClick={() => { setSubmitted(false); setFormData({ subject: '', priority: 'Normal', description: '', category: 'Technical' }) }}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                >
                    Submit Another Request
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex items-start space-x-4">
                <div className="bg-blue-600 p-3 rounded-lg shadow-lg">
                    <HelpCircle className="h-8 w-8 text-white" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Support Center</h1>
                    <p className="text-gray-500">Need help? Submit a ticket and our support team will assist you.</p>
                </div>
            </div>

            <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
                <div className="p-6 md:p-8 space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                                <div className="relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <FileText className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        name="subject"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg py-3"
                                        placeholder="Brief summary of the issue"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-lg py-3 px-4"
                                >
                                    <option>Technical Issue</option>
                                    <option>Billing / Account</option>
                                    <option>Feature Request</option>
                                    <option>Access / Permissions</option>
                                    <option>Other</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
                            <div className="flex space-x-4">
                                {['Low', 'Normal', 'High', 'Urgent'].map((p) => (
                                    <label key={p} className={`flex-1 relative flex items-center justify-center px-4 py-3 border rounded-lg cursor-pointer hover:bg-gray-50 focus:outline-none transition-all ${formData.priority === p ? 'ring-2 ring-offset-2 ring-blue-500 border-blue-500 bg-blue-50 z-10' : 'border-gray-300'}`}>
                                        <input
                                            type="radio"
                                            name="priority"
                                            value={p}
                                            checked={formData.priority === p}
                                            onChange={handleChange}
                                            className="sr-only"
                                        />
                                        <span className={`text-sm font-medium ${formData.priority === p ? 'text-blue-900' : 'text-gray-900'}`}>{p}</span>
                                        {p === 'Urgent' && <AlertCircle className="ml-2 h-4 w-4 text-red-500" />}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                            <textarea
                                name="description"
                                rows="6"
                                required
                                value={formData.description}
                                onChange={handleChange}
                                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-lg p-4"
                                placeholder="Please describe your issue in detail..."
                            ></textarea>
                        </div>

                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'}`}
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                    <p className="text-xs text-center text-gray-500">
                        Our support team is available Mon-Fri, 9am - 6pm EST. Urgent tickets are monitored 24/7.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SupportRequest;
