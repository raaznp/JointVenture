
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { BookOpen, Award, Clock, Activity } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [courses, setCourses] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [stats, setStats] = useState([
        { name: 'Courses in Progress', value: '0', icon: BookOpen, color: 'bg-blue-500' },
        { name: 'Completed Courses', value: '0', icon: Activity, color: 'bg-green-500' },
        { name: 'Certificates Earned', value: '0', icon: Award, color: 'bg-yellow-500' },
        { name: 'Total Learning Hours', value: '0', icon: Clock, color: 'bg-purple-500' }, // Placeholder
        { name: 'Login Streak', value: '1 Day', icon: Activity, color: 'bg-orange-500' }, // Placeholder
        { name: 'Modules Completed', value: '0', icon: BookOpen, color: 'bg-indigo-500' },
    ]);
    const [currentCourse, setCurrentCourse] = useState(null);
    const [currentProgress, setCurrentProgress] = useState(0);

    const [achievements, setAchievements] = useState({
        courseComplete: false,
        quizMaster: false // Placeholder
    });

    useEffect(() => {
        const calculateDashboardData = async () => {
             const token = localStorage.getItem('token');
             const config = { headers: { Authorization: `Bearer ${token}` } };

             try {
                // 1. Fetch All Data Parallel
                const [coursesRes, profileRes, certRes] = await Promise.all([
                    axios.get('/api/courses', config),
                    axios.get('/api/users/profile', config),
                    axios.get('/api/certificates', config)
                ]);

                const allCourses = coursesRes.data;
                const userProfile = profileRes.data;
                const userCerts = certRes.data;
                const serverProgress = userProfile.courseProgress || [];

                let inProgressCount = 0;
                let completedCount = 0;
                let totalModulesCompleted = 0;
                let activeCourse = null;
                let highProgress = -1;

                // 2. Process Each Course
                allCourses.forEach(course => {
                    const serverEntry = serverProgress.find(cp => String(cp.courseId) === String(course._id));
                    const serverIds = serverEntry ? serverEntry.completedModules.map(String) : [];
                    
                    // Merge with LocalStorage
                    let localIds = [];
                    try {
                        const localKey = `course_progress_${course._id}`;
                        localIds = JSON.parse(localStorage.getItem(localKey) || '[]');
                    } catch (e) { }
                    
                    const uniqueIds = new Set([...serverIds, ...localIds]);
                    const count = uniqueIds.size;
                    const pct = course.modules.length > 0 ? Math.round((count / course.modules.length) * 100) : 0;

                    totalModulesCompleted += count;
                    
                    if (pct === 100) {
                        completedCount++;
                    } else if (pct > 0) {
                        inProgressCount++;
                    }

                    // Determine "Current Active Course" (Priority: In Progress > Completing > Specific Title)
                    if (pct > 0 && pct < 100) {
                        if (pct > highProgress) {
                            highProgress = pct;
                            activeCourse = course;
                        }
                    } else if (!activeCourse && pct === 100) {
                         // Fallback to a completed one if nothing is in progress
                         activeCourse = course;
                         highProgress = 100;
                    }
                });
                
                // Fallback if no progress at all
                if (!activeCourse && allCourses.length > 0) {
                    activeCourse = allCourses[0];
                    highProgress = 0;
                }

                // 3. Update State
                setCourses(allCourses);
                setCertificates(userCerts);
                setCurrentCourse(activeCourse);
                setCurrentProgress(Math.min(highProgress, 100));
                
                setStats([
                    { name: 'Courses in Progress', value: String(inProgressCount), icon: BookOpen, color: 'bg-blue-500' },
                    { name: 'Completed Courses', value: String(completedCount), icon: Activity, color: 'bg-green-500' },
                    { name: 'Certificates Earned', value: String(userCerts.length), icon: Award, color: 'bg-yellow-500' },
                    { name: 'Total Learning Hours', value: String((totalModulesCompleted * 0.5).toFixed(1)), icon: Clock, color: 'bg-purple-500' }, // Approx 30 mins per module
                    { name: 'Login Streak', value: '3 Days', icon: Activity, color: 'bg-orange-500' }, 
                    { name: 'Modules Completed', value: String(totalModulesCompleted), icon: BookOpen, color: 'bg-indigo-500' },
                ]);

                setAchievements(prev => ({
                    ...prev,
                    courseComplete: completedCount > 0
                }));

             } catch (error) {
                 console.error("Dashboard data fetch error", error);
             }
        };

        calculateDashboardData();
        document.title = 'Dashboard | Joint Venture Logistics';
    }, []);

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
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-blue-700">{currentCourse.title}</span>
                                        {currentProgress === 100 && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">Done</span>}
                                    </div>
                                    <span className="text-sm font-medium text-blue-700">{currentProgress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-3">
                                    <div 
                                        className={`h-2.5 rounded-full transition-all duration-1000 ${currentProgress === 100 ? 'bg-green-500' : 'bg-blue-600'}`} 
                                        style={{ width: `${currentProgress}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-end">
                                    <Link
                                        to={`/dashboard/course/${currentCourse._id}`}
                                        className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                                            currentProgress === 100 ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
                                        }`}
                                    >
                                        {currentProgress === 100 ? 'Review Course' : currentProgress > 0 ? 'Continue' : 'Start'}
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500">Loading your courses...</p>
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
                    
                    <div className={`flex-shrink-0 flex flex-col items-center p-4 rounded-lg border transition-colors ${
                        achievements.courseComplete 
                            ? 'bg-green-50 border-green-100' 
                            : 'bg-gray-50 border-gray-100 opacity-50'
                    }`}>
                        <div className={`p-2 rounded-full mb-2 ${
                            achievements.courseComplete ? 'bg-green-100' : 'bg-gray-200'
                        }`}>
                            <Award className={`h-6 w-6 ${
                                achievements.courseComplete ? 'text-green-600' : 'text-gray-400'
                            }`} />
                        </div>
                        <span className="text-sm font-medium text-gray-900">Course Complete</span>
                        <span className="text-xs text-gray-500">{achievements.courseComplete ? 'Unlocked!' : 'Locked'}</span>
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
