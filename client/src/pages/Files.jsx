import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Upload, FileText, Download, Trash2, File as FileIcon } from 'lucide-react';

const Files = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetchFiles();
        document.title = 'File Manager | Joint Venture Logistics';
    }, []);

    const fetchFiles = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get('/api/files', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (Array.isArray(data)) {
                setFiles(data);
            }
        } catch (error) {
            console.error('Error fetching files:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post('/api/files/upload', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('File uploaded successfully!');
            fetchFiles();
        } catch (error) {
            console.error('Upload error:', error);
            alert('Upload failed: ' + (error.response?.data?.message || 'Unknown error'));
        } finally {
            setUploading(false);
            e.target.value = null;
        }
    };

    const formatSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">File Manager</h1>
                <div>
                     <input
                        type="file"
                        id="fileUpload"
                        className="hidden"
                        onChange={handleUpload}
                        accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx,.rtf,.odt,.ods,.odp,.zip,.rar"
                    />
                    <label
                        htmlFor="fileUpload"
                        className={`flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg cursor-pointer transition-colors ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                        <Upload className="w-5 h-5 mr-2" />
                        {uploading ? 'Uploading...' : 'Upload File'}
                    </label>
                </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 text-gray-700">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500">Loading files...</td>
                                </tr>
                            ) : files.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500">No files uploaded yet.</td>
                                </tr>
                            ) : (
                                files.map((file, index) => (
                                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                                                    <FileText className="w-5 h-5" />
                                                </div>
                                                <span className="font-medium text-gray-900">{file.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {formatSize(file.size)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {new Date(file.date).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <a 
                                                href={file.url}
                                                target="_blank" 
                                                rel="noreferrer"
                                                download
                                                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                                                title="Download"
                                            >
                                                <Download className="w-4 h-4" />
                                            </a>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Files;
