import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const CourseView = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            try {
                const { data } = await axios.get(`/api/courses/${id}`, config);
                setCourse(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCourse();
    }, [id]);

    if (!course) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                    <Link to="/dashboard/courses" className="text-blue-600 hover:underline mb-4 inline-block">&larr; Back to Courses</Link>
                    <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
                    <p className="mt-2 text-gray-600">{course.description}</p>
                </div>
                <div className="border-t border-gray-200">
                    <ul className="divide-y divide-gray-200">
                        {course.modules.map((module) => (
                            <li key={module._id} className="p-6 hover:bg-gray-50">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">{module.title}</h3>
                                        <p className="text-sm text-gray-500">{module.description}</p>
                                    </div>
                                    <div>
                                        {module.isLocked ? (
                                            <span className="px-3 py-1 text-xs font-semibold text-gray-500 bg-gray-200 rounded-full">Locked</span>
                                        ) : (
                                            <Link
                                                to={`/dashboard/course/${course._id}/module/${module._id}`}
                                                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                                            >
                                                Start Module
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CourseView;
