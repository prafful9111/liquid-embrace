import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useVelocity, useSpring } from 'framer-motion';
import { Dialog, DialogContent } from "@/components/ui/dialog";

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
  onClick?: () => void;
}

const MemoryCard = ({ src, caption, velocity, parallaxOffset, onClick }: MemoryCardProps) => {
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
      className="memory-card relative w-full cursor-pointer"
      style={{
        skewY,
        scaleY,
        y: parallaxOffset,
      }}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
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

import { Heart } from 'lucide-react';

const BackgroundHearts = () => {
  const hearts = Array.from({ length: 20 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            opacity: 0,
            y: "120vh",
            x: Math.random() * 100 + "vw",
            scale: 0.5 + Math.random() * 1,
            rotate: Math.random() * 360,
          }}
          animate={{
            opacity: [0, 1, 0],
            y: "-20vh",
            rotate: Math.random() * 360 + 360,
          }}
          transition={{
            duration: 15 + Math.random() * 20,
            repeat: Infinity,
            delay: Math.random() * 20,
            ease: "linear",
          }}
        >
          <Heart
            className="fill-yellow-400 text-yellow-400/50"
            size={24 + Math.random() * 24}
            strokeWidth={1}
          />
        </motion.div>
      ))}
    </div>
  );
};

const FloatingGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
    { src: memory1, caption: "Jor se Jhappi 🤗" },
    { src: memory3, caption: "Hamari Favourite Photo💖" },
    { src: memory5, caption: "Ham dono" },
  ];

  const rightImages = [
    { src: memory2, caption: "Aapki Lipstick 💋" },
    { src: memory4, caption: "💛" },
    { src: memory6, caption: "Pretty Little Baby💕" },
  ];

  return (
    <section ref={containerRef} className="relative min-h-screen px-4 py-24 overflow-hidden">
      <BackgroundHearts />

      {/* Section title */}
      <motion.div
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="font-display pb-9 text-3xl font-medium text-foreground">
          The day we met
        </h2>

      </motion.div>

      {/* Staggered grid */}
      <div className="mx-auto grid max-w-sm grid-cols-2 gap-4 relative z-10">
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
                onClick={() => setSelectedImage(img.src)}
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
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.8, delay: index * 0.15 + 0.1 }}
            >
              <MemoryCard
                src={img.src}
                caption={img.caption}
                velocity={smoothVelocity}
                parallaxOffset={0}
                onClick={() => setSelectedImage(img.src)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl border-none bg-transparent p-0 shadow-none">
          <div className="relative h-[80vh] w-full overflow-hidden rounded-lg">
            <img
              src={selectedImage || ''}
              alt="Memory Full View"
              className="h-full w-full object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default FloatingGallery;
