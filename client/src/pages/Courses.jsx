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
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
                {courses.map((course) => {
                    const progress = calculateProgress(course._id, course.modules.length);
                    const isComplete = progress === 100;
                    const hasModules = course.modules.length > 0;
                    
                    return (
                        <div key={course._id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 flex flex-col h-full">
                            {/* Image Header */}
                            <div className="relative h-48 flex-shrink-0 bg-gray-100 rounded-t-xl overflow-hidden">
                                {course.thumbnail ? (
                                    <img 
                                        className="w-full h-full object-cover" 
                                        src={course.thumbnail} 
                                        alt={course.title} 
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <span className="text-sm">No Image</span>
                                    </div>
                                )}
                                {/* Progress Overlay Line */}
                                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-200">
                                    <div
                                        className={`h-full ${isComplete ? 'bg-green-500' : 'bg-blue-600'}`}
                                        style={{ width: `${progress}%` }}
                                    ></div>
                                </div>
                            </div>
                            
                            {/* Content Body */}
                            <div className="p-5 flex flex-col flex-1">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-lg font-bold text-gray-900 leading-snug">
                                        <Link to={`/dashboard/course/${course._id}`} className="hover:text-blue-600 transition-colors line-clamp-2">
                                            {course.title}
                                        </Link>
                                    </h3>
                                    {isComplete && (
                                        <span className="ml-2 flex-shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                            Done
                                        </span>
                                    )}
                                </div>

                                <p className="text-sm text-gray-600 line-clamp-4 flex-1 mb-6">
                                    {course.description}
                                </p>

                                {/* Sticky Footer Button */}
                                <div className="mt-auto pt-4 border-t border-gray-100">
                                    <Link 
                                        to={hasModules ? `/dashboard/course/${course._id}` : '#'}
                                        onClick={(e) => !hasModules && e.preventDefault()}
                                        className={`block w-full text-center py-2.5 rounded-lg text-sm font-semibold transition-colors shadow-sm ${
                                            !hasModules
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                                                : isComplete
                                                    ? 'bg-green-600 text-white hover:bg-green-700 border border-transparent'
                                                    : 'bg-blue-600 text-white hover:bg-blue-700 border border-transparent'
                                        }`}
                                    >
                                        {!hasModules ? 'Coming Soon' : isComplete ? 'Review Course' : progress > 0 ? 'Continue' : 'Start Course'}
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
