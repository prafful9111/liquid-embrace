import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';

interface ValentinePopupProps {
  isOpen: boolean;
  onYes: () => void;
}

const ValentinePopup = ({ isOpen, onYes }: ValentinePopupProps) => {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noAttempts, setNoAttempts] = useState(0);
  const [showMessage, setShowMessage] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const teaseMessages = [
    "Nice try! 😏",
    "Not so fast!",
    "You can't escape love! 💕",
    "Just say yes already!",
    "The button is shy!",
    "Hmm... try again!",
    "Love always wins! 💝",
    "One more time? 😊",
  ];

  const moveNoButton = () => {
    if (!containerRef.current) return;
    
    const container = containerRef.current.getBoundingClientRect();
    const maxX = container.width / 2 - 60;
    const maxY = container.height / 2 - 30;
    
    const newX = (Math.random() - 0.5) * 2 * maxX;
    const newY = (Math.random() - 0.5) * 2 * maxY;
    
    setNoButtonPosition({ x: newX, y: newY });
    setNoAttempts(prev => prev + 1);
    setShowMessage(teaseMessages[noAttempts % teaseMessages.length]);
    
    // Clear message after delay
    setTimeout(() => setShowMessage(''), 1500);
  };

  // Reset position when popup opens
  useEffect(() => {
    if (isOpen) {
      setNoButtonPosition({ x: 0, y: 0 });
      setNoAttempts(0);
      setShowMessage('');
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop with hearts */}
          <motion.div
            className="absolute inset-0 bg-foreground/20 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Floating background hearts */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  x: `${Math.random() * 100}%`,
                  y: '110%',
                  rotate: Math.random() * 30 - 15,
                }}
                animate={{
                  y: '-10%',
                  rotate: Math.random() * 30 - 15,
                }}
                transition={{
                  duration: 8 + Math.random() * 4,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: 'linear',
                }}
              >
                <Heart
                  className="text-primary/30"
                  size={20 + Math.random() * 20}
                  fill="currentColor"
                />
              </motion.div>
            ))}
          </div>

          {/* Popup card */}
          <motion.div
            ref={containerRef}
            className="relative z-10 w-full max-w-sm overflow-hidden rounded-3xl bg-card p-8 shadow-deep"
            initial={{ scale: 0.5, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.5, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Decorative hearts */}
            <motion.div
              className="absolute -right-4 -top-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Heart className="h-16 w-16 fill-blush text-blush opacity-50" />
            </motion.div>

            {/* Main content */}
            <div className="relative text-center">
              {/* Icon */}
              <motion.div
                className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Heart className="h-10 w-10 fill-primary-foreground text-primary-foreground" />
              </motion.div>

              {/* Question */}
              <h2 className="font-display text-2xl font-medium text-foreground">
                Will you be my
              </h2>
              <motion.h1
                className="mt-1 font-display text-4xl font-semibold italic text-gradient-sunset"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Valentine?
              </motion.h1>

              <p className="mt-4 font-body text-sm text-muted-foreground">
                Choose wisely... 💕
              </p>

              {/* Tease message */}
              <AnimatePresence mode="wait">
                {showMessage && (
                  <motion.p
                    className="mt-3 font-body text-sm font-medium text-primary"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    {showMessage}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Buttons */}
              <div className="relative mt-8 flex items-center justify-center gap-4 h-16">
                {/* Yes button */}
                <motion.button
                  className="relative flex items-center gap-2 rounded-full bg-primary px-8 py-3 font-body font-medium text-primary-foreground shadow-glow transition-all hover:shadow-deep"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onYes}
                >
                  <Sparkles className="h-4 w-4" />
                  Yes!
                  <motion.span
                    className="absolute inset-0 rounded-full border-2 border-primary"
                    animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </motion.button>

                {/* No button - runs away */}
                <motion.button
                  className="rounded-full border-2 border-muted bg-background px-6 py-3 font-body text-muted-foreground transition-colors hover:bg-muted"
                  animate={{
                    x: noButtonPosition.x,
                    y: noButtonPosition.y,
                  }}
                  transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                  onMouseEnter={moveNoButton}
                  onTouchStart={moveNoButton}
                  onClick={moveNoButton}
                >
                  No
                </motion.button>
              </div>

              {/* Hint after multiple attempts */}
              <AnimatePresence>
                {noAttempts >= 3 && (
                  <motion.p
                    className="mt-6 font-body text-xs text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Hint: The answer is always yes! 💝
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ValentinePopup;
