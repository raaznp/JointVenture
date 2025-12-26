import React, { useState } from 'react';
import { Search, Filter, MessageSquare, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const DUMMY_TICKETS = [
    { id: 'TR-8821', user: 'Mike Ross', subject: 'Login Integration failing', category: 'Technical', priority: 'High', status: 'Open', date: '2 hrs ago' },
    { id: 'TR-8820', user: 'Sarah Jenkins', subject: 'Requesting new VR module license', category: 'Access', priority: 'Normal', status: 'In Progress', date: '5 hrs ago' },
    { id: 'TR-8819', user: 'David Kim', subject: 'Billing invoice incorrect', category: 'Billing', priority: 'Urgent', status: 'Open', date: '1 day ago' },
    { id: 'TR-8815', user: 'Emily Chen', subject: 'Feature Request: Dark Mode', category: 'Feature', priority: 'Low', status: 'Closed', date: '3 days ago' },
    { id: 'TR-8810', user: 'Robert Stone', subject: 'Cannot access Safety Report', category: 'Permissions', priority: 'Normal', status: 'Resolved', date: '1 week ago' },
];

const SupportManagement = () => {
    const [tickets, setTickets] = useState(DUMMY_TICKETS);
    const [filter, setFilter] = useState('All');

    const filteredTickets = filter === 'All' ? tickets : tickets.filter(t => t.status === filter);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Open': return 'bg-red-100 text-red-800';
            case 'In Progress': return 'bg-blue-100 text-blue-800';
            case 'resolved':
            case 'Closed': return 'bg-gray-100 text-gray-800';
            case 'Resolved': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityIcon = (priority) => {
        if(priority === 'Urgent') return <AlertCircle className="h-4 w-4 text-red-500" />;
        if(priority === 'High') return <AlertCircle className="h-4 w-4 text-orange-500" />;
        return <Clock className="h-4 w-4 text-gray-400" />;
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <h1 className="text-2xl font-bold text-gray-900">Support Tickets</h1>
                <div className="mt-4 sm:mt-0 flex space-x-2">
                     <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                        <Filter className="h-4 w-4 mr-2 text-gray-500" /> Filter
                    </button>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                        + Create Ticket
                    </button>
                </div>
            </div>

            {/* Kanban-ish Status Filter */}
            <div className="flex space-x-2 border-b border-gray-200 pb-2 overflow-x-auto">
                {['All', 'Open', 'In Progress', 'Resolved', 'Closed'].map(status => (
                    <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === status ? 'bg-blue-100 text-blue-800' : 'text-gray-500 hover:bg-gray-100'}`}
                    >
                        {status}
                    </button>
                ))}
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket ID / Subject</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredTickets.map((ticket) => (
                            <tr key={ticket.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-gray-900">{ticket.id}</span>
                                        <span className="text-sm text-gray-500">{ticket.subject}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900">{ticket.user}</div>
                                    <div className="text-xs text-gray-500">{ticket.category}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        {getPriorityIcon(ticket.priority)}
                                        <span className="ml-2 text-sm text-gray-700">{ticket.priority}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                                        {ticket.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {ticket.date}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button className="text-blue-600 hover:text-blue-900">Manage</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredTickets.length === 0 && (
                     <div className="p-10 text-center text-gray-500">
                        No tickets found matching this filter.
                    </div>
                )}
            </div>
        </div>
    );
};

export default SupportManagement;
