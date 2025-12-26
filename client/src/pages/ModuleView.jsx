import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Pannellum } from 'pannellum-react';

const ModuleView = () => {
    const { courseId, moduleId } = useParams();
    const [module, setModule] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Quiz State
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [quizSubmitted, setQuizSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        const fetchModule = async () => {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            try {
                const { data } = await axios.get(`/api/courses/${courseId}`, config);
                const foundModule = data.modules.find(m => m._id === moduleId);
                setModule(foundModule);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchModule();
    }, [courseId, moduleId]);

    const handleOptionSelect = (questionIndex, optionIndex) => {
        setAnswers({
            ...answers,
            [questionIndex]: optionIndex
        });
    };

    const handleNext = () => {
        if (currentQuestionIndex < module.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmit = () => {
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
    };

    if (loading) return <div>Loading...</div>;
    if (!module) return <div>Module not found</div>;

    const isLastQuestion = module.questions && currentQuestionIndex === module.questions.length - 1;
    const currentQuestion = module.questions ? module.questions[currentQuestionIndex] : null;

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <div>
                        <Link to={`/dashboard/course/${courseId}`} className="text-blue-600 hover:underline mb-2 inline-block">&larr; Back to Course</Link>
                        <h1 className="text-2xl font-bold text-gray-900">{module.title}</h1>
                    </div>
                </div>

                <div className="p-6">
                    {module.type === '360' ? (
                        <div className="h-[600px] w-full">
                            <Pannellum
                                width="100%"
                                height="100%"
                                image={module.content}
                                pitch={10}
                                yaw={180}
                                hfov={110}
                                autoLoad
                                onLoad={() => {
                                    console.log("panorama loaded");
                                }}
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
                    ) : module.type === 'quiz' ? (
                        <div className="max-w-2xl mx-auto">
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
                                            onClick={handlePrevious}
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
                                                onClick={handleSubmit}
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
                                                onClick={handleNext}
                                                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-sm"
                                            >
                                                Next Question
                                            </button>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-12">
                                    <div className={`mx-auto h-24 w-24 flex items-center justify-center rounded-full mb-6 ${score >= 70 ? 'bg-green-100' : 'bg-red-100'}`}>
                                        {score >= 70 ? (
                                            <svg className="h-12 w-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                                        ) : (
                                            <svg className="h-12 w-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                                        )}
                                    </div>
                                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{score >= 70 ? 'Congratulations!' : 'Keep Practicing'}</h2>
                                    <p className="text-gray-500 mb-8">You scored {score}% on the final exam. (Pass mark: 70%)</p>
                                    
                                    {score >= 70 ? (
                                        <div className="space-y-4">
                                            <Link to="/certificates/cert_123" className="inline-block px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-md transition-colors">
                                                View Certificate
                                            </Link>
                                            <p className="text-sm text-gray-400 mt-4">Your certificate has been generated.</p>
                                        </div>
                                    ) : (
                                        <button onClick={() => { setShowResult(false); setCurrentQuestionIndex(0); setAnswers({}); }} className="px-8 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors">
                                            Retake Exam
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="prose max-w-none">
                            {module.content.startsWith('http') ? (
                                <img src={module.content} alt={module.title} className="w-full h-96 object-cover rounded-lg mb-6" />
                            ) : null}
                            <div className="mt-4">
                                <h3 className="text-xl font-bold">Details & Uses</h3>
                                <p className="mt-2 text-gray-600">{module.description}</p>
                                {!module.content.startsWith('http') && <p className="mt-4">{module.content}</p>}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ModuleView;
