import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart } from 'lucide-react';

const MagneticNote = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Background color transition
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [
      "hsl(30 50% 97%)",
      "hsl(25 50% 93%)",
      "hsl(350 40% 95%)",
      "hsl(30 50% 97%)",
    ]
  );

  return (
    <motion.section
      ref={containerRef}
      className="relative min-h-[150vh] overflow-hidden"
      style={{ backgroundColor }}
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-20 top-1/4 h-40 w-40 rounded-full bg-sage opacity-20 blur-3xl"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, -100]),
          }}
        />
        <motion.div
          className="absolute -right-20 top-1/2 h-60 w-60 rounded-full bg-peach opacity-25 blur-3xl"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, -150]),
          }}
        />
      </div>

      {/* Spacer */}
      <div className="h-[30vh]" />

      {/* Sticky love note */}
      <div className="sticky top-[15vh] z-10 px-6">
        <motion.div
          className="mx-auto max-w-md rounded-3xl bg-card/80 p-8 shadow-deep backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {/* Heart icon */}
          <motion.div
            className="mb-6 flex justify-center"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blush/50">
              <Heart className="h-6 w-6 fill-sunset-glow text-sunset-glow" />
            </div>
          </motion.div>

          {/* Quote */}
          <blockquote className="text-center">
            <p className="font-display text-2xl font-medium italic leading-relaxed text-foreground">
              "In a world full of temporary things, you are a perpetual feeling."
            </p>
            <footer className="mt-6 font-body text-sm text-muted-foreground">
              — A love letter, just for you
            </footer>
          </blockquote>

          {/* Decorative line */}
          <div className="mx-auto mt-8 h-px w-16 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          {/* Additional text */}
          <motion.p
            className="mt-6 text-center font-body text-sm leading-relaxed text-muted-foreground"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Every heartbeat, every breath, every quiet moment — 
            they all lead back to you.
          </motion.p>
        </motion.div>
      </div>

      {/* Bottom spacer */}
      <div className="h-[70vh]" />
    </motion.section>
  );
};

export default MagneticNote;
