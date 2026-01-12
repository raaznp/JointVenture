import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Courses = () => {
    const { user } = useContext(AuthContext);
    const [courses, setCourses] = useState([]);
    const [userProgress, setUserProgress] = useState([]);

    useEffect(() => {
        document.title = 'Courses | Joint Venture Logistics';
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const config = { headers: { Authorization: `Bearer ${token}` } };
            
            try {
                // Parallel Fetch
                const [coursesRes, userRes] = await Promise.all([
                    axios.get('/api/courses', config),
                    axios.get('/api/users/profile', config)
                ]);
                
                setCourses(coursesRes.data);
                setUserProgress(userRes.data.courseProgress || []);
            } catch (error) {
                console.error("Failed to load courses", error);
            }
        };
        fetchData();
    }, []);

    const calculateProgress = (courseId, totalModules) => {
        if (totalModules === 0) return 0;

        // 1. Server Progress
        const serverEntry = userProgress.find(cp => String(cp.courseId) === String(courseId));
        const serverIds = serverEntry ? serverEntry.completedModules.map(String) : [];

        // 2. Local Progress
        let localIds = [];
        try {
            const localKey = `course_progress_${courseId}`;
            localIds = JSON.parse(localStorage.getItem(localKey) || '[]');
        } catch (e) { }

        // 3. Merge
        const uniqueIds = new Set([...serverIds, ...localIds]);
        
        return Math.min(Math.round((uniqueIds.size / totalModules) * 100), 100);
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Available Courses</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map((course) => {
                    const progress = calculateProgress(course._id, course.modules.length);
                    
                    return (
                        <div key={course._id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100">
                            <div className="relative h-48 flex-shrink-0 bg-gray-200">
                                {course.thumbnail ? (
                                    <img 
                                        className="w-full h-full object-cover rounded-t-xl" 
                                        src={course.thumbnail} 
                                        alt={course.title} 
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <span className="text-sm">No Image</span>
                                    </div>
                                )}
                                <div className="absolute inset-x-0 bottom-0 h-1 bg-gray-100">
                                    <div
                                        className={`h-full transition-all duration-1000 ${progress === 100 ? 'bg-green-500' : 'bg-blue-600'}`}
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            </div>
                            
                            <div className="p-5 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-tight flex-1 pr-2">
                                        <Link to={`/dashboard/course/${course._id}`} className="hover:text-blue-600 transition-colors">
                                            {course.title}
                                        </Link>
                                    </h3>
                                    {progress === 100 && (
                                        <span className="flex-shrink-0 px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">
                                            Done
                                        </span>
                                    )}
                                </div>

                                <p className="text-sm text-gray-600 line-clamp-3 mb-6 flex-1">
                                    {course.description}
                                </p>

                                <div className="mt-auto pt-4 border-t border-gray-100">
                                    <Link 
                                        to={course.modules.length > 0 ? `/dashboard/course/${course._id}` : '#'}
                                        onClick={(e) => course.modules.length === 0 && e.preventDefault()}
                                        className={`block w-full text-center py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow ${
                                            course.modules.length === 0 
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : progress === 100 
                                                    ? 'bg-green-600 text-white hover:bg-green-700'
                                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                        }`}
                                    >
                                        {course.modules.length === 0 ? 'Coming Soon' : progress === 100 ? 'Review Course' : progress > 0 ? 'Continue' : 'Start Course'}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Courses;
