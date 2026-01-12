import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, Play, RotateCcw } from 'lucide-react';

const CourseView = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [completedModules, setCompletedModules] = useState([]);
    const [certificateId, setCertificateId] = useState(null);

    useEffect(() => {
        const fetchCourseAndProgress = async () => {
            const token = localStorage.getItem('token');
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };
            try {
                // 1. Fetch Course
                const { data } = await axios.get(`/api/courses/${id}`, config);
                setCourse(data);

                // 2. Fetch Progress (Robust Strategy)
                // A. Server
                let serverCompletedIds = [];
                try {
                const userRes = await axios.get('/api/users/profile', config);
                const userProgress = userRes.data.courseProgress?.find(cp => String(cp.courseId) === String(id));
                     if (userProgress) {
                        serverCompletedIds = userProgress.completedModules.map(i => String(i));
                     }
                } catch (e) {
                     console.warn("Profile fetch failed", e);
                }

                // B. LocalStorage
                let localData = [];
                try {
                    const localKey = `course_progress_${id}`;
                    localData = JSON.parse(localStorage.getItem(localKey) || '[]');
                } catch (e) { console.error(e); }

                // C. Merge
                const mergedIds = [...new Set([...serverCompletedIds, ...localData])];
                setCompletedModules(mergedIds.map(i => String(i)));

            } catch (error) {
                console.error(error);
            }
        };
        fetchCourseAndProgress();
    }, [id]);

    const progress = course ? Math.round((completedModules.length / course.modules.length) * 100) : 0;

    // Fetch Certificate if 100%
    useEffect(() => {
        if (progress === 100 && id) {
            const fetchCert = async () => {
                 try {
                     const token = localStorage.getItem('token');
                     const { data } = await axios.post('/api/certificates', { courseId: id }, {
                         headers: { Authorization: `Bearer ${token}` }
                     });
                     setCertificateId(data._id);
                 } catch (e) { console.error("Cert fetch failed", e); }
            };
            fetchCert();
        }
    }, [progress, id]);

    if (!course) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
                <div className="p-8 border-b border-gray-100">
                    <Link to="/dashboard/courses" className="text-gray-500 hover:text-blue-600 mb-6 inline-block font-medium transition-colors">&larr; Back to Courses</Link>
                    
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                        <h1 className="text-3xl font-extrabold text-gray-900">{course.title}</h1>
                        <div className="flex items-center gap-3">
                            <span className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                                {course.modules.length} Modules
                            </span>
                            {progress === 100 && certificateId && (
                                <Link 
                                    to={`/certificates/${certificateId}`}
                                    className="px-4 py-1.5 bg-green-600 text-white rounded-full text-sm font-semibold hover:bg-green-700 shadow-sm flex items-center gap-2"
                                >
                                    <CheckCircle className="w-4 h-4" />
                                    View Certificate
                                </Link>
                            )}
                        </div>
                    </div>

                    <p className="text-gray-600 text-lg leading-relaxed mb-8">{course.description}</p>
                    
                    {/* Progress Bar */}
                    <div className="bg-gray-100 rounded-xl p-6">
                        <div className="flex justify-between items-end mb-2">
                             <span className="font-bold text-gray-700">Course Progress</span>
                             <span className={`font-bold ${progress === 100 ? 'text-green-600' : 'text-blue-600'}`}>
                                {progress === 100 ? '100% Completed' : `${progress}% Completed`}
                             </span>
                        </div>
                        <div className="w-full bg-gray-300 rounded-full h-3">
                            <div 
                                className={`h-3 rounded-full transition-all duration-500 ease-out ${progress === 100 ? 'bg-green-500' : 'bg-blue-600'}`} 
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                <div className="bg-white">
                    <ul className="divide-y divide-gray-100">
                        {course.modules.map((module, index) => {
                            const isCompleted = completedModules.includes(String(module._id));
                            
                            return (
                                <li key={module._id} className={`p-6 hover:bg-gray-50 transition-colors ${isCompleted ? 'bg-blue-50/30' : ''}`}>
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            {/* Thumbnail */}
                                            <div className="flex-shrink-0 w-32 h-20 bg-gray-200 rounded-lg overflow-hidden shadow-sm border border-gray-100">
                                                {module.type === '360' ? (
                                                    <img src={module.content} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                                                        <span className="text-xs font-bold uppercase tracking-wider">{module.type}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                                                isCompleted ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'
                                            }`}>
                                                {isCompleted ? <CheckCircle className="w-5 h-5" /> : index + 1}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <h3 className={`text-lg font-bold ${isCompleted ? 'text-gray-900' : 'text-gray-800'}`}>
                                                        {module.title}
                                                    </h3>
                                                    {isCompleted && (
                                                        <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded font-medium">
                                                            Completed
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{module.description}</p>
                                            </div>
                                        </div>
                                        
                                        <div className="flex-shrink-0">
                                            {module.isLocked ? (
                                                <span className="px-4 py-2 text-sm font-semibold text-gray-400 bg-gray-100 rounded-lg cursor-not-allowed">Locked</span>
                                            ) : (
                                                <Link
                                                    to={`/dashboard/course/${course._id}/module/${module._id}`}
                                                    className={`inline-flex items-center px-4 py-2 text-sm font-bold rounded-lg transition-all shadow-sm ${
                                                        isCompleted 
                                                            ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:text-blue-600' 
                                                            : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md'
                                                    }`}
                                                >
                                                    {isCompleted ? (
                                                        <>
                                                            <RotateCcw className="w-4 h-4 mr-2" />
                                                            Revisit
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Play className="w-4 h-4 mr-2" />
                                                            Start
                                                        </>
                                                    )}
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CourseView;
