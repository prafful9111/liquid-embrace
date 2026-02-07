import { useRef } from 'react';
import { motion, useScroll, useTransform, useVelocity, useSpring } from 'framer-motion';

import memory1 from '@/assets/memory-1.jpg';
import memory2 from '@/assets/memory-2.jpg';
import memory3 from '@/assets/memory-3.jpg';
import memory4 from '@/assets/memory-4.jpg';
import memory5 from '@/assets/memory-5.jpg';
import memory6 from '@/assets/memory-6.jpg';

interface MemoryCardProps {
  src: string;
  caption: string;
  velocity: any;
  parallaxOffset: number;
}

const MemoryCard = ({ src, caption, velocity, parallaxOffset }: MemoryCardProps) => {
  const skewY = useSpring(
    useTransform(velocity, [-1000, 0, 1000], [3, 0, -3]),
    { stiffness: 100, damping: 30 }
  );

  const scaleY = useSpring(
    useTransform(velocity, [-1000, 0, 1000], [1.03, 1, 1.03]),
    { stiffness: 100, damping: 30 }
  );

  return (
    <motion.div
      className="memory-card relative w-full"
      style={{
        skewY,
        scaleY,
        y: parallaxOffset,
      }}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl bg-card">
        <img
          src={src}
          alt={caption}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        {/* Subtle overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
      </div>
      <p className="mt-4 text-center font-display text-sm italic text-muted-foreground">
        {caption}
      </p>
    </motion.div>
  );
};

const FloatingGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const velocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(velocity, { stiffness: 100, damping: 30 });

  // Different parallax speeds for columns
  const leftColumnY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const rightColumnY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const leftImages = [
    { src: memory1, caption: "The day we met" },
    { src: memory3, caption: "Sunsets together" },
    { src: memory5, caption: "Quiet mornings" },
  ];

  const rightImages = [
    { src: memory2, caption: "Your favorite flowers" },
    { src: memory4, caption: "Coffee conversations" },
    { src: memory6, caption: "Summer dreams" },
  ];

  return (
    <section ref={containerRef} className="relative min-h-screen px-4 py-24">
      {/* Section title */}
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-display text-3xl font-medium text-foreground">
          Our Memories
        </h2>
        <p className="mt-2 font-body text-sm text-muted-foreground">
          Floating in time, forever ours
        </p>
      </motion.div>

      {/* Staggered grid */}
      <div className="mx-auto grid max-w-sm grid-cols-2 gap-4">
        {/* Left column - slower parallax */}
        <motion.div
          className="flex flex-col gap-6 pt-12"
          style={{ y: leftColumnY }}
        >
          {leftImages.map((img, index) => (
            <motion.div
              key={img.caption}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
            >
              <MemoryCard
                src={img.src}
                caption={img.caption}
                velocity={smoothVelocity}
                parallaxOffset={0}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Right column - faster parallax */}
        <motion.div
          className="flex flex-col gap-6"
          style={{ y: rightColumnY }}
        >
          {rightImages.map((img, index) => (
            <motion.div
              key={img.caption}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.15 + 0.1 }}
            >
              <MemoryCard
                src={img.src}
                caption={img.caption}
                velocity={smoothVelocity}
                parallaxOffset={0}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FloatingGallery;
