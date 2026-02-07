import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Key } from 'lucide-react';
import confetti from 'canvas-confetti';
import LoveMessageBg from '../assets/love-message-bg.mp4';

const SECRET_ANSWER = "babu"; // Normalized to lowercase
const SECRET_QUESTION = "What is my nickname for you?";

const FONTS = [
    "'Playfair Display', serif",
    "'Dancing Script', cursive",
    "'Pacifico', cursive",
    "'Montserrat', sans-serif",
    "'Great Vibes', cursive",
    "'Cinzel', serif",
    "'Raleway', sans-serif",
    "'Amatic SC', cursive",
    "'Abril Fatface', cursive",
    "'Quicksand', sans-serif",
    "'Shadows Into Light', cursive",
    "'Sacramento', cursive",
    "'Orbitron', sans-serif",
    "'Comfortaa', cursive",
    "'Gloria Hallelujah', cursive"
];

const LoveLetters = () => {
    const [isLocked, setIsLocked] = useState(true);
    const [inputAnswer, setInputAnswer] = useState("");
    const [error, setError] = useState(false);
    const [currentFontIndex, setCurrentFontIndex] = useState(0);

    // Font shifting animation effect
    useEffect(() => {
        if (!isLocked) {
            const interval = setInterval(() => {
                setCurrentFontIndex((prev) => (prev + 1) % FONTS.length);
            }, 75); // 75ms for more shifts
            return () => clearInterval(interval);
        }
    }, [isLocked]);

    const handleUnlock = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputAnswer.toLowerCase().trim() === SECRET_ANSWER) {
            setIsLocked(false);
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
        } else {
            setError(true);
            setTimeout(() => setError(false), 500);
        }
    };

    return (
        <section className="min-h-screen h-[100dvh] relative overflow-hidden bg-black flex items-center justify-center">
            {/* Background Video */}
            <AnimatePresence>
                {!isLocked && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 z-0 h-full w-full"
                    >
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="absolute top-0 left-0 w-full h-full object-cover opacity-60 pointer-events-none"
                        >
                            <source src={LoveMessageBg} type="video/mp4" />
                            {/* Fallback if video fails */}
                            <div className="w-full h-full bg-gradient-to-br from-pink-900 to-rose-900" />
                        </video>
                        {/* Overlay gradient for better text readability */}
                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="container mx-auto max-w-5xl relative z-10 h-full flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {isLocked ? (
                        <motion.div
                            key="lock-screen"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col items-center justify-center w-full"
                        >
                            <motion.div
                                animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                                className="bg-white/90 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl text-center max-w-md w-full relative border border-white/50"
                            >
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                                    <Lock className="w-8 h-8 text-white" />
                                </div>

                                <h3 className="font-display text-2xl font-bold text-gray-800 mt-6 mb-2">
                                    Mann ki Baat
                                </h3>
                                <p className="text-muted-foreground mb-8">
                                    Aap bolti ho mai man ki baate share nai karta, lo pata karo mere man ki baat...
                                </p>

                                <div className="bg-pink-50 p-4 rounded-xl mb-6">
                                    <p className="font-medium text-pink-700 font-serif italic text-lg">
                                        "{SECRET_QUESTION}"
                                    </p>
                                </div>

                                <form onSubmit={handleUnlock} className="space-y-4">
                                    <input
                                        type="text"
                                        value={inputAnswer}
                                        onChange={(e) => setInputAnswer(e.target.value)}
                                        placeholder="Type your answer..."
                                        className="w-full px-4 py-3 rounded-xl border-2 border-pink-100 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all text-center text-lg shadow-inner bg-white/50 placeholder:text-gray-400"
                                    />
                                    <button
                                        type="submit"
                                        className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl font-bold text-lg hover:from-pink-600 hover:to-rose-600 active:scale-95 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                                    >
                                        <Key className="w-5 h-5" />
                                        Unlock Mann Ki baat
                                    </button>
                                </form>
                                {error && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-500 text-sm mt-4 font-medium"
                                    >
                                        Oops! Try again sweetie 💕
                                    </motion.p>
                                )}
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="love-message"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            className="text-center w-full px-4 h-full flex flex-col items-center justify-center"
                        >
                            <h1
                                className="text-5xl md:text-7xl lg:text-9xl font-bold text-yellow-400 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] transition-all duration-75 ease-linear leading-tight"
                                style={{ fontFamily: FONTS[currentFontIndex] }}
                            >
                                Love you<br />
                                Siddhi Piddi
                            </h1>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default LoveLetters;
