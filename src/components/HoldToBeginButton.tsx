import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface HoldToBeginButtonProps {
  onComplete: () => void;
  holdDuration?: number;
}

const HoldToBeginButton = ({ onComplete, holdDuration = 2500 }: HoldToBeginButtonProps) => {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const startHold = useCallback(() => {
    if (isComplete) return;
    
    setIsHolding(true);
    startTimeRef.current = Date.now();
    
    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min((elapsed / holdDuration) * 100, 100);
      setProgress(newProgress);
      
      if (newProgress >= 100) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsComplete(true);
        setTimeout(() => {
          onComplete();
        }, 400);
      }
    }, 16);
  }, [holdDuration, onComplete, isComplete]);

  const endHold = useCallback(() => {
    if (isComplete) return;
    
    setIsHolding(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setProgress(0);
  }, [isComplete]);

  return (
    <motion.div
      className="relative flex flex-col items-center gap-4"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
    >
      {/* Instruction text */}
      <motion.p
        className="font-body text-xs uppercase tracking-widest text-muted-foreground"
        animate={{ opacity: isHolding ? 0.5 : 1 }}
      >
        {isComplete ? "Opening..." : "Hold to begin"}
      </motion.p>

      {/* Button container */}
      <motion.button
        className="relative flex h-24 w-24 items-center justify-center rounded-full bg-card shadow-deep focus:outline-none"
        onMouseDown={startHold}
        onMouseUp={endHold}
        onMouseLeave={endHold}
        onTouchStart={startHold}
        onTouchEnd={endHold}
        whileTap={{ scale: 0.95 }}
        animate={{
          scale: isComplete ? [1, 1.2, 0] : 1,
          opacity: isComplete ? [1, 1, 0] : 1,
        }}
        transition={{ duration: isComplete ? 0.5 : 0.2 }}
      >
        {/* Progress ring */}
        <svg
          className="absolute inset-0 -rotate-90"
          viewBox="0 0 100 100"
        >
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="3"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={289}
            strokeDashoffset={289 - (289 * progress) / 100}
            style={{
              filter: isHolding ? 'drop-shadow(0 0 8px hsl(var(--primary)))' : 'none',
            }}
          />
        </svg>

        {/* Heart icon with pulse */}
        <motion.div
          animate={{
            scale: isHolding ? [1, 1.2, 1] : 1,
          }}
          transition={{
            duration: 0.6,
            repeat: isHolding ? Infinity : 0,
            ease: "easeInOut",
          }}
        >
          <Heart
            className={`h-8 w-8 transition-colors duration-300 ${
              isHolding ? 'fill-primary text-primary' : 'text-muted-foreground'
            }`}
          />
        </motion.div>

        {/* Ripple effect when holding */}
        <AnimatePresence>
          {isHolding && (
            <>
              <motion.span
                className="absolute inset-0 rounded-full border-2 border-primary"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <motion.span
                className="absolute inset-0 rounded-full border-2 border-primary"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
              />
            </>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Sparkle particles */}
      <AnimatePresence>
        {isHolding && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute h-2 w-2 rounded-full bg-primary"
                initial={{
                  x: 0,
                  y: 0,
                  scale: 0,
                  opacity: 1,
                }}
                animate={{
                  x: Math.cos((i * 60 * Math.PI) / 180) * 60,
                  y: Math.sin((i * 60 * Math.PI) / 180) * 60,
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeOut",
                }}
                style={{
                  top: '50%',
                  left: '50%',
                  marginTop: '1.5rem',
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HoldToBeginButton;
