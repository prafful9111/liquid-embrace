import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SmoothScroll from '@/components/SmoothScroll';
import IntroSection from '@/components/IntroSection';
import ValentinePopup from '@/components/ValentinePopup';
import MonthsGallery from '@/components/MonthsGallery';
import FloatingGallery from '@/components/FloatingGallery';

import FloatingHearts from '@/components/FloatingHearts';
import LoveAgreement from '@/components/LoveAgreement';
import LovePuzzle from '@/components/LovePuzzle';
import LoveQuiz from '@/components/LoveQuiz';
import LoveLetters from '@/components/LoveLetters';

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
              <IntroSection name="Siddhi Piddi" onBegin={handleBegin} />
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
              {/* Section 2: Floating Gallery with Parallax */}
              <FloatingGallery />

              {/* Months Gallery - flip cards */}
              <MonthsGallery isVisible={true} />

              {/* Section 6: Love Puzzle */}
              <LovePuzzle />

              {/* Section 7: Love Quiz */}
              <LoveQuiz />

              {/* Section 7.5: Love Letters "Open When" */}
              <LoveLetters />

              {/* Section 8: Love Agreement */}
              <LoveAgreement />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </SmoothScroll>
  );
};

export default Index;
