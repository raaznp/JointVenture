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
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Title
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Author
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Category
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {blogs.map((blog) => (
                            <tr key={blog._id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img className="h-10 w-10 rounded-lg object-cover" src={blog.image} alt="" />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900 truncate max-w-xs" title={blog.title}>{blog.title}</div>
                                            <div className="text-xs text-gray-500 truncate max-w-xs">{blog.slug}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-500">
                                            {blog.author?.fullName?.charAt(0) || 'U'}
                                        </div>
                                        <div className="ml-2 text-sm text-gray-900">{blog.author?.fullName || 'Unknown'}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="text-sm text-gray-500 italic">
                                        {Array.isArray(blog.categories) ? blog.categories.join(', ') : blog.category || 'Uncategorized'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        blog.status === 'published' ? 'bg-green-100 text-green-800' : 
                                        blog.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                        'bg-gray-100 text-gray-800'
                                    }`}>
                                        {blog.status || 'draft'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(blog.createdAt || blog.date).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex justify-end space-x-3">
                                        <Link
                                            to={`/dashboard/blogs/edit/${blog._id}`}
                                            className="text-indigo-600 hover:text-indigo-900"
                                            title="Edit"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Link>
                                        <button
                                            onClick={() => deleteBlog(blog._id)}
                                            className="text-red-600 hover:text-red-900"
                                            title="Delete"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {blogs.length === 0 && (
                    <div className="px-6 py-12 text-center text-gray-500">
                        No blog posts found. Create one to get started!
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminBlogs;
