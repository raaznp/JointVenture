import React from 'react';
import { useParams } from 'react-router-dom';
import { Award, Printer, CheckCircle, Share2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import jvLogo from '../assets/jv-logo.png';
import safe360Logo from '../assets/safe360-logo.png';

const DUMMY_CERT_DATA = {
    'cert_123': {
        student: 'Admin User',
        course: 'Warehouse Equipment Familiarisation',
        code: 'JV-CERT-A7X92B1',
        issueDate: 'November 15, 2025',
        instructor: 'Sarah Jenkins',
        instructorRole: 'Lead Safety Trainer'
    },
    'cert_124': {
        student: 'Admin User',
        course: 'Safety Protocols 101',
        code: 'JV-CERT-B8Y22C4',
        issueDate: 'October 20, 2025',
        instructor: 'Mike Ross',
        instructorRole: 'Operations Director'
    }
};

const CertificateView = () => {
    const { id } = useParams();
    // In a real app, fetch by ID. Here we mock it.
    // If ID is not in dummy, fallback to first one just for demo stability
    const cert = DUMMY_CERT_DATA[id] || DUMMY_CERT_DATA['cert_123'];

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4 print:bg-white print:p-0">
            
            {/* Action Bar (Hidden when printing) */}
            <div className="w-full max-w-4xl flex justify-between items-center mb-8 print:hidden">
                <Link to="/dashboard/certificates" className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                    <ArrowLeft className="h-5 w-5 mr-2" /> Back to Dashboard
                </Link>
                <div className="flex space-x-3">
                    <button className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 shadow-sm">
                        <Share2 className="h-4 w-4 mr-2" /> Share
                    </button>
                    <button 
                        onClick={handlePrint}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm"
                    >
                        <Printer className="h-4 w-4 mr-2" /> Print PDF
                    </button>
                </div>
            </div>

            {/* Certificate Container */}
            {/* Certificate Container */}
            <div className="bg-white w-full max-w-4xl p-10 md:p-16 rounded-xl shadow-2xl relative overflow-hidden print:shadow-none print:w-full print:h-screen print:rounded-none border-[20px] border-double border-gray-100">
                
                {/* Inner Border */}
                <div className="absolute inset-4 border border-gray-300 pointer-events-none"></div>

                {/* Watermark/Background decoration - Removed as per request */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                     {/* Icon removed */}
                </div>

                {/* Header */}
                <div className="text-center relative z-10">
                    <div className="flex justify-between items-start mb-12 px-4">
                         <img src={jvLogo} alt="Joint Venture" className="h-20 object-contain" />
                         <img src={safe360Logo} alt="Safe360" className="h-16 object-contain" />
                    </div>
                    
                    <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-800 mb-4 uppercase tracking-widest">
                        Certificate
                    </h1>
                    <h2 className="text-xl md:text-2xl font-serif text-gray-500 uppercase tracking-[0.2em] mb-8">
                        of Completion
                    </h2>

                    <div className="w-24 h-1 bg-blue-600 mx-auto mb-12"></div>
                    
                    <p className="text-lg text-gray-500 mb-8 font-serif italic">This is to certify that</p>
                    
                    <div className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 font-serif py-4 px-8 inline-block relative">
                        {cert.student}
                         <div className="absolute bottom-0 left-0 w-full h-px bg-gray-300"></div>
                    </div>

                    <p className="text-lg text-gray-500 mb-8 font-serif italic">has successfully completed the course</p>

                    <div className="text-2xl md:text-4xl font-bold text-blue-800 mb-16 font-serif max-w-2xl mx-auto leading-tight">
                        {cert.course}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-end mt-12 px-8">
                        <div className="text-center">
                            <div className="mb-3 font-signature text-3xl text-gray-800" style={{fontFamily: 'cursive'}}>
                                {cert.instructor}
                            </div>
                            <div className="h-px w-full bg-gray-300 mb-2"></div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{cert.instructorRole}</p>
                        </div>

                         <div className="flex flex-col items-center justify-center -order-1 md:order-none mb-8 md:mb-0">
                            {/* Seal */}
                            <div className="relative">
                                <Award className="h-24 w-24 text-blue-100" />
                                <CheckCircle className="h-12 w-12 text-blue-600 absolute bottom-0 right-0 bg-white rounded-full p-1" />
                            </div>
                         </div>

                        <div className="text-center">
                             <div className="mb-3 font-serif text-xl text-gray-800">
                                {cert.issueDate}
                            </div>
                            <div className="h-px w-full bg-gray-300 mb-2"></div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Date Issued</p>
                        </div>
                    </div>
                </div>

                {/* Footer / ID */}
                <div className="mt-16 text-center pt-6">
                    <p className="text-[10px] text-gray-400 font-mono tracking-widest uppercase mb-1">
                        ID: {cert.code}
                    </p>
                    <p className="text-[10px] text-blue-300">
                        https://jointventure.com/verify/{cert.code}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CertificateView;
