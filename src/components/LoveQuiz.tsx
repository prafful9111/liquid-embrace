import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ChevronRight, Star, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Question {
    id: number;
    text: string;
    options: string[];
    correctAnswer: number; // Index of correct option
}

const QUESTIONS: Question[] = [
    {
        id: 1,
        text: "Hame konsi chocolate pasand hai",
        options: ["Dairy Milk", "KitKat", "5 Star", "Bournville"],
        correctAnswer: 2
    },
    {
        id: 2,
        text: "Aapko kaise pata chala ki mai aapko like karta hu?",
        options: ["Zone se Bahar aa jaate hai Texts..", "Consistent Messages", "FLirty Texts", "Mujhe nahi pata"],
        correctAnswer: 0
    },
    {
        id: 3,
        text: "Mujhe inme se kya 'zyada' pasand hai",
        options: ["To sing", "Playing Guitar", "Writing", "Siddhi Piddi"],
        correctAnswer: 3
    },
    {
        id: 4,
        text: "Which of the following message were sent by me? (Cheenu)",
        options: ["Aapko mann hai toh call kro wrna mat kro", "Babu abhi nai bolo", "Yeh kya logic hua", "Hmm babu ka glow ho gaya hai already"],
        correctAnswer: 1
    },
    {
        id: 5,
        text: "Which of the following message were sent by you? (Siddhi)",
        options: ["Lagta hai pyaar khatam", "Mujhe jhut bolna padega", "Kya Farak Padta hai", "Call pe awaaz nahi aa rahi thi kya"],
        correctAnswer: 0
    },
    {
        id: 6,
        text: "Aapka first birthday jo hamne wish kia tha wo konse year ka tha?",
        options: ["2020", "2021", "2022", "2023"],
        correctAnswer: 1
    },
    {
        id: 7,
        text: "Generally where am I going to kiss you first?",
        options: ["Neck", "Lips", "Cheeks", "Forehead"],
        correctAnswer: 3
    },
    {
        id: 8,
        text: "What is it that I adore most about you? ",
        options: ["Your Smile", "Your Eyes", "Your Voice", "Your Personality"],
        correctAnswer: 1
    },
    {
        id: 9,
        text: "Who said 'I Love You' first?",
        options: ["Cheenu", "Siddhi", "Both at same time", "Still waiting..."],
        correctAnswer: 0
    },
    {
        id: 10,
        text: "How much do I love you?",
        options: ["A lot", "Too much", "Infinity & Beyond", "More than pizza"],
        correctAnswer: 2
    }
];

