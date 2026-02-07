import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

import memory1 from '@/assets/memory-1.jpg';
import memory2 from '@/assets/memory-2.jpg';
import memory3 from '@/assets/memory-3.jpg';
import memory4 from '@/assets/memory-4.jpg';
import memory5 from '@/assets/memory-5.jpg';
import memory6 from '@/assets/memory-6.jpg';

interface MonthCardProps {
  month: string;
  image: string;
  index: number;
  isFlipped: boolean;
  onFlip: () => void;
}

const monthImages = [
  memory1, memory2, memory3, memory4, memory5, memory6,
  memory1, memory2, memory3, memory4, memory5, memory6,
];

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const MonthCard = ({ month, image, index, isFlipped, onFlip }: MonthCardProps) => {
  return (
    <motion.div
      className="perspective-1000 relative aspect-[3/4] w-full cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onClick={onFlip}
    >
      <motion.div
        className="preserve-3d relative h-full w-full"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.8,
          type: "spring",
          stiffness: 80,
          damping: 15,
        }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front - Month name */}
        <motion.div
          className="backface-hidden absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-card shadow-soft"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {/* Decorative pattern */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
            {/* Corner decorations */}
            <div className="absolute left-3 top-3">
              <Heart className="h-4 w-4 fill-primary/20 text-primary/20" />
            </div>
            <div className="absolute right-3 top-3">
              <Heart className="h-4 w-4 fill-primary/20 text-primary/20" />
            </div>
            <div className="absolute bottom-3 left-3">
              <Heart className="h-4 w-4 fill-primary/20 text-primary/20" />
            </div>
            <div className="absolute bottom-3 right-3">
              <Heart className="h-4 w-4 fill-primary/20 text-primary/20" />
            </div>
          </div>

          {/* Month content */}
          <motion.div
            className="relative z-10 text-center"
            whileHover={{ scale: 1.05 }}
          >
            <Heart className="mx-auto mb-2 h-8 w-8 fill-primary text-primary" />
            <p className="font-display text-lg font-medium text-foreground">
              {month}
            </p>
            <p className="mt-1 font-body text-xs text-muted-foreground">
              Tap to reveal
            </p>
          </motion.div>

          {/* Shimmer effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6 }}
          />
        </motion.div>

        {/* Back - Image */}
        <motion.div
          className="backface-hidden absolute inset-0 overflow-hidden rounded-2xl bg-card shadow-deep"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <img
            src={image}
            alt={`${month} memory`}
            className="h-full w-full object-cover"
            loading="lazy"
          />
          {/* Overlay with month name */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/60 to-transparent p-3">
            <p className="font-display text-sm font-medium text-white">
              {month}
            </p>
          </div>
          {/* Heart badge */}
          <div className="absolute right-2 top-2">
            <motion.div
              className="flex h-8 w-8 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="h-4 w-4 fill-primary text-primary" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

interface MonthsGalleryProps {
  isVisible: boolean;
}

const MonthsGallery = ({ isVisible }: MonthsGalleryProps) => {
  const [flippedCard, setFlippedCard] = useState<number | null>(null);

  const handleFlip = (index: number) => {
    setFlippedCard(prev => prev === index ? null : index);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.section
          className="relative min-h-screen px-4 py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {/* Section header */}
          <motion.div
            className="mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h2 className="font-display text-3xl font-medium text-foreground">
              Our Memories
            </h2>
            <p className="mt-2 font-body text-sm text-muted-foreground">
              A year of love, one month at a time
            </p>
          </motion.div>

          {/* Cards grid */}
          <div className="mx-auto grid max-w-md grid-cols-3 gap-3">
            {months.map((month, index) => (
              <MonthCard
                key={month}
                month={month}
                image={monthImages[index]}
                index={index}
                isFlipped={flippedCard === index}
                onFlip={() => handleFlip(index)}
              />
            ))}
          </div>

          {/* Hint text */}
          <motion.p
            className="mt-8 text-center font-body text-xs text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            Tap any card to reveal a memory 💕
          </motion.p>
        </motion.section>
      )}
    </AnimatePresence>
  );
};

export default MonthsGallery;
