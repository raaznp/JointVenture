import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Calendar } from 'lucide-react';

const AdminBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBlogs();
        document.title = 'Blog Management | Joint Venture Logistics';
    }, []);

    const fetchBlogs = async () => {
        try {
            const { data } = await axios.get('/api/blogs');
            setBlogs(data);
        } catch (error) {
            console.error("Error fetching blogs", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteBlog = async (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            try {
                await axios.delete(`/api/blogs/${id}`, config);
                setBlogs(blogs.filter(b => b._id !== id));
            } catch (error) {
                console.error("Error deleting blog", error);
                alert("Failed to delete blog post");
            }
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">Blog Management</h2>
                <Link
                    to="/dashboard/blogs/new"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    Create New Post
                </Link>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <ul className="divide-y divide-gray-200">
                    {blogs.map((blog) => (
                        <li key={blog._id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                             <div className="flex items-center mb-4 sm:mb-0">
                                <img 
                                    src={blog.image} 
                                    alt={blog.title} 
                                    className="h-16 w-16 object-cover rounded-lg mr-4"
                                />
                                <div>
                                    <h3 className="text-lg font-medium text-blue-600">{blog.title}</h3>
                                    <div className="flex items-center text-sm text-gray-500 mt-1">
                                        <Calendar className="h-4 w-4 mr-1" />
                                        {blog.date}
                                        <span className="mx-2">•</span>
                                        <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                                            {blog.category}
                                        </span>
                                    </div>
                                </div>
                             </div>

                             <div className="flex space-x-3">
                                <Link
                                    to={`/dashboard/blogs/edit/${blog._id}`}
                                    className="text-indigo-600 hover:text-indigo-900 border border-indigo-200 px-3 py-1 rounded-md hover:bg-indigo-50 transition-colors flex items-center"
                                >
                                    <Edit className="h-4 w-4 mr-1" /> Edit
                                </Link>
                                <button
                                    onClick={() => deleteBlog(blog._id)}
                                    className="text-red-600 hover:text-red-900 border border-red-200 px-3 py-1 rounded-md hover:bg-red-50 transition-colors flex items-center"
                                >
                                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                                </button>
                             </div>
                        </li>
                    ))}
                    {blogs.length === 0 && (
                        <li className="px-4 py-8 text-center text-gray-500">
                            No blog posts found. Create one to get started!
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default AdminBlogs;
