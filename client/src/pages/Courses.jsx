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
                        <div key={course._id} className="bg-white overflow-hidden shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                            <Link to={`/dashboard/course/${course._id}`} className="block relative group overflow-hidden h-48 flex-shrink-0">
                                <img 
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                                    src={course.thumbnail} 
                                    alt={course.title} 
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                            </Link>
                            <div className="px-5 py-5 flex-1 flex flex-col">
                                <Link to={`/dashboard/course/${course._id}`}>
                                    <h3 className="text-lg font-bold text-gray-900 hover:text-blue-600 transition-colors mb-2 line-clamp-1">{course.title}</h3>
                                </Link>

                                {/* Progress Bar */}
                                <div className="mt-3 mb-4">
                                    <div className="flex justify-between mb-1.5">
                                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Progress</span>
                                        <span className={`text-xs font-bold ${progress === 100 ? 'text-green-600' : 'text-blue-600'}`}>{progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full transition-all duration-1000 ease-out ${
                                                progress === 100 ? 'bg-green-500' : 'bg-blue-600'
                                            }`}
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-500 line-clamp-3 mb-6 flex-1">{course.description}</p>
                                
                                <div className="mt-auto">
                                    {course.modules.length > 0 ? (
                                        <Link 
                                            to={`/dashboard/course/${course._id}`} 
                                            className={`block w-full text-center py-2.5 rounded-lg text-sm font-semibold transition-colors ${
                                                progress === 100 
                                                    ? 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
                                                    : 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                                            }`}
                                        >
                                            {progress === 100 ? 'Review Course' : progress > 0 ? 'Continue Course' : 'Start Course'}
                                        </Link>
                                    ) : (
                                        <span className="block w-full text-center py-2.5 bg-gray-50 text-gray-400 rounded-lg text-sm font-medium border border-gray-200 cursor-not-allowed">Coming Soon</span>
                                    )}
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
