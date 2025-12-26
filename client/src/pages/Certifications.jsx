import React from 'react';
import { Award, Calendar, Download, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const DUMMY_CERTS = [
    {
        id: 'cert_123',
        course: 'Warehouse Equipment Familiarisation',
        code: 'JV-CERT-A7X92B1',
        issueDate: 'November 15, 2025',
        status: 'Active'
    },
    {
        id: 'cert_124',
        course: 'Safety Protocols 101',
        code: 'JV-CERT-B8Y22C4',
        issueDate: 'October 20, 2025',
        status: 'Active'
    }
];

const Certifications = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">My Certifications</h1>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                    <ExternalLink className="w-4 h-4 mr-2" /> Verify a Certificate
                </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {DUMMY_CERTS.map((cert) => (
                    <div key={cert.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-6">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                                <Award className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{cert.course}</h3>
                            
                            <div className="space-y-2 text-sm text-gray-600 mb-6">
                                <div className="flex justify-between">
                                    <span>Certificate Code:</span>
                                    <span className="font-mono font-medium text-gray-900">{cert.code}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Issued On:</span>
                                    <span>{cert.issueDate}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Status:</span>
                                    <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-xs font-bold">
                                        {cert.status}
                                    </span>
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <Link 
                                    to={`/certificates/${cert.id}`}
                                    className="flex-1 flex items-center justify-center px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium text-sm"
                                >
                                    View
                                </Link>
                                <button className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                    <Download className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                            <span>Valid Lifetime</span>
                            <span className="flex items-center"><Award className="h-3 w-3 mr-1" /> Verified</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Certifications;
