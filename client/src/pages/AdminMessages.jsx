import React, { useState } from 'react';
import { Mail, Search, Trash2, Eye } from 'lucide-react';

const DUMMY_MESSAGES = [
    { id: 1, name: "John Doe", email: "john@example.com", subject: "Inquiry about VR Training", message: "Hi, I would like to know more about your VR training modules for construction safety.", date: "2025-12-19", status: "New" },
    { id: 2, name: "Alice Smith", email: "alice@company.com", subject: "Partnership Opportunity", message: "We are interested in a joint venture for logistics management in Europe.", date: "2025-12-18", status: "Read" },
    { id: 3, name: "Robert Johnson", email: "robert@buildsafe.net", subject: "Technical Support", message: "I am having trouble accessing the dashboard. Can you help?", date: "2025-12-18", status: "Replied" },
    { id: 4, name: "Emily Davis", email: "emily@consulting.com", subject: "Quote Request", message: "Please send a quote for 50 licenses.", date: "2025-12-15", status: "New" },
    { id: 5, name: "Michael Brown", email: "mike@demo.com", subject: "Demo Request", message: "Can we schedule a demo for next Tuesday?", date: "2025-12-10", status: "Read" },
];

const AdminMessages = () => {
    const [messages, setMessages] = useState(DUMMY_MESSAGES);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMessages = messages.filter(msg => 
        msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDelete = (id) => {
        if(window.confirm('Are you sure you want to delete this message?')) {
            setMessages(messages.filter(msg => msg.id !== id));
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <div className="relative w-full sm:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
                        placeholder="Search messages..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="text-sm text-gray-500">
                    Showing {filteredMessages.length} messages
                </div>
            </div>

            {/* Messages Table */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
                <ul className="divide-y divide-gray-200">
                    {filteredMessages.map((msg) => (
                        <li key={msg.id} className="hover:bg-gray-50 transition-colors">
                            <div className="px-4 py-4 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center truncate">
                                        <div className="flex-shrink-0">
                                            <span className={`inline-flex items-center justify-center h-10 w-10 rounded-full ${params(msg.status).bg}`}>
                                                <Mail className={`h-6 w-6 ${params(msg.status).text}`} />
                                            </span>
                                        </div>
                                        <div className="ml-4 truncate">
                                            <div className="flex items-center">
                                                <p className="text-sm font-medium text-blue-600 truncate">{msg.name}</p>
                                                <p className="ml-2 text-xs text-gray-400">{msg.email}</p>
                                            </div>
                                            <p className="text-sm text-gray-900 font-semibold mt-1">{msg.subject}</p>
                                        </div>
                                    </div>
                                    <div className="ml-2 flex-shrink-0 flex items-center space-x-2">
                                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            {msg.status}
                                        </p>
                                        <div className="text-xs text-gray-500">{msg.date}</div>
                                    </div>
                                </div>
                                <div className="mt-2 sm:flex sm:justify-between">
                                    <div className="sm:flex">
                                        <p className="flex items-center text-sm text-gray-500 line-clamp-2">
                                            {msg.message}
                                        </p>
                                    </div>
                                    <div className="mt-2 flex items-center text-sm sm:mt-0 sm:ml-4 space-x-2">
                                         <button className="text-gray-400 hover:text-blue-600 transition-colors">
                                            <Eye className="h-5 w-5" />
                                        </button>
                                        <button onClick={() => handleDelete(msg.id)} className="text-gray-400 hover:text-red-600 transition-colors">
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                {filteredMessages.length === 0 && (
                     <div className="p-10 text-center text-gray-500">
                        No messages found.
                    </div>
                )}
            </div>
        </div>
    );
};

const params = (status) => {
    switch (status) {
        case 'New': return { bg: 'bg-blue-100', text: 'text-blue-600' };
        case 'Read': return { bg: 'bg-gray-100', text: 'text-gray-500' };
        case 'Replied': return { bg: 'bg-green-100', text: 'text-green-600' };
        default: return { bg: 'bg-gray-100', text: 'text-gray-500' };
    }
}

export default AdminMessages;
