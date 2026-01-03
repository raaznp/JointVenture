import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { X, Upload, Check, Trash2, Search, Image as ImageIcon, Plus, Copy } from 'lucide-react';
import ConfirmationModal from './common/ConfirmationModal';
import { useToast } from '../context/ToastContext';

const MediaLibraryModal = ({ isOpen, onClose, onSelect, allowMultiple = false }) => {
    const [media, setMedia] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');
    const { success, error } = useToast();
    const [imageToDelete, setImageToDelete] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    
    // Details Form State
    const [details, setDetails] = useState({
        title: '',
        altText: '',
        caption: ''
    });

    const token = localStorage.getItem('token');
    const uploaderRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            fetchMedia();
        }
    }, [isOpen, page, search]);

    useEffect(() => {
        if (selectedImage) {
            setDetails({
                title: selectedImage.title || '',
                altText: selectedImage.altText || '',
                caption: selectedImage.caption || ''
            });
        }
    }, [selectedImage]);

    const fetchMedia = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`/api/media?page=${page}&limit=20&search=${search}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = res.data;
            if (data.media) {
                setMedia(data.media);
                setTotalPages(data.totalPages);
            } else if (Array.isArray(data)) {
                 setMedia(data);
            }
        } catch (error) {
            console.error('Failed to fetch media:', error);
        } finally {
            setLoading(false);
        }
    };

    const processUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            setLoading(true);
            const res = await axios.post('/api/media/upload', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            const newImage = res.data;
            setMedia(prev => [newImage, ...prev]);
            setSelectedImage(newImage); 
            success('Image uploaded successfully');
        } catch (err) {
            console.error('Upload error:', err);
            error('Upload failed');
        } finally {
            setLoading(false);
        }
    };

    const handleFileInput = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            processUpload(files[0]);
        }
        if (uploaderRef.current) uploaderRef.current.value = '';
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        
        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            if (files[0].type.startsWith('image/')) {
                processUpload(files[0]);
            } else {
                error('Only image files are allowed');
            }
        }
    };

    const handleUpdateDetails = async () => {
        if (!selectedImage) return;

        try {
            const res = await axios.put(`/api/media/${selectedImage._id}`, details, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const updated = res.data;
            setMedia(media.map(m => m._id === updated._id ? updated : m));
            setSelectedImage(updated);
        } catch (error) {
            console.error('Update error:', error);
        }
    };

    const handleDeleteClick = () => {
        if (!selectedImage) return;
        setImageToDelete(selectedImage);
    };

    const handleConfirmDelete = async () => {
        if (!imageToDelete) return;

        try {
            await axios.delete(`/api/media/${imageToDelete._id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setMedia(media.filter(m => m._id !== imageToDelete._id));
            setSelectedImage(null);
            success('Image deleted');
        } catch (err) {
            console.error('Delete error:', err);
            error('Delete error');
        } finally {
            setImageToDelete(null);
        }
    };

    const handleSelect = () => {
        if (!selectedImage) return;
        onSelect(selectedImage);
        onClose();
    };

    const handleCopyUrl = () => {
        if (!selectedImage) return;
        navigator.clipboard.writeText(selectedImage.url);
        success('URL copied to clipboard');
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[50] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div 
                className="bg-white w-full max-w-6xl h-[90vh] rounded-xl shadow-2xl flex flex-col overflow-hidden relative"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                {/* Drag Overlay */}
                {isDragging && (
                    <div className="absolute inset-0 z-[60] bg-blue-500/10 border-4 border-dashed border-blue-500 flex items-center justify-center pointer-events-none">
                        <div className="bg-white p-6 rounded-xl shadow-xl flex flex-col items-center animate-bounce">
                            <Upload className="w-12 h-12 text-blue-500 mb-2" />
                            <span className="text-xl font-bold text-blue-500">Drop file to upload</span>
                        </div>
                    </div>
                )}

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
                    <div className="flex items-center gap-4">
                        <h2 className="text-xl font-bold text-gray-900">Media Library</h2>
                        <button 
                            onClick={() => uploaderRef.current?.click()}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 text-sm font-medium"
                        >
                            <Plus className="w-4 h-4" /> Add New
                        </button>
                        <input 
                            type="file" 
                            ref={uploaderRef} 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleFileInput}
                        />
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <X className="w-6 h-6 text-gray-500" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-hidden flex">
                    {/* Grid */}
                    <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
                        {media.length === 0 && !loading ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                <ImageIcon className="w-16 h-16 mb-4 opacity-20" />
                                <p className="text-lg font-medium text-gray-500">No media found</p>
                                <p className="text-sm">Upload files to get started</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
                                {media.map((item) => (
                                    <div
                                        key={item._id}
                                        onClick={() => setSelectedImage(item)}
                                        className={`group relative aspect-square rounded-lg overflow-hidden cursor-pointer bg-gray-100 transition-all ${
                                            selectedImage?._id === item._id 
                                            ? 'ring-4 ring-blue-500 ring-inset' 
                                            : 'hover:opacity-90'
                                        }`}
                                    >
                                        <img
                                            src={item.url}
                                            alt={item.altText}
                                            className="w-full h-full object-cover"
                                        />
                                        {selectedImage?._id === item._id && (
                                            <div className="absolute top-2 right-2 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-sm">
                                                <Check className="w-4 h-4" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar Details */}
                    <div className="w-80 bg-white border-l border-gray-200 flex flex-col h-full shadow-xl z-10">
                        {selectedImage ? (
                            <div className="flex-1 flex flex-col overflow-hidden">
                                <div className="p-6 border-b border-gray-200">
                                     <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                                        Attachment Details
                                    </h3>
                                    <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 mb-4 border border-gray-200 flex items-center justify-center">
                                        <img 
                                            src={selectedImage.url} 
                                            alt={selectedImage.altText} 
                                            className="max-w-full max-h-40 object-contain"
                                        />
                                    </div>
                                    <div className="text-xs text-gray-500 space-y-1">
                                        <p className="font-medium text-gray-900 truncate" title={selectedImage.filename}>
                                            {selectedImage.filename}
                                        </p>
                                        <p>{new Date(selectedImage.createdAt).toLocaleDateString()}</p>
                                        <p>{(selectedImage.size / 1024).toFixed(1)} KB</p>
                                        <button 
                                            onClick={handleDeleteClick}
                                            className="text-red-600 hover:text-red-700 hover:underline mt-2 flex items-center gap-1"
                                        >
                                            <Trash2 className="w-3 h-3" /> Delete Permanently
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6 overflow-y-auto space-y-4 flex-1">
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-gray-500">Title</label>
                                        <input
                                            type="text"
                                            value={details.title}
                                            onChange={(e) => setDetails({ ...details, title: e.target.value })}
                                            onBlur={handleUpdateDetails}
                                            className="w-full px-3 py-1.5 text-sm bg-gray-50 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-gray-500">Alt Text</label>
                                        <input
                                            type="text"
                                            value={details.altText}
                                            onChange={(e) => setDetails({ ...details, altText: e.target.value })}
                                            onBlur={handleUpdateDetails}
                                            className="w-full px-3 py-1.5 text-sm bg-gray-50 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none"
                                        />
                                        <p className="text-[10px] text-gray-400">Describe the purpose of the image.</p>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-gray-500">Caption</label>
                                        <textarea
                                            value={details.caption}
                                            onChange={(e) => setDetails({ ...details, caption: e.target.value })}
                                            onBlur={handleUpdateDetails}
                                            rows={3}
                                            className="w-full px-3 py-1.5 text-sm bg-gray-50 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium text-gray-500">File URL</label>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={selectedImage.url}
                                                readOnly
                                                className="w-full px-3 py-1.5 text-sm bg-gray-100 border border-gray-300 rounded-md text-gray-600 focus:outline-none cursor-text"
                                                onClick={(e) => e.target.select()}
                                            />
                                            <button
                                                onClick={handleCopyUrl}
                                                className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-md transition-colors"
                                                title="Copy URL"
                                            >
                                                <Copy className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="p-6 border-t border-gray-200 bg-gray-50">
                                    <button
                                        onClick={handleSelect}
                                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-bold text-sm shadow-md"
                                    >
                                        Set Featured Image
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 text-sm p-8 text-center bg-gray-50/50">
                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                     <ImageIcon className="w-8 h-8 opacity-40" />
                                </div>
                                <h3 className="font-medium text-gray-900 mb-1">No image selected</h3>
                                <p>Select an image to edit details or set it as featured.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ConfirmationModal
                isOpen={!!imageToDelete}
                onClose={() => setImageToDelete(null)}
                onConfirm={handleConfirmDelete}
                title="Delete Image"
                message="Are you sure you want to delete this image? This cannot be undone."
                confirmText="Delete Permanently"
                isDestructive={true}
            />
        </div>
    );
};

export default MediaLibraryModal;
