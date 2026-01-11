import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Pannellum } from 'pannellum-react';
import { ChevronLeft, ChevronRight, Menu, X, CheckCircle, Lock, Info } from 'lucide-react';

const ModuleView = () => {
    const { courseId, moduleId } = useParams();
    const navigate = useNavigate();
    const [module, setModule] = useState(null);
    const [course, setCourse] = useState(null); // Need full course for sidebar
    const [loading, setLoading] = useState(true);
    const [showSidebar, setShowSidebar] = useState(true);
    
    // Quiz State
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        const fetchCourseAndModule = async () => {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            try {
                // Fetch course to get all modules
                const { data } = await axios.get(`/api/courses/${courseId}`, config);
                setCourse(data);
                
                const foundModule = data.modules.find(m => m._id === moduleId);
                setModule(foundModule);
                
                // Reset quiz state when module changes
                setCurrentQuestionIndex(0);
                setShowResult(false);
                setAnswers({});
                setQuizSubmitted(false);

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCourseAndModule();
    }, [courseId, moduleId]);

    const handleOptionSelect = (questionIndex, optionIndex) => {
        setAnswers({
            ...answers,
            [questionIndex]: optionIndex
        });
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < module.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmitQuiz = async () => {
        let calculatedScore = 0;
        module.questions.forEach((q, index) => {
            if (answers[index] === q.correct) {
                calculatedScore++;
            }
        });
        const percentage = (calculatedScore / module.questions.length) * 100;
        setScore(percentage);
        setQuizSubmitted(true);
        setShowResult(true);

        // Generate Certificate if passed
        if (percentage >= 80) {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    await axios.post('/api/certificates', 
                        { courseId: course._id },
                        { headers: { Authorization: `Bearer ${token}` } }
                    );
                    // Could add a toast here, but the UI link appearing acts as confirmation
                }
            } catch (error) {
                console.error("Certificate generation failed", error);
            }
        }
    };

    // Navigation Logic
    const getCurrentModuleIndex = () => {
        if (!course || !module) return -1;
        return course.modules.findIndex(m => m._id === module._id);
    };

    const goToModule = (index) => {
        if (index >= 0 && index < course.modules.length) {
            const targetModule = course.modules[index];
            navigate(`/dashboard/course/${course._id}/module/${targetModule._id}`);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (!module || !course) return <div>Module not found</div>;

    const currentIndex = getCurrentModuleIndex();
    const progress = Math.round(((currentIndex + 1) / course.modules.length) * 100);
    const isFirstModule = currentIndex === 0;
    const isLastModule = currentIndex === course.modules.length - 1;

    // Quiz Helper
    const isLastQuestion = module.questions && currentQuestionIndex === module.questions.length - 1;
    const currentQuestion = module.questions ? module.questions[currentQuestionIndex] : null;

    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6 z-10">
                    <div className="flex items-center">
                        <Link to={`/dashboard/course/${courseId}`} className="mr-4 p-2 rounded-full hover:bg-gray-100 text-gray-500">
                           <ChevronLeft className="w-5 h-5" />
                        </Link>
                        <h1 className="text-xl font-bold text-gray-900 truncate">{module.title}</h1>
                    </div>
                    <button 
                        onClick={() => setShowSidebar(!showSidebar)}
                        className="p-2 rounded-md hover:bg-gray-100 text-gray-600 lg:hidden"
                    >
                        {showSidebar ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </header>

                <main className="flex-1 overflow-y-auto p-6 relative">
                    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden min-h-[500px]">
                        
                        {/* 360 Viewer */}
                        {module.type === '360' && (
                            <div className="relative h-[600px] w-full bg-black group">
                                <div className="absolute top-4 left-4 z-10 bg-black/60 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm pointer-events-none flex items-center">
                                    <Info className="w-4 h-4 mr-2" />
                                    <span>Drag to look around • Click hotspots</span>
                                </div>
                                <Pannellum
                                    width="100%"
                                    height="100%"
                                    image={module.content}
                                    pitch={10}
                                    yaw={180}
                                    hfov={110}
                                    autoLoad
                                    showZoomCtrl={false}
                                >
                                    {module.hotspots && module.hotspots.map((hs, index) => (
                                        <Pannellum.Hotspot
                                            key={index}
                                            type={hs.type}
                                            pitch={hs.pitch}
                                            yaw={hs.yaw}
                                            text={hs.text}
                                        />
                                    ))}
                                </Pannellum>
                            </div>
                        )}

                        {/* Quiz Viewer */}
                        {module.type === 'quiz' && (
                             <div className="p-8">
                                {!showResult ? (
                                    <>
                                        <div className="mb-8">
                                            <div className="flex justify-between items-center mb-4">
                                                <span className="text-sm font-medium text-gray-500">Question {currentQuestionIndex + 1} of {module.questions.length}</span>
                                                <span className="text-sm font-medium text-blue-600">{Math.round(((currentQuestionIndex + 1) / module.questions.length) * 100)}% Completed</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${((currentQuestionIndex + 1) / module.questions.length) * 100}%` }}></div>
                                            </div>
                                        </div>

                                        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-6">{currentQuestion.question}</h3>
                                            <div className="space-y-3">
                                                {currentQuestion.options.map((option, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => handleOptionSelect(currentQuestionIndex, index)}
                                                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                                                            answers[currentQuestionIndex] === index
                                                                ? 'border-blue-600 bg-blue-50 text-blue-700'
                                                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                                        }`}
                                                    >
                                                        <div className="flex items-center">
                                                            <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center mr-3 ${
                                                                answers[currentQuestionIndex] === index ? 'border-blue-600' : 'border-gray-300'
                                                            }`}>
                                                                {answers[currentQuestionIndex] === index && <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />}
                                                            </div>
                                                            {option}
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex justify-between mt-8">
                                            <button
                                                onClick={handlePreviousQuestion}
                                                disabled={currentQuestionIndex === 0}
                                                className={`px-6 py-2 rounded-lg font-medium ${
                                                    currentQuestionIndex === 0
                                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                                }`}
                                            >
                                                Previous
                                            </button>
                                            
                                            {isLastQuestion ? (
                                                <button
                                                    onClick={handleSubmitQuiz}
                                                    disabled={Object.keys(answers).length < module.questions.length}
                                                    className={`px-6 py-2 rounded-lg font-medium text-white ${
                                                        Object.keys(answers).length < module.questions.length
                                                            ? 'bg-blue-300 cursor-not-allowed'
                                                            : 'bg-blue-600 hover:bg-blue-700 shadow-sm'
                                                    }`}
                                                >
                                                    Submit Exam
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={handleNextQuestion}
                                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-sm"
                                                >
                                                    Next Question
                                                </button>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center py-12">
                                        <div className={`mx-auto h-24 w-24 flex items-center justify-center rounded-full mb-6 ${score >= 80 ? 'bg-green-100' : 'bg-red-100'}`}>
                                            {score >= 80 ? (
                                                <CheckCircle className="h-12 w-12 text-green-600" />
                                            ) : (
                                                <X className="h-12 w-12 text-red-600" />
                                            )}
                                        </div>
                                        <h2 className="text-3xl font-bold text-gray-900 mb-2">{score >= 80 ? 'Congratulations!' : 'Keep Practicing'}</h2>
                                        <p className="text-gray-500 mb-8">You scored {Math.round(score)}% on the final exam. (Pass mark: 80%)</p>
                                        
                                        {score >= 80 ? (
                                            <div className="space-y-4">
                                                <Link to="/certificates/cert_123" className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-md transition-colors">
                                                    View Certificate
                                                </Link>
                                            </div>
                                        ) : (
                                            <button onClick={() => { setShowResult(false); setCurrentQuestionIndex(0); setAnswers({}); }} className="px-8 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors">
                                                Retake Exam
                                            </button>
                                        )}
                                    </div>
                                )}
                             </div>
                        )}

                        {/* Standard Content (Video/Text) */}
                        {(module.type === 'video' || module.type === 'text') && (
                            <div className="p-8">
                                {module.type === 'video' && module.content.includes('embed') && (
                                    <div className="aspect-w-16 aspect-h-9 mb-6 rounded-lg overflow-hidden shadow-md">
                                        <iframe 
                                            src={module.content} 
                                            title={module.title}
                                            className="w-full h-[400px]" 
                                            frameBorder="0" 
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                )}
                                <div className="prose max-w-none">
                                     <h2 className="text-2xl font-bold text-gray-900 mb-4">{module.title}</h2>
                                     <p className="text-gray-600 mb-6">{module.description}</p>
                                     {module.type === 'text' && (
                                         <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                                             {module.content}
                                         </div>
                                     )}
                                </div>
                            </div>
                        )}
                        
                    </div>
                </main>

                {/* Bottom Navigation Bar */}
                <div className="bg-white border-t border-gray-200 p-4 flex justify-between items-center z-10">
                    <button
                        onClick={() => goToModule(currentIndex - 1)}
                        disabled={isFirstModule}
                        className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                            isFirstModule 
                                ? 'text-gray-300 cursor-not-allowed' 
                                : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                        }`}
                    >
                        <ChevronLeft className="w-5 h-5 mr-1" />
                        Previous Module
                    </button>

                    <span className="text-sm text-gray-500 font-medium hidden sm:block">
                        {currentIndex + 1} of {course.modules.length}
                    </span>

                    <button
                        onClick={() => goToModule(currentIndex + 1)}
                        disabled={isLastModule}
                        className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                            isLastModule 
                                ? 'text-gray-300 cursor-not-allowed' 
                                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                        }`}
                    >
                        Next Module
                        <ChevronRight className="w-5 h-5 ml-1" />
                    </button>
                </div>
            </div>

            {/* Collapsible Sidebar */}
            <div className={`bg-white border-l border-gray-200 transition-all duration-300 ease-in-out flex flex-col ${
                showSidebar ? 'w-80' : 'w-0'
            } overflow-hidden lg:relative absolute right-0 h-full z-20 shadow-xl lg:shadow-none`}>
                <div className="p-6 border-b border-gray-200 bg-gray-50">
                    <h3 className="font-bold text-gray-900 mb-2">Course Progress</h3>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                        <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                    <p className="text-xs text-gray-500 text-right">{progress}% Complete</p>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {course.modules.map((m, index) => {
                        const isActive = m._id === module._id;
                        const isCompleted = index < currentIndex; // Simple logic: everything before current is done
                        
                        return (
                            <button
                                key={m._id}
                                onClick={() => goToModule(index)}
                                className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors flex items-start gap-3 ${
                                    isActive ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                                }`}
                            >
                                <div className={`mt-0.5 ${
                                    isActive ? 'text-blue-600' : isCompleted ? 'text-green-500' : 'text-gray-400'
                                }`}>
                                    {isCompleted ? (
                                        <CheckCircle className="w-5 h-5" />
                                    ) : (
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                                            isActive ? 'border-blue-600 text-blue-600' : 'border-gray-300 text-gray-500'
                                        }`}>
                                            {index + 1}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <p className={`text-sm font-medium ${isActive ? 'text-blue-900' : 'text-gray-700'}`}>
                                        {m.title}
                                    </p>
                                    <span className="text-xs text-gray-500 capitalize">{m.type}</span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ModuleView;
