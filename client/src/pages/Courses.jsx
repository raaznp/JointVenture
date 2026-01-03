import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Courses = () => {
    const { user } = useContext(AuthContext);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const { data } = await axios.get('/api/courses', config);
            setCourses(data);
        };
        fetchCourses();
    }, []);

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Available Courses</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => (
                    <div key={course._id} className="bg-white overflow-hidden shadow rounded-lg">
                        <Link to={`/dashboard/course/${course._id}`}>
                            <img className="h-48 w-full object-cover cursor-pointer hover:opacity-90 transition-opacity" src={course.thumbnail} alt={course.title} />
                        </Link>
                        <div className="px-4 py-5 sm:p-6">
                            <Link to={`/dashboard/course/${course._id}`}>
                                <h3 className="text-lg leading-6 font-medium text-gray-900 hover:text-blue-600 transition-colors cursor-pointer">{course.title}</h3>
                            </Link>

                            {/* Progress Bar */}
                            <div className="mt-2 mb-2">
                                <div className="flex justify-between mb-1">
                                    <span className="text-xs font-medium text-gray-500">Progress</span>
                                    <span className="text-xs font-medium text-gray-500">{course.modules.length > 0 ? '15%' : '0%'}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                    <div
                                        className="bg-blue-600 h-1.5 rounded-full"
                                        style={{ width: course.modules.length > 0 ? '15%' : '0%' }}
                                    ></div>
                                </div>
                            </div>

                            <p className="mt-1 max-w-2xl text-sm text-gray-500">{course.description}</p>
                            <div className="mt-4">
                                {course.modules.length > 0 ? (
                                    <Link to={`/dashboard/course/${course._id}`} className="text-blue-600 hover:text-blue-900">View Course</Link>
                                ) : (
                                    <span className="text-gray-400 cursor-not-allowed">Coming Soon</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Courses;
