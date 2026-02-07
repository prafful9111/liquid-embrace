import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Check } from 'lucide-react';
import ReactConfetti from 'react-confetti';

const LoveAgreement = () => {
    const [isHolding, setIsHolding] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isSigned, setIsSigned] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    const holdTimer = useRef<NodeJS.Timeout | null>(null);
    const progressInterval = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };

        // Initial size
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const startHolding = () => {
        if (isSigned) return;

        setIsHolding(true);
        setProgress(0);

        // Smooth progress animation
        const startTime = Date.now();
        const duration = 2000; // 2 seconds to sign

        progressInterval.current = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min((elapsed / duration) * 100, 100);
            setProgress(newProgress);

            if (newProgress >= 100) {
                completeSigning();
            }
        }, 16);
    };

    const stopHolding = () => {
        if (isSigned) return;

        setIsHolding(false);
        setProgress(0);

        if (progressInterval.current) {
            clearInterval(progressInterval.current);
        }
    };

    const completeSigning = () => {
        setIsSigned(true);
        setIsHolding(false);
        setShowConfetti(true);

        if (progressInterval.current) {
            clearInterval(progressInterval.current);
        }
    };

    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-24">
            {showConfetti && (
                <ReactConfetti
                    width={windowSize.width}
                    height={windowSize.height}
                    numberOfPieces={200}
                    recycle={false}
                    colors={['#FF69B4', '#FFB6C1', '#FFC0CB', '#FFD700', '#FFF']}
                />
            )}

            {/* Stamp Paper Container */}
            <motion.div
                className="relative mx-auto max-w-2xl w-full bg-[#fdfbf7] p-8 shadow-deep md:p-12"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(0,0,0,0.05) inset'
                }}
            >
                {/* Paper Texture/Border */}
                <div className="absolute inset-0 border-[12px] border-double border-primary/20 pointer-events-none" />
                <div className="absolute inset-[3px] border-[1px] border-primary/10 pointer-events-none" />

                {/* Header */}
                <div className="mb-10 text-center">
                    <div className="mb-4 inline-block border-b-2 border-primary pb-1">
                        <h2 className="font-display text-3xl font-bold tracking-wider text-foreground uppercase">
                            Official Love Agreement
                        </h2>
                    </div>
                    <p className="font-serif text-sm italic text-muted-foreground">
                        Ref: FOREVER-2020-∞
                    </p>
                </div>

                {/* Content */}
                <div className="mb-12 space-y-6 text-center font-body text-lg leading-relaxed text-foreground/80">
                    <p>
                        I, <span className="font-bold text-primary">Sadhika Prajapati</span>, hereby admit that you have made me feel loved beyond measure.
                    </p>
                    <p>
                        I most solemnly swear to <span className="font-bold">love you</span>, <span className="font-bold">cherish you</span>, and <span className="font-bold">annoy you</span> for the rest of my life.
                    </p>
                    <p>
                        I promise to steal your hoodies, eat your fries, and be your personal heater in winter.
                    </p>
                    <p className="font-bold italic">
                        "This agreement is binding forever and ever, with no exit clauses!"
                    </p>
                </div>

                {/* Signature Section */}
                <div className="mt-16 flex flex-col items-center justify-center gap-6">
                    <div className="relative">
                        {/* Fingerprint Button */}
                        <motion.button
                            className={`group relative flex h-24 w-24 items-center justify-center rounded-full border-2 transition-all duration-300 ${isSigned ? 'border-green-500 bg-green-50' : 'border-primary/30 bg-primary/5'}`}
                            onMouseDown={startHolding}
                            onMouseUp={stopHolding}
                            onMouseLeave={stopHolding}
                            onTouchStart={startHolding}
                            onTouchEnd={stopHolding}
                            whileTap={{ scale: 0.95 }}
                            disabled={isSigned}
                        >
                            {isSigned ? (
                                <Check className="h-10 w-10 text-green-500" />
                            ) : (
                                <Fingerprint className={`h-12 w-12 transition-colors duration-300 ${isHolding ? 'text-primary' : 'text-primary/40'}`} />
                            )}

                            {/* Ripple Effect while holding */}
                            {isHolding && !isSigned && (
                                <motion.div
                                    className="absolute inset-0 rounded-full border-2 border-primary"
                                    initial={{ scale: 1, opacity: 1 }}
                                    animate={{ scale: 1.5, opacity: 0 }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                />
                            )}
                        </motion.button>

                        {/* Progress Ring */}
                        {!isSigned && (
                            <svg className="absolute -inset-2 h-28 w-28 -rotate-90 pointer-events-none">
                                <circle
                                    cx="56"
                                    cy="56"
                                    r="52"
                                    fill="none"
                                    strokeWidth="3"
                                    stroke="currentColor"
                                    className="text-gray-100"
                                />
                                <motion.circle
                                    cx="56"
                                    cy="56"
                                    r="52"
                                    fill="none"
                                    strokeWidth="3"
                                    stroke="currentColor"
                                    className="text-primary"
                                    strokeDasharray="327"
                                    strokeDashoffset={327 - (327 * progress) / 100}
                                />
                            </svg>
                        )}

                        {/* Stamp Effect upon signing */}
                        <AnimatePresence>
                            {isSigned && (
                                <motion.div
                                    className="absolute -right-12 -top-12 rotate-[-15deg] border-4 border-green-600 px-4 py-2 font-display text-xl font-bold uppercase tracking-widest text-green-600 opacity-80 mix-blend-multiply mask-image:url('https://grainy-gradients.vercel.app/noise.svg')"
                                    initial={{ scale: 2, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 0.8 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                >
                                    SIGNED & SEALED
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <p className="min-h-[24px] font-body text-sm font-medium text-muted-foreground">
                        {isSigned ? (
                            <span className="text-green-600 font-bold">AGREEMENT SEALED FOREVER! 💕</span>
                        ) : (
                            isHolding ? "Hold to sign..." : "Scan your Fingerprint to sign"
                        )}
                    </p>
                </div>
            </motion.div>
        </section>
    );
};

export default LoveAgreement;
