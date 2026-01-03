import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { Trash2, Shield, User, Edit, Plus, X } from 'lucide-react';

const Users = () => {
    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
    const [currentUser, setCurrentUser] = useState({ name: '', email: '', password: '', role: 'user' });

    useEffect(() => {
        fetchUsers();
        document.title = 'User Management | Joint Venture Logistics';
    }, []);

    const fetchUsers = async () => {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        try {
            const { data } = await axios.get('/api/users', config);
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users", error);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            try {
                await axios.delete(`/api/users/${id}`, config);
                setUsers(users.filter(u => u._id !== id));
            } catch (error) {
                console.error("Error deleting user", error);
            }
        }
    };

    const openAddModal = () => {
        setModalMode('add');
        setCurrentUser({ name: '', email: '', password: '', role: 'user' });
        setIsModalOpen(true);
    };

    const openEditModal = (userToEdit) => {
        setModalMode('edit');
        setCurrentUser({ ...userToEdit, password: '' }); // Don't show current password
        setIsModalOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        try {
            if (modalMode === 'add') {
                const { data } = await axios.post('/api/users', currentUser, config);
                setUsers([...users, data]);
            } else {
                const { data } = await axios.put(`/api/users/${currentUser._id}`, currentUser, config);
                setUsers(users.map(u => u._id === currentUser._id ? data : u));
            }
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error saving user", error);
            alert(error.response?.data?.message || 'Error saving user');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">User Management</h2>
                <button
                    onClick={openAddModal}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    Add User
                </button>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <ul className="divide-y divide-gray-200">
                    {users.map((u) => (
                        <li key={u._id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                    {u.role === 'admin' ? <Shield className="h-6 w-6 text-indigo-600" /> : <User className="h-6 w-6 text-gray-500" />}
                                </div>
                                <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{u.name}</div>
                                    <div className="text-sm text-gray-500">{u.email}</div>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${u.role === 'admin' ? 'bg-indigo-100 text-indigo-800' : 'bg-green-100 text-green-800'}`}>
                                    {u.role}
                                </span>
                                {user._id !== u._id && (
                                    <>
                                        <button
                                            onClick={() => openEditModal(u)}
                                            className="text-blue-600 hover:text-blue-900"
                                            title="Edit"
                                        >
                                            <Edit className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => deleteUser(u._id)}
                                            className="text-red-600 hover:text-red-900"
                                            title="Delete"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900">{modalMode === 'add' ? 'Add New User' : 'Edit User'}</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                                <X className="h-6 w-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={currentUser.name}
                                    onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    required
                                    value={currentUser.email}
                                    onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    {modalMode === 'add' ? 'Password' : 'New Password (leave blank to keep current)'}
                                </label>
                                <input
                                    type="password"
                                    required={modalMode === 'add'}
                                    value={currentUser.password}
                                    onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Role</label>
                                <select
                                    value={currentUser.role}
                                    onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value="user">User</option>
                                    <option value="staff">Staff</option>
                                    <option value="editor">Editor</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div className="mt-5 sm:mt-6">
                                <button
                                    type="submit"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                >
                                    {modalMode === 'add' ? 'Create User' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;
