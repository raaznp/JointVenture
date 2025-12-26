import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const PublicVerification = () => {
    const [code, setCode] = useState('');
    const navigate = useNavigate();

    const handleVerify = (e) => {
        e.preventDefault();
        if (code.trim()) {
            navigate(`/certificates/${code.trim()}`);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 text-center">
                <div>
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        Verify a Certificate
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Enter the unique certificate code found on the document to verify its authenticity.
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleVerify}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="code" className="sr-only">Certificate Code</label>
                            <input
                                id="code"
                                name="code"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Certificate Code (e.g., JV-CERT-123)"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <Search className="h-5 w-5 text-blue-500 group-hover:text-blue-400" aria-hidden="true" />
                            </span>
                            Verify Code
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PublicVerification;
