import { motion } from 'framer-motion';
import HoldToBeginButton from './HoldToBeginButton';

interface IntroSectionProps {
  name?: string;
  onBegin: () => void;
}

const IntroSection = ({ name = "My Love", onBegin }: IntroSectionProps) => {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      {/* Dreamy background gradient */}
      <div className="absolute inset-0 bg-gradient-sunset" />
      
      {/* Soft glow effect */}
      <motion.div
        className="absolute top-1/4 h-64 w-64 rounded-full bg-peach opacity-20 blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main content */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <motion.p
          className="mb-4 font-body text-sm uppercase tracking-[0.3em] text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          A letter for you
        </motion.p>
        
        <motion.h1
          className="font-display text-5xl font-medium italic leading-tight text-foreground sm:text-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Hello,
          <br />
          <span className="text-gradient-sunset">{name}</span>
        </motion.h1>

        <motion.p
          className="mt-8 max-w-xs font-body text-base leading-relaxed text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          Every moment with you is a memory I want to hold forever
        </motion.p>
      </motion.div>

      {/* Hold to begin button */}
      <div className="absolute bottom-16">
        <HoldToBeginButton onComplete={onBegin} holdDuration={2500} />
      </div>
    </section>
  );
};

export default IntroSection;
