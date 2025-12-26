import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Send, CheckCircle } from 'lucide-react';

const ApplyJob = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
    // Mock job details based on ID - in real app fetch from API
    const jobTitle = id === '1' ? "Senior VR Developer" : 
                     id === '2' ? "Safety Content Specialist" : 
                     "Future Opportunity";

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        linkedIn: '',
        coverLetter: '',
        resume: null
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFormData(prev => ({ ...prev, resume: e.target.files[0] }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setIsSuccess(true);
        
        // Reset after 3 seconds or redirect
        setTimeout(() => {
             // navigate('/careers'); // Optional: redirect back to careers
        }, 3000);
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
                <div className="bg-white p-10 rounded-3xl shadow-xl max-w-lg w-full text-center transform transition-all animate-bounce-in">
                    <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="h-10 w-10 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
                    <p className="text-gray-600 mb-8">
                        Thank you for applying for the <span className="font-bold text-gray-900">{jobTitle}</span> position. 
                        We have received your application and will review it shortly.
                    </p>
                    <button 
                        onClick={() => navigate('/careers')}
                        className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-700 transition-colors"
                    >
                        Back to Careers
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
             <div className="max-w-3xl mx-auto">
                <button 
                    onClick={() => navigate('/careers')}
                    className="flex items-center text-gray-500 hover:text-blue-600 transition-colors mb-8 font-medium"
                >
                    <ArrowLeft className="h-5 w-5 mr-2" /> Back to Careers
                </button>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    <div className="bg-blue-900 px-8 py-10 text-white">
                        <h1 className="text-3xl font-bold mb-2">Apply Now</h1>
                        <p className="text-blue-200 text-lg">Position: <span className="font-semibold text-white">{jobTitle}</span></p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    required
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">LinkedIn Profile</label>
                                <input
                                    type="url"
                                    name="linkedIn"
                                    value={formData.linkedIn}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    placeholder="https://linkedin.com/in/johndoe"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Resume / CV</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 transition-colors bg-gray-50">
                                <div className="space-y-1 text-center">
                                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                    <div className="flex text-sm text-gray-600">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                                        >
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        PDF, DOC up to 10MB
                                        {formData.resume && <span className="block mt-2 text-green-600 font-bold">{formData.resume.name}</span>}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Cover Letter</label>
                            <textarea
                                name="coverLetter"
                                rows="5"
                                value={formData.coverLetter}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="Why you are a good fit for this role?"
                            ></textarea>
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg transform hover:-translate-y-1'}`}
                            >
                                {isSubmitting ? 'Submitting Application...' : (
                                    <span className="flex items-center">
                                        Submit Application <Send className="ml-2 h-5 w-5" />
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ApplyJob;
