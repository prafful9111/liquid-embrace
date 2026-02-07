import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SmoothScroll from '@/components/SmoothScroll';
import IntroSection from '@/components/IntroSection';
import ValentinePopup from '@/components/ValentinePopup';
import MonthsGallery from '@/components/MonthsGallery';
import FloatingGallery from '@/components/FloatingGallery';
import MagneticNote from '@/components/MagneticNote';
import FloatingHearts from '@/components/FloatingHearts';
import Footer from '@/components/Footer';

type AppState = 'intro' | 'valentine' | 'memories';

const Index = () => {
  const [appState, setAppState] = useState<AppState>('intro');

  const handleBegin = () => {
    setAppState('valentine');
  };

  const handleValentineYes = () => {
    setAppState('memories');
  };

  return (
    <SmoothScroll>
      <main className="relative min-h-screen overflow-x-hidden bg-gradient-sunset">
        {/* Valentine popup */}
        <ValentinePopup 
          isOpen={appState === 'valentine'} 
          onYes={handleValentineYes} 
        />

        {/* Floating hearts effect */}
        <FloatingHearts />

        {/* Section 1: The Breath - Intro */}
        <AnimatePresence mode="wait">
          {appState === 'intro' && (
            <motion.div
              key="intro"
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <IntroSection name="My Love" onBegin={handleBegin} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Memories Section - shows after saying yes */}
        <AnimatePresence>
          {appState === 'memories' && (
            <motion.div
              key="memories"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              {/* Months Gallery - flip cards */}
              <MonthsGallery isVisible={true} />

              {/* Section 2: Floating Gallery with Parallax */}
              <FloatingGallery />

              {/* Section 3: Magnetic Love Note */}
              <MagneticNote />

              {/* Footer */}
              <Footer />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </SmoothScroll>
  );
};

export default Index;
