import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-t from-peach-soft/50 to-background py-20">
      <motion.div
        className="flex flex-col items-center gap-6 px-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* Decorative hearts */}
        <div className="flex items-center gap-2">
          <Heart className="h-4 w-4 fill-blush text-blush" />
          <Heart className="h-5 w-5 fill-sunset-glow text-sunset-glow" />
          <Heart className="h-4 w-4 fill-blush text-blush" />
        </div>

        <h3 className="font-display text-2xl font-medium italic text-foreground">
          Forever & Always
        </h3>

        <p className="max-w-xs font-body text-sm leading-relaxed text-muted-foreground">
          This love letter was written just for you, 
          with all the words my heart couldn't speak.
        </p>

        <motion.div
          className="mt-4 flex items-center gap-2 font-body text-xs text-muted-foreground"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span>Made with</span>
          <Heart className="h-3 w-3 fill-sunset-glow text-sunset-glow" />
          <span>and endless love</span>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