const LoveQuiz = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isAnswering, setIsAnswering] = useState(false);

    const handleOptionClick = (optionIndex: number) => {
        if (isAnswering) return;

        setIsAnswering(true);
        setSelectedOption(optionIndex);

        const isCorrect = optionIndex === QUESTIONS[currentQuestionIndex].correctAnswer;

        if (isCorrect) {
            setScore(prev => prev + 1);
            triggerHeartConfetti();
        }

        // Wait before moving to next question
        setTimeout(() => {
            if (currentQuestionIndex < QUESTIONS.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setSelectedOption(null);
                setIsAnswering(false);
            } else {
                setShowResult(true);
                triggerFinalConfetti();
            }
        }, 1500);
    };

    const triggerHeartConfetti = () => {
        confetti({
            particleCount: 30,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#FFD700', '#FFA500'], // Yellow/Gold for correct answer
            shapes: ['heart']
        });
    };

    const triggerFinalConfetti = () => {
        const duration = 3000;
        const end = Date.now() + duration;

        const interval: any = setInterval(() => {
            if (Date.now() > end) {
                return clearInterval(interval);
            }

            confetti({
                startVelocity: 30,
                spread: 360,
                ticks: 60,
                origin: { x: Math.random(), y: Math.random() - 0.2 },
                colors: ['#FFD700', '#FF69B4', '#FF0000'],
                shapes: ['heart']
            });
        }, 200);
    };

    const getLoveLevel = () => {
        const percentage = (score / QUESTIONS.length) * 100;
        if (percentage === 100) return "wow babu❤️🔥";
        if (percentage >= 80) return "True Love! 💖";
        if (percentage >= 60) return "hmmm... 🥰";
        return "Itna kam?? 😔";
    };

    return (
        <section id="love-quiz" className="min-h-screen relative flex items-center justify-center py-20 px-4 bg-gradient-to-b from-secondary/20 to-background overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-10 left-10 text-yellow-400 opacity-20 animate-pulse">
                    <Heart className="w-20 h-20 fill-current" />
                </div>
                <div className="absolute bottom-10 right-10 text-yellow-400 opacity-20 animate-pulse delay-700">
                    <Heart className="w-24 h-24 fill-current" />
                </div>
            </div>

            <div className="container mx-auto max-w-2xl relative z-10">
                <AnimatePresence mode="wait">
                    {!showResult ? (
                        <motion.div
                            key="quiz-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 border border-white/50"
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center mb-8">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-muted-foreground">
                                        Question {currentQuestionIndex + 1}/{QUESTIONS.length}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1 text-yellow-500 font-bold">
                                    <Heart className="w-5 h-5 fill-current" />
                                    <span>{score}</span>
                                </div>
                            </div>

                            {/* Question */}
                            <motion.h2
                                key={`q-${currentQuestionIndex}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-2xl md:text-3xl font-display font-medium text-foreground mb-8 text-center"
                            >
                                {QUESTIONS[currentQuestionIndex].text}
                            </motion.h2>

                            {/* Options */}
                            <div className="grid gap-4">
                                {QUESTIONS[currentQuestionIndex].options.map((option, index) => {
                                    const isSelected = selectedOption === index;
                                    const isCorrect = index === QUESTIONS[currentQuestionIndex].correctAnswer;

                                    let buttonStyle = "bg-white hover:bg-gray-50 border-2 border-gray-100";
                                    if (isAnswering) {
                                        if (isSelected && isCorrect) buttonStyle = "bg-green-100 border-green-500 text-green-700";
                                        else if (isSelected && !isCorrect) buttonStyle = "bg-red-100 border-red-500 text-red-700";
                                        else if (!isSelected && isCorrect) buttonStyle = "bg-green-50 border-green-300 text-green-600 opacity-70";
                                        else buttonStyle = "opacity-50 border-gray-100";
                                    }

                                    return (
                                        <motion.button
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            onClick={() => handleOptionClick(index)}
                                            disabled={isAnswering}
                                            className={`w-full p-4 rounded-xl text-left font-medium transition-all duration-300 relative overflow-hidden group ${buttonStyle}`}
                                        >
                                            <span className="relative z-10 flex items-center justify-between">
                                                {option}
                                                {isAnswering && isSelected && (
                                                    <motion.span
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className="text-lg"
                                                    >
                                                        {isCorrect ? "✅" : "❌"}
                                                    </motion.span>
                                                )}
                                            </span>
                                        </motion.button>
                                    );
                                })}
                            </div>

                            {/* Progress bar */}
                            <div className="mt-8 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-primary"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result-card"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border-4 border-yellow-300 text-center relative overflow-hidden"
                        >
                            {/* Decorative stars */}
                            <Star className="absolute top-4 left-4 text-yellow-400 w-8 h-8 animate-spin-slow fill-current" />
                            <Star className="absolute bottom-4 right-4 text-yellow-400 w-8 h-8 animate-spin-slow fill-current delay-1000" />

                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring" }}
                                className="inline-block p-4 bg-yellow-100 rounded-full mb-6"
                            >
                                <Trophy className="w-12 h-12 text-yellow-600" />
                            </motion.div>

                            <h2 className="text-3xl font-display font-bold text-foreground mb-2">Hmmm Smart to app ho</h2>
                            <p className="text-muted-foreground mb-8"></p>

                            <div className="mb-8">
                                <div className="text-6xl font-black text-primary mb-2 flex items-center justify-center gap-2">
                                    {score} <Heart className="w-10 h-10 fill-red-500 text-red-500" />
                                </div>
                                <p className="text-2xl font-medium text-yellow-600 font-serif">
                                    "{getLoveLevel()}"
                                </p>
                            </div>

                            <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100 mb-8">
                                <p className="text-sm text-yellow-800 italic">
                                    "No matter the score, you are always the winner 💛"
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    setScore(0);
                                    setCurrentQuestionIndex(0);
                                    setShowResult(false);
                                }}
                                className="px-8 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl active:scale-95"
                            >
                                Play Again
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default LoveQuiz;
