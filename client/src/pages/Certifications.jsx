import React, { useEffect, useState } from 'react';
import { Award, Calendar, Download, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Certifications = () => {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = 'My Certifications | Joint Venture Logistics';
        const fetchCertificates = async () => {
            try {
                const token = localStorage.getItem('token');
                const { data } = await axios.get('/api/certificates', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setCertificates(data);
            } catch (error) {
                console.error("Failed to fetch certificates", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCertificates();
    }, []);

    if (loading) return <div>Loading certifications...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">My Certifications</h1>
                <Link to="/verify" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                    <ExternalLink className="w-4 h-4 mr-2" /> Verify a Certificate
                </Link>
            </div>

            {certificates.length === 0 ? (
                <div className="bg-white p-12 rounded-xl text-center shadow-sm border border-gray-100">
                    <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Award className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No Certifications Yet</h3>
                    <p className="text-gray-500 mt-2">Complete a course with 100% score to earn your first certificate.</p>
                    <Link to="/dashboard/courses" className="mt-6 inline-block text-blue-600 font-medium hover:underline">
                        Browse Courses
                    </Link>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {certificates.map((cert) => (
                        <div key={cert._id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                            <div className="p-6">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
                                    <Award className="h-6 w-6" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{cert.course.title}</h3>
                                
                                <div className="space-y-2 text-sm text-gray-600 mb-6">
                                    <div className="flex justify-between">
                                        <span>Certificate Code:</span>
                                        <span className="font-mono font-medium text-gray-900">{cert.code}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Issued On:</span>
                                        <span>{new Date(cert.issueDate).toLocaleDateString()}</span>
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
                                        to={`/certificates/${cert._id}`}
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
            )}
        </div>
    );
};

export default Certifications;
