import { useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Heart } from 'lucide-react';

interface HeartParticle {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<HeartParticle[]>([]);
  const [isTriggered, setIsTriggered] = useState(false);

  const { scrollYProgress } = useScroll();

  // Trigger hearts when reaching bottom of page
  const opacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);

  const generateHearts = useCallback(() => {
    const newHearts: HeartParticle[] = [];
    for (let i = 0; i < 15; i++) {
      newHearts.push({
        id: Date.now() + i,
        x: Math.random() * 100,
        size: 12 + Math.random() * 16,
        delay: Math.random() * 3,
        duration: 6 + Math.random() * 4,
      });
    }
    setHearts((prev) => [...prev, ...newHearts]);

    // Clear old hearts after animation
    setTimeout(() => {
      setHearts((prev) => prev.slice(15));
    }, 12000);
  }, []);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      if (value > 0.75 && !isTriggered) {
        setIsTriggered(true);
        generateHearts();
      } else if (value < 0.7) {
        setIsTriggered(false);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, isTriggered, generateHearts]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      style={{ opacity }}
    >
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-0"
          style={{
            left: `${heart.x}%`,
          }}
          initial={{ y: 0, opacity: 0, scale: 0 }}
          animate={{
            y: "-100vh",
            opacity: [0, 1, 1, 0],
            scale: [0.5, 1, 1, 0.5],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            ease: "easeOut",
          }}
        >
          <Heart
            style={{ width: heart.size, height: heart.size }}
            className="fill-blush/60 text-blush"
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FloatingHearts;
