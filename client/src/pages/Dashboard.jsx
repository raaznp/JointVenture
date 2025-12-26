import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { BookOpen, Award, Clock, Activity } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCourses = async () => {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            try {
                const { data } = await axios.get('/api/courses', config);
                setCourses(data);
            } catch (error) {
                console.error("Error fetching courses", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
        document.title = 'Dashboard | Joint Venture Logistics';
    }, []);

    // Mock Data for Analytics
    const stats = [
        { name: 'Courses in Progress', value: '1', icon: BookOpen, color: 'bg-blue-500' },
        { name: 'Completed Courses', value: '0', icon: Activity, color: 'bg-green-500' },
        { name: 'Certificates Earned', value: '0', icon: Award, color: 'bg-yellow-500' },
        { name: 'Total Learning Hours', value: '2.5', icon: Clock, color: 'bg-purple-500' },
        { name: 'Login Streak', value: '3 Days', icon: Activity, color: 'bg-orange-500' },
        { name: 'Modules Completed', value: '5', icon: BookOpen, color: 'bg-indigo-500' },
    ];

    // Find the specific course for "Current Progress" demo
    const currentCourse = courses.find(c => c.title.includes('Warehouse Equipment')) || courses[0];

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
                {stats.map((item) => (
                    <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className={`flex-shrink-0 rounded-md p-3 ${item.color}`}>
                                    <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                                        <dd>
                                            <div className="text-lg font-medium text-gray-900">{item.value}</div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Recent Activity / Progress Section */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Current Progress</h3>
                    <div className="space-y-4">
                        {currentCourse ? (
                            <div>
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-blue-700">{currentCourse.title}</span>
                                    <span className="text-sm font-medium text-blue-700">15%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
                                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '15%' }}></div>
                                </div>
                                <div className="flex justify-end">
                                    <Link
                                        to={`/dashboard/course/${currentCourse._id}`}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Continue
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500">No courses in progress.</p>
                        )}
                    </div>
                </div>

                {/* Weekly Activity Chart (Mock) */}
                <div className="bg-white shadow rounded-lg p-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Weekly Learning Activity</h3>
                    <div className="flex items-end justify-between h-40 space-x-2">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
                            const height = [20, 45, 30, 60, 75, 10, 50][index]; // Mock heights
                            return (
                                <div key={day} className="flex flex-col items-center w-full">
                                    <div
                                        className="w-full bg-blue-200 rounded-t hover:bg-blue-300 transition-colors"
                                        style={{ height: `${height}%` }}
                                    ></div>
                                    <span className="text-xs text-gray-500 mt-1">{day}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Recent Achievements */}
            <div className="bg-white shadow rounded-lg p-6 mb-8">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Achievements</h3>
                <div className="flex space-x-4 overflow-x-auto pb-2">
                    <div className="flex-shrink-0 flex flex-col items-center p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                        <div className="p-2 bg-yellow-100 rounded-full mb-2">
                            <Award className="h-6 w-6 text-yellow-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">First Login</span>
                        <span className="text-xs text-gray-500">Dec 19, 2025</span>
                    </div>
                    <div className="flex-shrink-0 flex flex-col items-center p-4 bg-gray-50 rounded-lg border border-gray-100 opacity-50">
                        <div className="p-2 bg-gray-200 rounded-full mb-2">
                            <Award className="h-6 w-6 text-gray-400" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">Course Complete</span>
                        <span className="text-xs text-gray-500">Locked</span>
                    </div>
                    <div className="flex-shrink-0 flex flex-col items-center p-4 bg-gray-50 rounded-lg border border-gray-100 opacity-50">
                        <div className="p-2 bg-gray-200 rounded-full mb-2">
                            <Award className="h-6 w-6 text-gray-400" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">Quiz Master</span>
                        <span className="text-xs text-gray-500">Locked</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
